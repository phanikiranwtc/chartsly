/**
 * @class Chartsly.series.overlay.MovingAverageEnvelops
 * @extends Ext.chart.series.Cartesian
 *
 * ******* NOTICE ********
 * TODO: This is terribly done by adding three series to render the band with upper and lower lines. 
 * TODO: This needs to be changed so that the MovingAverageEnvelops Series and/or sprite takes care of showing three
 * lines. Since, the events are not working on charts & series, we could not implement it the way we 
 * wanted to. Refer to http://www.sencha.com/forum/showthread.php?288676 for more detail on this problem.
 * We will re-visit this as soon as the patch is available from Sencha and design the series, properly. Until
 * then, please bear with the poor performace (due to the design problem)
 *
 */
Ext.define('Chartsly.series.overlay.MovingAverageEnvelops', {
    extend: 'Ext.chart.series.Cartesian',
    alias: 'series.maenv',
    seriesType: 'lineSeries',

    config: {
        /*
         * Data field containing the close value. Defaults to "close"
         */
        closeField: "close",

        period: 20,
        percentage: 2.5
    },

    /*
     * Creats a MA Envelops series
     * @param {Object} [config] Configuration
     */
    constructor: function (config) {

        var me = this;

        var sma, p = config.period;

        var st = Ext.data.StoreManager.lookup(config.store);
        var recs = st.getRange();
        var closes = Ext.Array.pluck(Ext.Array.pluck(recs, "data"), config.closeField);

        var sma, upperEnv, lowerEnv;

        Ext.Array.each(recs, function (item, index) {
            if (index < p) {
                return;
            }

            sma = Ext.Array.mean(Ext.Array.slice(closes, index - p, index));

            item.data.env = sma;
            item.data.upperenv = sma + (sma * config.percentage/100);
            item.data.lowerenv = sma - (sma * config.percentage/100);
        });

        this.callParent(arguments);
    }
});