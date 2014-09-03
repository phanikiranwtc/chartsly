/**
 * @class Chartsly.series.overlay.ExponentialMovingAverage
 * @extends Ext.chart.series.Cartesian
 *
 * The calculated EMA value is set as "ema" field on the record
 *
 */
Ext.define('Chartsly.series.overlay.ExponentialMovingAverage', {
    extend: 'Ext.chart.series.Cartesian',
    alias: 'series.ema',
    seriesType: 'lineSeries',

    config: {
        /*
         * Data field containing the close value. Defaults to "close"
         */
        closeField: "close",

        period: 10
    },

    /*
     * Creats a SMA series
     * @param {Object} [config] Configuration
     */
    constructor: function (config) {

        var me = this;

        var sma, p = config.period;

        var st = Ext.data.StoreManager.lookup(config.store);
        var recs = st.getRange();

        var closes = Ext.Array.pluck(Ext.Array.pluck(recs, "data"), config.closeField);

        var prevEma;

        var multiplier = 2/(p + 1);

        Ext.Array.each(recs, function (item, index) {
            if (index < p) {
                return;
            }

            if (index == p) {
                ema = Ext.Array.mean(Ext.Array.slice(closes, index - p, index));                
            } else {
                ema = (item.data[config.closeField] - prevEma) * multiplier + prevEma;
            }

            item.data.ema = ema;
            prevEma = ema;
        });

        this.callParent(arguments);
    }
});