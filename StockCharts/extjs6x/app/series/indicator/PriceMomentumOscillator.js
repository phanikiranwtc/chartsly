/**
 * @class Chartsly.series.indicator.PriceMomentumOscillator
 * @extends Ext.chart.series.Cartesian
 *
 * PriceMomentumOscillator (PMO) series that iterates the store records and calculates 
 * the ROC value based on the following formulae:
 *
 * 1. PMO Line = 20-period Custom-EMA of (10 * 35-period Custom-EMA of ( ( (Today's Price/Yesterday's Price) * 100) - 100) )
 * 2. PMO Signal Line = 10-period EMA of PMO
 * 
 * For more detail, refer to http://stockcharts.com/school/doku.php?id=chart_school:technical_indicators:dppmo
 *
 * The calculated PMO and PMO Signal values are set to "pom" and "sigpom" fields on the record
 */
Ext.define('Chartsly.series.indicator.PriceMomentumOscillator', {
    extend: 'Ext.chart.series.Cartesian',
    alias: 'series.pmo',
    seriesType: 'lineSeries',

    config: {
        /*
         * Data field containing the close value. Defaults to "close"
         */
        closeField: "close",
        /*
         * First custom EMA period. Defaults to 35 periods
         */
        period1: 35,
        /*
         * Second custom EMA period. Defaults to 20 periods
         */
        period2: 20,
        /*
         * EMA period for PMO signal. Defaults to 10 periods
         */
        signalPeriod: 10
    },

    /*
     * Creats a PMO series
     * @param {Object} [config] Configuration
     */
    constructor: function (config) {

        var me = this;

        var close = 0, nPeriodAgoClose = 0, period = config.period, 
            roc, rocArr = [], emaROCArr = [], sigPmo, prevSigPmo = 0, pmo, prevPmo = 0;

        var st = Ext.data.StoreManager.lookup(config.store);

        var recs = st.getRange(period);

        var p1 = config.period1;
        var p2 = config.period2;
        var sigP = config.signalPeriod;

        var customSmoothingContant1 = 2/p1;
        var customSmoothingContant2 = 2/p2;
        var sigSmoothingConstant = 2/(sigP + 1);

        var pmoArr = [];

        Ext.Array.each(recs, function (item, index) {
            if (index == 0) {
                return;
            }

            //calculate ROC for 1 period
            //ROC = [(Close - Close n periods ago) / (Close n periods ago)] * 100
            close = item.get(config.closeField);
            nPeriodAgoClose = st.getAt(index - 1).get(config.closeField);         

            roc = ((close - nPeriodAgoClose)/nPeriodAgoClose)*100;
            rocArr.push(roc);

            if (index < p1) {
                //no further logic needs to be executed
                return;
            }

            //calculate 10*custom EMA of ROC based on period1
            if (index == p1) {
                emaROC = Ext.Array.mean(rocArr);
            } else {
                emaROC = (roc * customSmoothingContant1) + (rocArr[index - 1] * (1 - customSmoothingContant1));
            }

            emaROCArr.push(emaROC);

            //calculate custom EMA based on period2
            if (index >= (p1 + p2)) {
                if (index == (p1 + p2)) {
                    pmo = Ext.Array.mean(Ext.Array.slice(emaROCArr, 1));
                } else {
                    pmo = ((emaROC*10 - prevPmo) * customSmoothingContant2) + prevPmo;
                }
                prevPmo = pmo;

                item.data.pmo = pmo;

                pmoArr.push(pmo);
            }

            //calculation for PMO signal
            if (index >= (p1 + p2 + sigP)) {
                if (index == (p1 + p2 + sigP)) {
                    sigPmo = Ext.Array.mean(Ext.Array.slice(pmoArr, 1, index));
                } else {
                    //EMA: {Close - EMA(previous day)} x multiplier + EMA(previous day)
                    sigPmo = (pmo - prevSigPmo) * sigSmoothingConstant + prevSigPmo;
                }

                prevSigPmo = sigPmo;
                item.data.sigpmo = sigPmo;
            }
        });

        this.callParent(arguments);
    }
});