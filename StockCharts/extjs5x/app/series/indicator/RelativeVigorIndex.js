/**
 * @class Chartsly.series.indicator.RelativeVigorIndex
 * @extends Ext.chart.series.Cartesian
 *
 * RelativeVigorIndex (RVI) series that iterates the store records and calculates 
 * the RVI value based on the following formulae:
 *
 * RVI = (Close - Open) / (High - Low)
 * 
 * Refer to http://www.investopedia.com/terms/r/relative_vigor_index.asp for more detail.
 * The calculated RVI and signal values are set on "rvi" and "sigrvi" fields, respectively, on the record
 */
Ext.define('Chartsly.series.indicator.RelativeVigorIndex', {
    extend: 'Ext.chart.series.Cartesian',
    alias: 'series.rvi',
    seriesType: 'lineSeries',

    config: {
        /*
         * Data field containing the open value. Defaults to "open"
         */
        openField: "open",
        /*
         * Data field containing the high value. Defaults to "high"
         */
        highField: "high",
        /*
         * Data field containing the low value. Defaults to "low"
         */
        lowField: "low",
        /*
         * Data field containing the close value. Defaults to "close"
         */
        closeField: "close",
        /*
         * Look-back period to calculate ROC. Defaults to 14 periods
         */
        period: 10,

        signalPeriod: 4
    },

    /*
     * Creats a RVI series
     * @param {Object} [config] Configuration
     */
    constructor: function (config) {

        var me = this;

        var st = Ext.data.StoreManager.lookup(config.store);
        var recs = st.getRange();

        var close = 0, period = config.period, signalPeriod = config.signalPeriod, 
            rvi, prevRvi = 0, rviArr = [], ind, indArr = [],
            sigRvi, prevSigRvi = 0;

        var multiplier = 2/(period + 1);
        var multiplier2 = 2/(signalPeriod + 1);

        Ext.Array.each(recs, function (item, index) {

            ind = (item.data[config.closeField] - item.data[config.openField])/(item.data[config.highField] - item.data[config.lowField]);
            indArr.push(ind);

            if (index >= period) {
                if (index == period) {
                    rvi = Ext.Array.mean(Ext.Array.slice(indArr, 0, period));
                } else {
                    rvi = (ind - prevRvi) * multiplier + prevRvi;
                }

                prevRvi = rvi;
                item.data.rvi = rvi;

                rviArr.push(rvi);
            }

            if (index >= period + signalPeriod) {
                if (index == period + signalPeriod) {
                    sigRvi = Ext.Array.mean(Ext.Array.slice(rviArr, 0, signalPeriod));
                } else {
                    sigRvi = (rvi - prevSigRvi) * multiplier2 + prevSigRvi;
                }

                prevSigRvi = sigRvi;
                item.data.sigrvi = sigRvi;
            }
        });

        delete indArr;
        delete rviArr;

        this.callParent(arguments);
    }
});