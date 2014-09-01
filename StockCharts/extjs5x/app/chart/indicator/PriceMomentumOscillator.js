/**
 * @class Chartsly.chart.indicator.PriceMomentumOscillator
 * @extends Ext.chart.CartesianChart
 *
 * PriceMomentumOscillator (PMO) chart that looks for numeric axis and adds PMO specific configuration
 * such as fields. fields is defaulted to ['pmo'] as this field is added by the PriceMomentumOscillator series to the records.
 * 
 * The calculated PMO value is set as "pmo" field on the record
 */
Ext.define("Chartsly.chart.indicator.PriceMomentumOscillator", {
    extend: 'Ext.chart.CartesianChart',
    requires: ['Chartsly.series.indicator.PriceMomentumOscillator'],

    alternateClassName: ['Chartsly.chart.indicator.PMO', 'Chartsly.chart.PMO'],

    xtype: 'pmochart',

    initConfig: function(config) {

        Ext.Array.each(config.axes, function(axis, index, recs) {
            if (axis.type === 'numeric') {
                Ext.apply(axis, {
                    fields: ['pmo', 'sigpmo']
                });
            }
        });

        //TODO: Find a better solution for preparing the config and drawing PMO signal line.
        //Will re-visit this in the next iteration.
        
        //add a line series for PMO Signal line
        config.series.push({
            store: config.series[0].store,
            type: 'pmo',
            xField: 'date',
            yField: 'sigpmo',
            closeField: "close",
            emaPeriod1: 35,
            emaPeriod2: 20,
            emaSignalPeriod: 10,
            // smooth: true,
            style: {
                stroke: 'rgba(255,102,102,0.75)',
                miterLimit: 1
            }
        });

        this.callParent(arguments);
    }
});
