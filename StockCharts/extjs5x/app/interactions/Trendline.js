/**
 * The Trendline interaction allows the user draw lines on a chart.
 * The values are obtained by single-touch dragging on the chart.
 */

Ext.define('Chartsly.interactions.Trendline', {

    extend: 'Ext.chart.interactions.Abstract',
    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.axis.layout.Discrete'
    ],

    type: 'trendline',
    alias: 'interaction.trendline',

    config: {
        /**
         * @cfg {Object} lines
         * Specifies attributes of horizontal and vertical lines that make up the crosshair.
         * If this config is missing, black dashed lines will be used.
         *
         *     {
         *          strokeStyle: 'red',
         *          lineDash: [] // solid line
         *     }
         */
        line: {
            strokeStyle: 'red'/*,
            lineDash: [5, 5] */
        },

        /**
         * @cfg {String} gesture
         * Specifies which gesture should be used for starting/maintaining/ending the interaction.
         */
        gesture: 'drag'
    },

    applyLine: function (lineConfig, oldLineConfig) {
        return Ext.merge(oldLineConfig || {}, lineConfig);
    },

    updateChart: function (chart) {
        if (!(chart instanceof Ext.chart.CartesianChart)) {
            throw 'Trendline interaction can only be used on cartesian charts.';
        }
        this.callParent(arguments);
    },

    getGestures: function () {
        var me = this,
            gestures = {};
        gestures[me.getGesture()] = 'onGesture';
        // gestures[me.getGesture() + 'start'] = 'onGestureStart';
        gestures[me.getGesture() + 'end'] = 'onGestureEnd';
        gestures['mousedown'] = 'onGestureStart'; //You may rely on mousedown for better accuracy of the starting point
        return gestures;
    },

    onGestureStart: function (e) {
        var me = this;

        var chart = me.getChart(),
            surface = chart.getSurface('overlay'),
            rect = chart.getInnerRect(),
            chartWidth = rect[2],
            chartHeight = rect[3],
            xy = chart.getEventXY(e),
            x = xy[0],
            y = xy[1],
            lineConfig = me.getLine();

        if (x > 0 && x < chartWidth && y > 0 && y < chartHeight) {
            me.lockEvents(me.getGesture());
            me.trendLine = surface.add(Ext.apply({
                xclass: 'Ext.draw.sprite.Line',
                fromX: x,
                fromY: y
            }, lineConfig));

            return false;
        }

    },

    onGesture: function (e) {
        var me = this;
        if (me.getLocks()[me.getGesture()] !== me) {
            return;
        }
        var chart = me.getChart(),
            surface = chart.getSurface('overlay'),
            rect = Ext.Array.slice(chart.getInnerRect()),
            padding = chart.getInnerPadding(),
            px = padding.left,
            py = padding.top,
            chartWidth = rect[2],
            chartHeight = rect[3],
            xy = chart.getEventXY(e),
            x = xy[0],
            y = xy[1];

        if (x < 0) {
            x = 0;
        } else if (x > chartWidth) {
            x = chartWidth;
        }
        if (y < 0) {
            y = 0;
        } else if (y > chartHeight) {
            y = chartHeight;
        }
        x += px;
        y += py;

        me.trendLine.setAttributes({toX: x, toY: y});
        surface.renderFrame();
        return false;
    },

    onGestureEnd: function (e) {
        var me = this,
            chart = me.getChart(),
            surface =  chart.getSurface('overlay');

        surface.renderFrame();
        me.unlockEvents(me.getGesture());
    }

});
