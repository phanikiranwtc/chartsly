/**
 * @class Chartsly.sprite.indicator.MovingAverageConvergenceDivergence
 * @extends Ext.chart.series.sprite.Line
 *
 * MACD series sprite. This draws the dashed line at zero level
 */
Ext.define('Chartsly.sprite.indicator.MovingAverageConvergenceDivergence', {
    alias: 'sprite.macd',
    extend: 'Ext.chart.series.sprite.Line',

    /**
    * @private Override {@link Ext.chart.series.sprite.Line#renderAggregates}
    */
    renderAggregates: function (aggregates, start, end, surface, ctx, clip, rect) {
        this.callParent(arguments);

        var me = this,
            attr = me.attr,
            matrix = attr.matrix,
            yy = matrix.getYY(),
            dy = matrix.getDY();

        var pixelAdjust = attr.lineWidth * surface.devicePixelRatio / 2;

        pixelAdjust -= Math.floor(pixelAdjust);

        var zeroLevel = Math.round(0 * yy + dy) - pixelAdjust;
        me.drawYLine(ctx, rect[2], zeroLevel, true);
    },

    /**
     * @private
     * Draws a line parallel to X-axis
     * @param ctx SVG or Canvas context
     * @param x length of the line
     * @param y ordinate where the line needs to be drawn
     * @return 
     *
     * TODO: This is used in William %R as well. Move it to a utility class, probably!
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