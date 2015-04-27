/**
 * @class Chartsly.chart.indicator.MovingAverageConvergenceDivergence
 * @extends Ext.chart.CartesianChart
 *
 * MovingAverageConvergenceDivergence (MACD) chart that looks for numeric axis and adds MACD specific 
 * configuration such as fields. fields is defaulted to ['macd', 'sigmacd'] as this field is 
 * added by the MACD series to the records.
 * 
 * The calculated MACD and signal values are set as "macd" and "sigmacd" fields, respectively, on the record
 */
Ext.define("Chartsly.chart.indicator.MovingAverageConvergenceDivergence", {
    extend: 'Ext.chart.CartesianChart',
    requires: ['Chartsly.series.indicator.MovingAverageConvergenceDivergence', 
                'Chartsly.sprite.indicator.MovingAverageConvergenceDivergence'],

    alternateClassName: ['Chartsly.chart.indicator.MACD', 'Chartsly.chart.MACD'],

    xtype: 'macdchart',

    initConfig: function(config) {

        Ext.Array.each(config.axes, function(axis, index, recs) {
            if (axis.type === 'numeric') {
                Ext.apply(axis, {
                    fields: ['macd', 'sigmacd', 'histmacd']
                });
            }
        });

        //TODO: Find a better solution for preparing the config and drawing MACD signal line.
        //Will re-visit this in the next iteration.
        
        //add a line series for MACD Signal line and a bar for MACD Histogram
        config.series.push({
            store: config.series[0].store,
            type: 'macd',
            xField: 'date',
            yField: 'sigmacd',
            closeField: "close",
            period: config.period,
            signalPeriod: config.signalPeriod,
            // smooth: true,
            style: {
                stroke: 'rgba(255,102,102,0.75)',
                miterLimit: 1
            }
        }, {
            store: config.series[0].store,
            type: 'bar',
            xField: 'date',
            yField: 'histmacd',
            style: {
                stroke: 'rgba(228,124,124,0.75)',
                fillStyle: 'rgba(228,124,124,0.75)'
            }
        });

        this.callParent(arguments);
    }
});
