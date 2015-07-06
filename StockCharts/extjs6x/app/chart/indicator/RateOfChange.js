/**
 * @class Chartsly.chart.indicator.RateOfChange
 * @extends Ext.chart.CartesianChart
 *
 * RateOfChange (ROC) chart that looks for numeric axis and adds ROC specific configuration
 * such as fields. fields is defaulted to ['roc'] as this field is added by the RateOfChange series to the records.
 * 
 * The calculated ROC value is set as "roc" field on the record
 */
Ext.define("Chartsly.chart.indicator.RateOfChange", {
    extend: 'Ext.chart.CartesianChart',
    requires: ['Chartsly.series.indicator.RateOfChange'],

    alternateClassName: ['Chartsly.chart.indicator.ROC', 'Chartsly.chart.ROC'],

    xtype: 'rocchart',

    initConfig: function(config) {

        Ext.Array.each(config.axes, function(axis, index, recs) {
            if (axis.type === 'numeric') {
                Ext.apply(axis, {
                    fields: ['roc']
                });
            }
        });

        this.callParent(arguments);
    }
});
