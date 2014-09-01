/**
 * @class Chartsly.series.indicator.TRIX
 * @extends Ext.chart.series.Cartesian
 *
 * TRIX series that iterates the store records and calculates the TRIX value based on the below formula:
 * 1. Single-Smoothed EMA = 15-period EMA of the closing price
 * 2. Double-Smoothed EMA = 15-period EMA of Single-Smoothed EMA
 * 3. Triple-Smoothed EMA = 15-period EMA of Double-Smoothed EMA
 * 4. TRIX = 1-period percent change in Triple-Smoothed EMA
 * 
 * The calculated TRIX value is set as "trix" field on the record. It also calculates the EMA of trix
 * value based on the signalPeriod and sets the 'sigtrix' field on the record with it.
 */
Ext.define('Chartsly.series.indicator.TRIX', {
    extend: 'Ext.chart.series.Cartesian',
    alias: 'series.trix',
    seriesType: 'lineSeries',  //sprite type for this series

    config: {
        /*
         * Data field containing the close value. Defaults to "close"
         */
        closeField: "close",
        /*
         * EMA period to calculate TRIX. Defaults to 15 days
         */
        period: 15,
        /*
         * period to calculate TRIX signal. Defaults to 9 days
         */
        signalPeriod: 9
    },

    /*
     * Creats a TRIX series
     * @param {Object} [config] Configuration
     */
    constructor: function (config) {

        var me = this;

        var period = config.period;
        var sigPeriod = config.signalPeriod;

        var st = Ext.data.StoreManager.lookup(config.store);
        var recs = st.getRange();
        var closes = Ext.Array.pluck(Ext.Array.pluck(recs, "data"), config.closeField);

        //calculate SMA for the period
        var sma = Ext.Array.mean(Ext.Array.slice(closes, 0, period));

        //calculate multiplier
        var multiplier = 2/(period + 1);

        var ema1, prevEma1, ema1Arr = [], ema2Arr = [], ema2, prevEma2, ema3, prevEma3, 
            trix, trixArr = [], sigTrix, prevSigTrix;

        st.each(function (item, index, length) {
            //calculate Single-smoothed EMA
            if (index >= period) {
                if (index == period) {
                   ema1 = sma;
                } else {
                    //EMA: {Close - EMA(previous day)} x multiplier + EMA(previous day)
                    ema1 = (item.get(config.closeField) - prevEma1) * multiplier + prevEma1;
                } 

                ema1Arr.push(ema1);
                prevEma1 = ema1;
            }
                

            //calculate Double-smoothed EMA
            if (index >= 2*period) {
                if (index == 2*period) {
                    ema2 = Ext.Array.mean(Ext.Array.slice(ema1Arr, 0, index));
                } else {
                    ema2 = (ema1 - prevEma2) * multiplier + prevEma2;
                }

                ema2Arr.push(ema2);
                prevEma2 = ema2;
            }

            //calculate Triple-smoothed EMA
            if (index >= 3*period) {
                if (index == 3*period) {
                    ema3 = Ext.Array.mean(Ext.Array.slice(ema2Arr, 0, index));
                } else {
                    ema3 = (ema2 - prevEma3) * multiplier + prevEma3;
                }
    
                //calculate TRIX and set it on the record
                //1-day rate of change (in percentage)
                trix = ((prevEma3 - ema3)*100)/prevEma3;
                item.data.trix = trix;
                trixArr.push(trix);

                prevEma3 = ema3;

                //calculate TRIX Signal values
                if (index >= (3*period + 1 + sigPeriod)) {
                    if (index == (3*period + 1 + sigPeriod)) {
                        sigTrix = Ext.Array.mean(Ext.Array.slice(trixArr, 1, sigPeriod));   //0th is NaN
                    } else {
                        sigTrix = (trix - prevSigTrix) * multiplier + prevSigTrix;
                    }

                    item.data.sigtrix = sigTrix;
                    prevSigTrix = sigTrix;
                }
            }
        });

    
        delete ema1Arr;
        delete ema2Arr;
        delete trixArr;

        this.callParent(arguments);
    }

});