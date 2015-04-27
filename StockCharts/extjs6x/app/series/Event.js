/**
 * @class Chartsly.series.Event
 * @extends Ext.chart.series.Cartesian
 *
 */
Ext.define('Chartsly.series.Event', {
    extend: 'Ext.chart.series.Cartesian',
    alias: 'series.event',
    seriesType: 'event',

    requires: ['Chartsly.sprite.Event'],

    config: {
        eventType: 'event',
        /*
         * Image path that shall be used to indicate events. Must be 30px x 30px.
         */
        image: "resources/images/Event.png"
    },

    /*
     * Creats a Event series
     * @param {Object} [config] Configuration
     */
    constructor: function (config) {

        var me = this;

        var type = config.eventType;

        switch(type) {
            case 'dividend':
                me.setImage("resources/images/Dividend.png");
                break;
            case 'bonus':
                me.setImage("resources/images/Bonus.png");
                break;
            case 'split':
                me.setImage("resources/images/Split.png");
                break;
            case 'rights':
                me.setImage("resources/images/Rights.png");
                break;
            default:
                me.setImage("resources/images/Event.png");
                break;
        }

        Ext.apply(config, {
            marker: {
                type: 'image',
                src: me.getImage(),
                width: 30,
                height: 30,
                x: -15,
                y: -30,
                // scale: 0.7,
                fx: {
                    duration: 200
                }
            },
            tooltip: {
                trackMouse: true,
                style: 'background: #fff',
                renderer: function(tooltip,record, item) {
                    //TODO: Parameterize the string format and fields
                    tooltip.setHtml(Ext.String.capitalize(type) + ' - ' + record.get("type") + ' : ' + record.get(config.yField) + '%' + '</br>' + record.get("remark"));
                }
            }
        });

        //find out the event series sequence
        var series = config.chart.config.series;
        var i = 0;
        me.eventSeriesSeq = 0;
        for (i; i < series.length; i++) {
            if (series[i].type == 'event') {
                if (series[i].eventType == config.eventType) {
                    me.eventSeriesSeq = i;
                }
            }
        }

        this.callParent(arguments);
    },

    /**
     * @private Override {@link Ext.chart.series.Cartesian#getItemForPoint}
     */
    getItemForPoint: function (x, y) {
        if (this.getSprites()) {
            var me = this,
                chart = me.getChart(),
                padding = chart.getInnerPadding(),
                isRtl = chart.getInherited().rtl,
                seq = me.sprites[0].config.seq;

            // Convert the coordinates because the "markers" sprites that draw the bars ignore the chart's InnerPadding.
            // See also Chartsly.sprite.Event.getIndexNearPoint(x,y) regarding the series's vertical coordinate system.
            arguments[0] = x + (isRtl ? padding.right : -padding.left);
            arguments[1] = y + seq*30 + padding.bottom;
            return me.callParent(arguments);
        }
    },

    /**
     * @private Override {@link Ext.chart.series.Series#getDefaultSpriteConfig}
     * It gets the cartesian series config by calling the parent and then applies
     * the Event specific configs so that they are available to the Event series
     * @return {Object} sprite config object
     */
    getDefaultSpriteConfig: function () {
        var me = this,
            parentStyleConfig = me.callParent(arguments);

        return Ext.apply(parentStyleConfig, {
            seq: me.eventSeriesSeq
        });
    }
});
