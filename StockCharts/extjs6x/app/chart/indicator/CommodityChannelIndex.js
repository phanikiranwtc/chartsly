/**
 * @class Chartsly.chart.indicator.CommodityChannelIndex
 * @extends Ext.chart.CartesianChart
 *
 * Commodity Channel Index (CCI) chart that looks for numeric axis and adds CCI specific configuration
 * such as fields. fields is defaulted to ['cci'] as this field is added by the
 * CommodityChannelIndex series to the records.
 * 
 * The calculated CCI value is set as "cci" field on the record
 */
Ext.define("Chartsly.chart.indicator.CommodityChannelIndex", {
    extend: 'Ext.chart.CartesianChart',
    requires: ['Chartsly.series.indicator.CommodityChannelIndex', 'Chartsly.sprite.indicator.CommodityChannelIndex'],
    xtype: 'ccichart',

    initConfig: function(config) {

        Ext.Array.each(config.axes, function(axis, index, recs) {
            if (axis.type === 'numeric') {
                Ext.apply(axis, {
                    fields: ['cci']
                });
            }
        });

        this.callParent(arguments);
    }
});
