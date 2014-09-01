/**
 * @class Chartsly.chart.indicator.OnBalanceVolume
 * @extends Ext.chart.CartesianChart
 *
 * OnBalanceVolume (OBV) chart that looks for numeric axis and adds OBV specific configuration
 * such as fields. fields is defaulted to ['obv'] as this field is added by the OnBalanceVolume series to the records.
 * 
 * The calculated OBV value is set as "obv" field on the record
 */
Ext.define("Chartsly.chart.indicator.OnBalanceVolume", {
    extend: 'Ext.chart.CartesianChart',
    requires: ['Chartsly.series.indicator.OnBalanceVolume'],

    alternateClassName: ['Chartsly.chart.indicator.OBV', 'Chartsly.chart.OBV'],

    xtype: 'obvchart',

    initConfig: function(config) {

        Ext.Array.each(config.axes, function(axis, index, recs) {
            if (axis.type === 'numeric') {
                Ext.apply(axis, {
                    fields: ['obv']
                });
            }
        });

        this.callParent(arguments);
    }
});
