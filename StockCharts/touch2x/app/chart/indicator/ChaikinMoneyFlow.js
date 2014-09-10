/**
 * @class Chartsly.chart.indicator.ChaikinMoneyFlow
 * @extends Ext.chart.CartesianChart
 *
 * ChaikinMoneyFlow chart that looks for numeric axis and adds Chikin MF specific configuration
 * such as fields, maximum, and minimum. fields is defaulted to ['cmf'] as this field is added by the
 * ChaikinMoneyFlow series to the records.
 * 
 * The calculated value is set a "cmf" field on the record
 */
Ext.define("Chartsly.chart.indicator.ChaikinMoneyFlow", {
    extend: 'Ext.chart.CartesianChart',
     alternateClassName: 'Chartsly.chart.CMF',
    requires: ['Chartsly.series.indicator.ChaikinMoneyFlow'],
    xtype: 'chaikinmoneyflow',

    initConfig: function(config) {
         
        var series = config.series[0];
       
        Ext.Array.each(config.axes, function(axis, index, recs) {
            if (axis.type === 'numeric') {
                Ext.apply(axis, {
                    fields: ['cmf'],
                    maximum: 1,
                    minimum: -1
                          //,majorTickSteps:4
                 
                });
            }
        });

        this.callParent(arguments);
    }
});
