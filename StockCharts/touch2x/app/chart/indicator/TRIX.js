/**
 * @class Chartsly.chart.indicator.TRIX
 * @extends Ext.chart.CartesianChart
 *
 * TRIX chart that looks for numeric axis and adds TRIX specific configuration
 * such as fields. fields is defaulted to ['trix', 'sigtrix'] as this field is added by the
 * TRIX series to the records.
 * 
 * The calculated trix and sigtrix values are set as "trix" and "sigtrix" fields on the record, respectively
 */
Ext.define("Chartsly.chart.indicator.TRIX", {
    extend: 'Ext.chart.CartesianChart',
    requires: ['Chartsly.series.indicator.TRIX'],
    xtype: 'trixchart',

    initConfig: function(config) {

        Ext.Array.each(config.axes, function(axis, index, recs) {
            if (axis.type === 'numeric') {
                Ext.apply(axis, {
                    fields: ['trix', 'sigtrix']
                });
            }
        });

        //TODO: Find a better solution for preparing the config and drawing TRIX signal line.
        //Will re-visit this in the next iteration.
        
        //add a line series for TRIX Signal line
        config.series.push({
            store: config.series[0].store,
            type: 'trix',
            xField: 'date',
            yField: 'sigtrix',
            closeField: "close",
            period: config.period,
            signalPeriod: config.signalPeriod,
            // smooth: true,
            style: {
                stroke: 'rgba(255,102,102,0.75)',
                miterLimit: 1
            }
        });

        this.callParent(arguments);
    }
});
