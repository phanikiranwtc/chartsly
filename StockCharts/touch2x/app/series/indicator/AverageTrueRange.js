/**
 * @class Chartsly.series.indicator.AverageTrueRange
 * @extends Ext.chart.series.Cartesian
 *
 * AverageTrueRange (ATR) series that iterates the store records and calculates 
 * the ATR value based on the following formulae:
 *
 * Current ATR = [(Prior ATR x 13) + Current TR] / 14
 * 
 * For more detail, refer to http://stockcharts.com/school/doku.php?id=chart_school:technical_indicators:average_true_range_atr
 *
 * The calculated ATR value is set a "atr" field on the record
 */
Ext.define('Chartsly.series.indicator.AverageTrueRange', {
    extend: 'Ext.chart.series.Cartesian',
    alias: 'series.atr',
    seriesType: 'lineSeries',

    config: {
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
         * Look-back period to calculate ATR. Defaults to 14 periods
         */
        period: 14
    },

    /*
     * Creats a ADL series
     * @param {Object} [config] Configuration
     */
    constructor: function (config) {

        var me = this;

        var st = Ext.data.StoreManager.lookup(config.store);
        var recs = st.getRange();

        var high = 0, low = 0, close = 0, prevClose = 0, 
            hMinL, hMinPrevC, lMinPrevC, tr, prevAtr, trArr = [], atr,
            period = config.period;

        st.each(function (item, index, length) {
            high = item.get(config.highField);
            low = item.get(config.lowField);
            close = item.get(config.closeField);

            hMinL = high - low;
            hMinPrevC = Math.abs(high - prevClose);
            lMinPrevC = Math.abs(low - prevClose);

            //if it is first record
            if (index == 0) {
                tr = hMinL;
            } else {
                tr = Ext.Array.max([hMinL, hMinPrevC, lMinPrevC]);
            }

            //Calculate ATR based on period
            if (index == (period - 1)) {
                atr = Ext.Array.mean(trArr);
            }

            if (index < period) {
                //we need to push only items for the specified period
                trArr.push(tr);                
            } else { 
                //index >= period
                //Current ATR = [(Prior ATR x 13) + Current TR] / 14
                atr = (prevAtr*(period - 1) + tr)/period;
            }

            item.data.atr = atr;

            prevAtr = atr;
        });

        this.callParent(arguments);
    }
});