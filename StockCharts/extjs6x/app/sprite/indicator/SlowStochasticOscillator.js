/**
 * @class Chartsly.sprite.indicator.SlowStochasticOscillator
 * @extends Ext.chart.series.sprite.Line
 *
 * SlowStochasticOscillator series sprite. This does the following:
 * 
 * --> Draws horizontal lines for overbought level, oversold level, 50.
 * --> Draws the line graph
 */
Ext.define('Chartsly.sprite.indicator.SlowStochasticOscillator', {
    alias: 'sprite.slowstochasticoscillator',
    extend: 'Ext.chart.series.sprite.Line',

    inheritableStatics: {
        def: {
            processors: {
                preciseStroke  : 'bool',
                overboughtLevel: 'number',
                oversoldLevel  : 'number',
                lookBackPeriod : 'number'
            }
        }
    },

    list: null,

    

    /**
     * @private Override {@link Ext.chart.series.sprite.Line#renderAggregates}
     */
    renderAggregates: function (aggregates, start, end, surface, ctx, clip, rect) {
        var me = this,
            attr = me.attr,
            dataX = attr.dataX,
            dataY = attr.dataY,
            labels = attr.labels,
            drawLabels = labels && me.getMarker('labels'),
            drawMarkers = me.getMarker('markers'),
            matrix = attr.matrix,
            surfaceMatrix = surface.matrix,
            pixel = surface.devicePixelRatio,
            xx = matrix.getXX(),
            yy = matrix.getYY(),
            dx = matrix.getDX(),
            dy = matrix.getDY(),
            markerCfg = {},
            list = this.list || (this.list = []),
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
                if (drawMarkers) {
                    me.drawMarker(x, y, index);
                }
                if (drawLabels && labels[index]) {
                    me.drawLabel(labels[index], x, y, index, rect);
                }
            }
        }
        var pixelAdjust = attr.lineWidth * surface.devicePixelRatio / 2;

        pixelAdjust -= Math.floor(pixelAdjust);

        var obLevel =  Math.round(attr.overboughtLevel * yy + dy) - pixelAdjust;
        var osLevel =  Math.round(attr.oversoldLevel * yy + dy) - pixelAdjust;
        var midLevel = Math.round( 50 * yy + dy) - pixelAdjust;

        if (list.length) {
            var xLen = rect[2];  

            //Draw overbought, oversold and, 50  mark lines
            me.drawYLine(ctx, xLen, obLevel);
            me.drawYLine(ctx, xLen, osLevel);
            me.drawYLine(ctx, xLen, midLevel, true);

            //draw stroke
            me.drawStroke(surface, ctx, start, end, list, rect[1] - pixel);
            ctx.stroke();
        }
    }, 

    /**
     * @private
     * Draws a line parallel to X-axis
     * @param ctx SVG or Canvas context
     * @param x length of the line
     * @param y ordinate where the line needs to be drawn
     * @return 
     */
    drawYLine: function(ctx, x, y, dashed) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(x, y);
        ctx.closePath();
	
        var linedash;  
        if (dashed) {
            linedash = ctx.getLineDash();
	   
            ctx.setLineDash([3]);
        }
        ctx.stroke();

        //reset the dash style
        if (dashed) {
            ctx.setLineDash(linedash);
        }
    }
});
