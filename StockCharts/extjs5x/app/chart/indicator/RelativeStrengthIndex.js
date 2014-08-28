/**
 * @class Chartsly.chart.indicator.RelativeStrengthIndex
 * @extends Ext.chart.CartesianChart
 *
 * Relative Strength Index chart that looks for numeric axis and adds RSI specific configuration
 * such as fields, maximum, and minimum. fields is defaulted to ['rsi'] as this field is added by the
 * RelativeStrengthIndex series to the records.
 * 
 * The calculated rsi value is set a "rsi" field on the record
 */
Ext.define("Chartsly.chart.indicator.RelativeStrengthIndex", {
    extend: 'Ext.chart.CartesianChart',
    requires: ['Chartsly.series.indicator.RelativeStrengthIndex', 'Chartsly.sprite.indicator.RelativeStrengthIndex'],
    xtype: 'rsichart',

    initConfig: function(config) {

        var series = config.series[0];
        var obLevel = series.overboughtLevel;
        var osLevel = series.oversoldLevel;

        Ext.Array.each(config.axes, function(axis, index, recs) {
            if (axis.type === 'numeric') {

                Ext.apply(axis, {
                    fields: ['rsi'],
                    maximum: 100,
                    minimum: 0,
                    renderer: function (value, layoutContext, lastValue) {
                        if (value == osLevel || value == 50 || value == obLevel){
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
