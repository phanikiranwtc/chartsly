/**
 * @class Chartsly.sprite.indicator.PriceMomentumOscillator
 * @extends Ext.chart.series.sprite.Line
 * 
 * TODO: Render the signal line. Implementation of drawStroke/renderAggregates may change
 * TODO: Handle 'smooth' config as it is not drawing smooth lines for PMO and PMO signal
 */
Ext.define('Chartsly.sprite.indicator.PriceMomentumOscillator', {
    alias: 'sprite.pmo',
    extend: 'Ext.chart.series.sprite.Line',

    inheritableStatics: {
        def: {
            processors: {
                preciseStroke: 'bool'
            }
        }
    },

    list: null

    /**
     * @private Override {@link Ext.chart.series.sprite.Line#drawStroke}
     */
    // drawStroke: function (surface, ctx, start, end, list, xAxis) {
    //     var attr = this.attr,
    //         matrix = attr.matrix,
    //         xx = matrix.getXX(),
    //         yy = matrix.getYY(),
    //         dx = matrix.getDX(),
    //         dy = matrix.getDY(),
    //         smooth = attr.smooth,
    //         step = attr.step,
    //         scale = Math.pow(2, power(attr.dataX.length, end)),
    //         smoothX = this.smoothX,
    //         smoothY = this.smoothY,
    //         i, j, lineConfig, changes,
    //         cx1, cy1, cx2, cy2, x, y, x0, y0, saveOpacity;

    //     function power(count, end) {
    //         var power = 0,
    //             n = count;
    //         while (n < end) {
    //             power++;
    //             n += count >> power;
    //         }
    //         return power > 0 ? power - 1 : power;
    //     }

    //     ctx.beginPath();
    //     if (smooth && smoothX && smoothY) {
    //         var i = 0;
    //         while (!smoothY[(start + i) * 3]) {
    //             i++;
    //         }

    //         var s = start + i;
    //         console.log("i ===> " + i);

    //         ctx.moveTo(smoothX[s * 3] * xx + dx, smoothY[s * 3] * yy + dy);
    //         for (i, j = s * 3 + 1; i < list.length - 3; i += 3, j += 3 * scale) {
    //             cx1 = smoothX[j] * xx + dx;
    //             cy1 = smoothY[j] * yy + dy;
    //             cx2 = smoothX[j + 1] * xx + dx;
    //             cy2 = smoothY[j + 1] * yy + dy;
    //             x = list[i + 3];
    //             y = list[i + 4];
    //             x0 = list[i];
    //             y0 = list[i + 1];
    //             if (attr.renderer) {
    //                 lineConfig = {
    //                     type: 'line',
    //                     smooth: true,
    //                     step: step,
    //                     cx1: cx1,
    //                     cy1: cy1,
    //                     cx2: cx2,
    //                     cy2: cy2,
    //                     x: x,
    //                     y: y,
    //                     x0: x0,
    //                     y0: y0
    //                 };
    //                 changes = attr.renderer.call(this, this, lineConfig, {store:this.getStore()}, (s + i/3 + 1));
    //                 ctx.save();
    //                     Ext.apply(ctx, changes);
    //                     // Fill the area if we need to, using the fill color and transparent strokes.
    //                     if (attr.fillArea) {
    //                         saveOpacity = ctx.strokeOpacity;
    //                         ctx.save();
    //                             ctx.strokeOpacity = 0;
    //                             ctx.moveTo(x0, y0);
    //                             ctx.bezierCurveTo(cx1, cy1, cx2, cy2, x, y);
    //                             ctx.lineTo(x, xAxis);
    //                             ctx.lineTo(x0, xAxis);
    //                             ctx.lineTo(x0, y0);
    //                             ctx.closePath();
    //                             ctx.fillStroke(attr, true);
    //                         ctx.restore();
    //                         ctx.strokeOpacity = saveOpacity;
    //                         ctx.beginPath();
    //                     }
    //                     // Draw the line on top of the filled area.
    //                     ctx.moveTo(x0, y0);
    //                     ctx.bezierCurveTo(cx1, cy1, cx2, cy2, x, y);
    //                     ctx.moveTo(x0, y0);
    //                     ctx.closePath();
    //                     ctx.stroke();
    //                 ctx.restore();
    //                 ctx.beginPath();
    //                 ctx.moveTo(x, y);
    //             } else {
    //                 ctx.bezierCurveTo(cx1, cy1, cx2, cy2, x, y);
    //             }
    //         }
    //     } else {
    //         ctx.moveTo(list[0], list[1]);
    //         for (i = 3; i < list.length; i += 3) {
    //             x = list[i];
    //             y = list[i + 1];
    //             x0 = list[i - 3];
    //             y0 = list[i - 2];
    //             if (attr.renderer) {
    //                 lineConfig = {
    //                     type: 'line',
    //                     smooth: false,
    //                     step: step,
    //                     x: x,
    //                     y: y,
    //                     x0: x0,
    //                     y0: y0
    //                 };
    //                 changes = attr.renderer.call(this, this, lineConfig, {store:this.getStore()}, start + i/3);
    //                 ctx.save();
    //                     Ext.apply(ctx, changes);
    //                     // Fill the area if we need to, using the fill color and transparent strokes.
    //                     if (attr.fillArea) {
    //                         saveOpacity = ctx.strokeOpacity;
    //                         ctx.save();
    //                             ctx.strokeOpacity = 0;
    //                             if (step) {
    //                                 ctx.lineTo(x, y0);
    //                             } else {
    //                                 ctx.lineTo(x, y);
    //                             }
    //                             ctx.lineTo(x, xAxis);
    //                             ctx.lineTo(x0, xAxis);
    //                             ctx.lineTo(x0, y0);
    //                             ctx.closePath();
    //                             ctx.fillStroke(attr, true);
    //                         ctx.restore();
    //                         ctx.strokeOpacity = saveOpacity;
    //                         ctx.beginPath();
    //                     }
    //                     // Draw the line (or the 2 lines if 'step') on top of the filled area.
    //                     ctx.moveTo(x0, y0);
    //                     if (step) {
    //                         ctx.lineTo(x, y0);
    //                         ctx.closePath();
    //                         ctx.stroke();
    //                         ctx.beginPath();
    //                         ctx.moveTo(x, y0);
    //                     }
    //                     ctx.lineTo(x, y);
    //                     ctx.closePath();
    //                     ctx.stroke();
    //                 ctx.restore();
    //                 ctx.beginPath();
    //                 ctx.moveTo(x, y);
    //             } else {
    //                 if (step) {
    //                     ctx.lineTo(x, y0);
    //                 }
    //                 ctx.lineTo(x, y);
    //             }
    //         }
    //     }
    // }
});