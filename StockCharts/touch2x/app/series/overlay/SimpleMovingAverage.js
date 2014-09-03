/**
 * @class Chartsly.series.overlay.SimpleMovingAverage
 * @extends Ext.chart.series.Cartesian
 *
 * The calculated SMA value is set as "sma" field on the record
 *
 */
Ext.define('Chartsly.series.overlay.SimpleMovingAverage', {
    extend: 'Ext.chart.series.Cartesian',
    alias: 'series.sma',
    seriesType: 'lineSeries',

    config: {
        /*
         * Data field containing the close value. Defaults to "close"
         */
        closeField: "close",

        period: 5
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

        Ext.Array.each(recs, function (item, index) {
            if (index < p) {
                return;
            }

            sma = Ext.Array.mean(Ext.Array.slice(closes, index - p, index));

            item.data.sma = sma;
        });

        this.callParent(arguments);
    }
});