/**
 * @class Chartsly.sprite.indicator.ParabolicSAR
 * @extends Ext.chart.series.sprite.Line
 *
 * ParabolicSAR series sprite. This does the following:
 * 1) Draws and SAR upward trend with markers
 * 2) Draws and SAR downward trend with markers
 *
 * TODO: This is currently not being used. However, it needs to be expanded to
 * draw different colored lines for uptrend and downtrend.
 */
Ext.define('Chartsly.sprite.overlay.ParabolicSAR', {
    alias: 'sprite.parabolicsar',
    extend: 'Ext.chart.series.sprite.Line',

    list: null,

    /**
     * @private
     * Draws SAR upward trend
     * @param ctx SVG or Canvas context
     * @param list list containing the transformed co-ordinates
     * @return
     */
    drawSARUptrend: function (ctx, list) {

    },

    /**
     * @private
     * Draws SAR downward trend
     * @param ctx SVG or Canvas context
     * @param list list containing the transformed co-ordinates
     * @return
     */
    drawSARDowntrend: function (ctx, list) {

    },

    /**
     * @private Override {@link Ext.chart.series.sprite.Line#renderAggregates}
     */
    renderAggregates: function (aggregates, start, end, surface, ctx, clip, rect) {
        var me = this,
            attr = me.attr,
            dataX = attr.dataX,
            dataY = attr.dataY,
            labels = attr.labels,
            drawLabels = labels && me.getBoundMarker('labels'),
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

        var pixelAdjust = attr.lineWidth * surface.devicePixelRatio / 2;

        pixelAdjust -= Math.floor(pixelAdjust);

        if (list.length) {
            //Draw SAR uptrend and downtrend 
            me.drawSARUptrend(ctx, list);
            me.drawSARDowntrend(ctx, list);
        }
    }
});