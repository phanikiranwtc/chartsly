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
                renderer: function(storeItem, item) {
                    //TODO: Parameterize the string format and fields
                    this.setHtml(Ext.String.capitalize(type) + ' - ' + storeItem.get("type") + ' : ' + storeItem.get(config.yField) + '%' + '</br>' + storeItem.get("remark"));
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
     * @private Override {@link Ext.chart.series.Series#getDefaultSpriteConfig}
     * It gets the cartesian series config by calling the parent and then applies
     * the William %R specific configs so that they are available to the WilliamPctR
     * series
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