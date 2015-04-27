/**
 * @class Chartsly.chart.indicator.RelativeVigorIndex
 * @extends Ext.chart.CartesianChart
 *
 * RelativeVigorIndex (RVI) chart that looks for numeric axis and adds RVI specific configuration
 * such as fields. fields is defaulted to ['rvi', 'sigrvi'] as this field is added by the RelativeVigorIndex series to the records.
 * 
 * The calculated RVI and signal values are set as "rvi" and "sigrvi" fields, respectively, on the record
 */
Ext.define("Chartsly.chart.indicator.RelativeVigorIndex", {
    extend: 'Ext.chart.CartesianChart',
    requires: ['Chartsly.series.indicator.RelativeVigorIndex'],

    alternateClassName: ['Chartsly.chart.indicator.RVI', 'Chartsly.chart.RVI'],

    xtype: 'rvichart',

    initConfig: function(config) {

        Ext.Array.each(config.axes, function(axis, index, recs) {
            if (axis.type === 'numeric') {
                Ext.apply(axis, {
                    fields: ['rvi', 'sigrvi']
                });
            }
        });

        //TODO: Find a better solution for preparing the config and drawing RVI signal line.
        //Will re-visit this in the next iteration.
        
        //add a line series for RVI Signal line
        config.series.push({
            store: config.series[0].store,
            type: 'rvi',
            xField: 'date',
            yField: 'sigrvi',
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
