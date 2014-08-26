Ext.define("Chartsly.chart.indicator.RsiChart", {
    extend: 'Ext.chart.CartesianChart',
    requires: ['Chartsly.series.indicator.RsiChart', 'Chartsly.sprite.indicator.RsiChart'],
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
