/**
 * @class Chartsly.series.indicator.OnBalanceVolume
 * @extends Ext.chart.series.Cartesian
 *
 * OnBalanceVolume (OBV) series that iterates the store records and calculates 
 * the OBV value based on the following formulae:
 *
 * 1) If the closing price is above the prior close price then: 
 * Current OBV = Previous OBV + Current Volume
 *
 * 2) If the closing price is below the prior close price then: 
 * Current OBV = Previous OBV  -  Current Volume
 *
 * 3) If the closing prices equals the prior close price then:
 * Current OBV = Previous OBV (no change)
 * 
 * For more detail, refer to http://stockcharts.com/school/doku.php?id=chart_school:technical_indicators:on_balance_volume_obv
 *
 * The calculated ATR value is set a "atr" field on the record
 */
Ext.define('Chartsly.series.indicator.OnBalanceVolume', {
    extend: 'Ext.chart.series.Cartesian',
    alias: 'series.obv',
    seriesType: 'lineSeries',

    config: {
        /*
         * Data field containing the close value. Defaults to "close"
         */
        closeField: "close",
        /*
         * Data field containing the volume value. Defaults to "volume"
         */
        volumeField: "volume"
    },

    /*
     * Creats a OBV series
     * @param {Object} [config] Configuration
     */
    constructor: function (config) {

        var me = this;

        var st = Ext.data.StoreManager.lookup(config.store);

        var close = 0, prevClose = 0, currOBV, prevOBV = 0, volume;

        st.each(function (item, index, length) {
            close = item.get(config.closeField);
            volume = item.get(config.volumeField);

            //calculate OBV
            //if it is first record
            if (index == 0) {
                currOBV = NaN;
            } else {
                //if prevOBV is undefined, set the obv to volume
                if (!prevOBV) {
                    currOBV = volume;
                } else {
                    //If the closing prices equals the prior close price
                    if (close == prevClose) {
                        currOBV = prevOBV;
                    }

                    //If the closing price is above the prior close price
                    if (close > prevClose) {
                        currOBV = prevOBV + volume;
                    }

                    //If the closing price is below the prior close price
                    if (close < prevClose) {
                        currOBV = prevOBV - volume;
                    }
                }
            }

            item.data.obv = currOBV;

            prevOBV = currOBV;
            prevClose = close;
        });

        this.callParent(arguments);
    }
});