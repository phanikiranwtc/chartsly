/**
 * @class Chartsly.chart.indicator.MoneyFlowIndex
 * @extends Ext.chart.CartesianChart
 *
 * MoneyFlowIndex chart that looks for numeric axis and adds MoneyFlowIndex specific configuration
 * such as fields, maximum, and minimum. fields is defaulted to ['mfi'] as this field is added by the
 * moneyflowindex series to the records.
 * 
 * The calculated MoneyFlowIndex value is set a "mfi" field on the record
 */
Ext.define("Chartsly.chart.indicator.MoneyFlowIndex", {
    extend: 'Ext.chart.CartesianChart',
    requires: ['Chartsly.series.indicator.MoneyFlowIndex', 'Chartsly.sprite.indicator.MoneyFlowIndex'],
    xtype: 'moneyflowindexchart',

    initConfig: function(config) {

        var series = config.series[0];
        var obLevel = series.overboughtLevel;
        var osLevel = series.oversoldLevel;

        Ext.Array.each(config.axes, function(axis, index, recs) {
            if (axis.type === 'numeric') {
                Ext.apply(axis, {
                    fields: ['mfi'],
                    maximum: 100,
                    minimum: 0,
		    majorTickSteps: 20,	
                    renderer: function (value, layoutContext, lastValue) { 
		                if (value == osLevel || value == (osLevel+obLevel)/2 || value == obLevel){
		                    return value;
		                } else {
		                    return "";
		                }
                    } 
                });
            }
        });

        this.callParent(arguments);
    }
});
