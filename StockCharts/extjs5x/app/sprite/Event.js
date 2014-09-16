/**
 * @class Chartsly.sprite.Event
 * @extends Ext.chart.series.sprite.Aggregative
 *
 */
Ext.define('Chartsly.sprite.Event', {
    alias: 'sprite.event',
    extend: 'Ext.chart.series.sprite.Aggregative',

    inheritableStatics: {
        def: {
            processors: {
                seq: 'number'
            }
        }
    },

    list: null,

    /**
     * @private Override {@link Ext.chart.series.sprite.Aggregative#renderAggregates}
     */
    renderAggregates: function (aggregates, start, end, surface, ctx, clip, rect) {
        var me = this,
            attr = me.attr,
            dataX = attr.dataX,
            dataY = attr.dataY,
            labels = attr.labels,
            matrix = attr.matrix,
            surfaceMatrix = surface.matrix,
            pixel = surface.devicePixelRatio,
            xx = matrix.getXX(),
            yy = matrix.getYY(),
            dx = matrix.getDX(),
            dy = matrix.getDY(),
            markerCfg = {},
            list = me.list || (me.list = []),
            x, y, i, index,
            minXs = aggregates.minX,
            maxXs = aggregates.maxX,
            minYs = aggregates.minY,
            maxYs = aggregates.maxY,
            idx = aggregates.startIdx;

        list.length = 0;
        for (i = start; i < end; i++) {
            var minX = minXs[i],
                maxX = maxXs[i],
                minY = minYs[i],
                maxY = maxYs[i];

            if (minX < maxX) {
                list.push(minX * xx + dx, minY * yy + dy, idx[i]);
                list.push(maxX * xx + dx, maxY * yy + dy, idx[i]);
            } else if (minX > maxX) {
                list.push(maxX * xx + dx, maxY * yy + dy, idx[i]);
                list.push(minX * xx + dx, minY * yy + dy, idx[i]);
            } else {
                list.push(maxX * xx + dx, maxY * yy + dy, idx[i]);
            }
        }

        if (list.length) {
            for (i = 0; i < list.length; i += 3) {
                x = list[i];
                y = list[i + 1];
                index = list[i + 2];
                if (attr.renderer) {
                    markerCfg = {
                        type: 'marker',
                        x: x,
                        y: me.attr.seq*30
                    };
                    markerCfg = attr.renderer.call(me, me, markerCfg, {store: me.getStore()}, start + i/3) || {};
                }
                markerCfg.translationX = surfaceMatrix.x(x, me.attr.seq*30);
                markerCfg.translationY = surfaceMatrix.y(x, me.attr.seq*30);
                me.putMarker('markers', markerCfg, index, !attr.renderer);
            }
        }
    },

    /**
     * @private Override {@link Ext.chart.series.sprite.Cartesian#getIndexNearPoint}
     */
    getIndexNearPoint: function (x, y) {
        var sprite = this,
            attr = sprite.attr,
            dataX = attr.dataX,
            surface = sprite.getSurface(),
            surfaceRect = surface.getRect() || [0,0,0,0],
            surfaceHeight = surfaceRect[3],
            hitX, hitY,
            i, bbox,
            index = -1;

        if (attr.flipXY) {
            hitX = surfaceHeight - y;
            if (surface.getInherited().rtl) {
                hitY = surfaceRect[2] - x;
            } else {
                hitY = x;
            }
        } else {
            hitX = x;
            hitY = surfaceHeight - y;
        }

        var seq = attr.seq;
        for (i = 0; i < dataX.length; i++) {
            //get the marker sprites as we are using them to draw the events
            bbox = sprite.getMarkerBBox('markers', i);

            if (bbox && hitX >= bbox.x && hitX <= (bbox.x + bbox.width) && hitY >= 0 && hitY <= 30) {
                index = i;
            }
        }
        return index;
    }
});