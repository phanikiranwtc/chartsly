/**
 * @class Chartsly.chart.indicator.AverageTrueRange
 * @extends Ext.chart.CartesianChart
 *
 * AverageTrueRange (ATR) chart that looks for numeric axis and adds ATR specific configuration
 * such as fields. fields is defaulted to ['atr'] as this field is added by the ATR series to the records.
 * 
 * The calculated ATR value is set as "atr" field on the record
 */
Ext.define("Chartsly.chart.indicator.AverageTrueRange", {
    extend: 'Ext.chart.CartesianChart',
    requires: ['Chartsly.series.indicator.AverageTrueRange'],

    alternateClassName: ['Chartsly.chart.indicator.ATR', 'Chartsly.chart.ATR'],

    xtype: 'atrchart',

    initConfig: function(config) {

        Ext.Array.each(config.axes, function(axis, index, recs) {
            if (axis.type === 'numeric') {
                Ext.apply(axis, {
                    fields: ['atr']
                });
            }
        });

        this.callParent(arguments);
    }
});
