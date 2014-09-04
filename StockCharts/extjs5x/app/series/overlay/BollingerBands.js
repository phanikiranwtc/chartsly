/**
 * @class Chartsly.series.overlay.BollingerBands
 * @extends Ext.chart.series.Cartesian
 *
 * ******* NOTICE ********
 * TODO: This is terribly done by adding three series to render the band with upper and lower lines. 
 * TODO: This needs to be changed so that the Bollinger Series and/or sprite takes care of showing three
 * lines. Since, the events are not working on charts & series, we could not implement it the way we 
 * wanted to. Refer to http://www.sencha.com/forum/showthread.php?288676 for more detail on this problem.
 * We will re-visit this as soon as the patch is available from Sencha and design the series, properly. Until
 * then, please bear with the poor performace (due to the design problem)
 *
 */
Ext.define('Chartsly.series.overlay.BollingerBands', {
    extend: 'Ext.chart.series.Cartesian',
    alias: 'series.bbands',
    seriesType: 'lineSeries',

    requires: ['Chartsly.sprite.overlay.BollingerBands'],

    config: {
        /*
         * Data field containing the close value. Defaults to "close"
         */
        closeField: "close",

        period: 10,
        bandGap: 2
    },

    /*
     * Creats a Bollinger Bands series
     * @param {Object} [config] Configuration
     */
    constructor: function (config) {

        var me = this;

        // var chart = config.chart;

        // var series = chart.config.series;

        // chart.on("painted", function() {
        //     alert('Chart painted!!!!');
        // });

        var sma, p = config.period;

        var st = Ext.data.StoreManager.lookup(config.store);
        var recs = st.getRange();
        var closes = Ext.Array.pluck(Ext.Array.pluck(recs, "data"), config.closeField);

        var stdev, middle, upper, lower, tmpArr;

        Ext.Array.each(recs, function (item, index) {
            if (index < p) {
                return;
            }

            tmpArr = Ext.Array.slice(closes, index - p, index);
            middle = Ext.Array.mean(tmpArr);

            stdev = me.standardDeviation(tmpArr, middle);

            item.data.bband = middle;
            item.data.upperbband = middle + stdev * config.bandGap;
            item.data.lowerbband = middle - stdev * config.bandGap;
        });

        this.callParent(arguments);

        this.on("chartattached", function() {
            alert("Chart Attached!!");
        });
    },

    standardDeviation: function(valArr, mean) {
        //if mean is undefined, calculate mean and use it in the calculation
        if (!mean) {
            mean = Ext.Array.mean(Ext.Array.slice(valArr));
        }

        var sqDiff = 0;
        Ext.Array.each(valArr, function(value, index) {
            sqDiff += Math.pow(value - mean, 2);
        });

        var stdev = Math.sqrt(sqDiff/valArr.length);

        return stdev;
    },
    /**
     * @private Override {@link Ext.chart.series.Series#getDefaultSpriteConfig}
     * It gets the cartesian series config by calling the parent and then applies
     * the William %R specific configs so that they are available to the WilliamPctR
     * series
     * @return {Object} sprite config object
     */
    getDefaultSpriteConfig: function () {
        var me = this,
            parentStyleConfig = me.callParent(arguments);

        return Ext.apply(parentStyleConfig, {
            period: me.config.period,
            bandGap: me.config.bandGap
        });
    }
});