/**
 * @class Chartsly.chart.indicator.WilliamPctR
 * @extends Ext.chart.CartesianChart
 *
 * William %R chart that looks for numeric axis and adds William %R specific configuration
 * such as fields, maximum, and minimum. fields is defaulted to ['pctr'] as this field is added by the
 * WilliamPctR series to the records.
 * 
 * The calculated %R value is set a "pctr" field on the record
 */
Ext.define("Chartsly.chart.indicator.WilliamPctR", {
    extend: 'Ext.chart.CartesianChart',
    requires: ['Chartsly.series.indicator.WilliamPctR', 'Chartsly.sprite.indicator.WilliamPctR'],
    xtype: 'williampctrchart',

    initConfig: function(config) {

        var series = config.series[0];
        var obLevel = series.overboughtLevel;
        var osLevel = series.oversoldLevel;

        Ext.Array.each(config.axes, function(axis, index, recs) {
            if (axis.type === 'numeric') {
                Ext.apply(axis, {
                    fields: ['pctr'],
                    maximum: 0,
                    minimum: -100,
                    renderer: function (value, layoutContext, lastValue) {
                        if (value == osLevel || value == -50 || value == obLevel){
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
