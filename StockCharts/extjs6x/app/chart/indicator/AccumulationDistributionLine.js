/**
 * @class Chartsly.chart.indicator.AccumulationDistributionLine
 * @extends Ext.chart.CartesianChart
 *
 * AccumulationDistributionLine (ADL) chart that looks for numeric axis and adds ADL specific configuration
 * such as fields. fields is defaulted to ['adl'] as this field is added by the ADL series to the records.
 * 
 * The calculated ADL value is set a "adl" field on the record
 */
Ext.define("Chartsly.chart.indicator.AccumulationDistributionLine", {
    extend: 'Ext.chart.CartesianChart',
    requires: ['Chartsly.series.indicator.AccumulationDistributionLine'],

    alternateClassName: ['Chartsly.chart.indicator.ADL', 'Chartsly.chart.ADL'],

    xtype: 'adlchart',

    initConfig: function(config) {

        Ext.Array.each(config.axes, function(axis, index, recs) {
            if (axis.type === 'numeric') {
                Ext.apply(axis, {
                    fields: ['adl'],
                    renderer: function (value, layoutContext, lastValue) {
                        return value;
                    }
                });
            }
        });

        this.callParent(arguments);
    }
});
