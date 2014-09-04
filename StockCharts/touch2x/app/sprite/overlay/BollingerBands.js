/**
 * @class Chartsly.sprite.indicator.BollingerBands
 * @extends Ext.chart.series.sprite.Line
 *
 * ******* NOTICE ********
 * TODO: This is terribly done by adding three series to render the band with upper and lower lines. 
 * TODO: This needs to be changed so that the Bollinger Series and/or sprite takes care of showing three
 * lines. Since, the events are not working on charts & series, we could not implement it the way we 
 * wanted to. Refer to http://www.sencha.com/forum/showthread.php?288676 for more detail on this problem.
 * We will re-visit this as soon as the patch is available from Sencha and design the series, properly. Until
 * then, please bear with the poor performace (due to the design problem)
 */
Ext.define('Chartsly.sprite.overlay.BollingerBands', {
    alias: 'sprite.bbands',
    extend: 'Ext.chart.series.sprite.Line',

    inheritableStatics: {
        def: {
            processors: {
                preciseStroke: 'bool',
                period: 'number',
                bandGap: 'number'
            }
        }
    },

    list: null,

    /**
     * @private
     * Draws overbought area and fills it with the specified style
     * @param ctx SVG or Canvas context
     * @param list list containing the transformed co-ordinates
     * @param osLevel oversold level(e.g. -20) transfromed to the ctx co-ordinates
     * @return
     */
    drawUpperBand: function (ctx, list, upperArr) {
        var tmpList = Ext.Array.clone(list);

        console.log(list.length + ':' + upperArr.length);

        var l = tmpList.length;
        var i = upperArr.length;
        var j = 0;
        for (i; i > 0; i--, j++) {
            console.log((l - 1 - j*2) + ':' + (i - 1));
            tmpList[l - 1 - j*2] = upperArr[i - 1];
        }

    },

    /**
     * @private
     * Draws oversold area and fills it with the specified style
     * @param ctx SVG or Canvas context
     * @param list list containing the transformed co-ordinates
     * @param osLevel oversold level(e.g. -20) transfromed to the ctx co-ordinates
     * @return
     */
    drawLowerBand: function (ctx, list, osLevel) {
        var attr = this.attr,
            i, x, y, x0, y0, osx = 0, osStart = false, osEnd = false, osy = osLevel;

        var lbPeriod = attr.lookBackPeriod - 1;

        x0 = list[0];
        y0 = list[1];

        var tx = x0, ty = y0;

        for (i = 3 * lbPeriod; i < list.length; i += 3) {
            x = list[i];
            y = list[i + 1];

            //detect if the os starts
            if (ty >= y && ty >= osy && y <= osy) {

                //find the x co-ordintate of the point of intersection
                osx = tx + (((x-tx)*(ty-osy))/(ty-y));

                ctx.beginPath();
                ctx.moveTo(osx, osy);

                osStart = true;
                osEnd = false;
            }
            
            //detect if the os ends
            if (ty <= y && ty <= osy && y >= osy) {
                osx = x - (((y-osy)*(x-tx))/(y-ty));
                ctx.lineTo(osx, osy);

                ctx.closePath();
                ctx.fill();
                osStart = false;
                osEnd = true;
            } 

            //keep drawing the line
            if (y <= osy) {
                //if start was not detected - open start
                if (!osStart) {
                    ctx.beginPath();
                    ctx.moveTo(x, osy);
                    ctx.lineTo(x, y); 

                    osStart = true;                   
                }

                ctx.lineTo(x, y);
            }
            
            tx = x, ty = y;
        }

        //if end is not detected
        if (!osEnd) {
            // console.log('closing!!');
            ctx.lineTo(x, osy);
            ctx.closePath();
            ctx.fill();
        }
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

        // var obLevel = Math.round(attr.overboughtLevel * yy + dy) - pixelAdjust;
        // var osLevel = Math.round(attr.oversoldLevel * yy + dy) - pixelAdjust;
        // var midLevel = Math.round(-50 * yy + dy) - pixelAdjust;

        var st = me.getStore();
        var recs = st.getRange();
        var closes = Ext.Array.pluck(Ext.Array.pluck(recs, "data"), "close"); //config.closeField);

        var stdev, middle, upperArr = [], lowerArr = [], tmpArr;

        var p = attr.period;
        var bandGap = attr.bandGap;

        Ext.Array.each(recs, function (item, index) {
            if (index < p) {
                return;
            }

            tmpArr = Ext.Array.slice(closes, index - p, index);
            middle = Ext.Array.mean(tmpArr);

            stdev = me.standardDeviation(tmpArr, middle);

            upperArr.push(Math.round((middle + stdev * bandGap) * yy + dy) - pixelAdjust);
            lowerArr.push(Math.round((middle - stdev * bandGap) * yy + dy) - pixelAdjust);
        });

        if (list.length) {
            var xLen = rect[2];

            //Draw oversold areas
            // me.drawUpperBand(ctx, list, upperArr);

            //Draw overbaught areas
            // me.drawLowerBand(ctx, list, obLevel);

            //draw stroke
            me.drawStroke(surface, ctx, start, end, list, rect[1] - pixel);
            ctx.stroke();
        }
    },

    standardDeviation: function(valArr, mean) {
        //if mean is undefined, calculate mean and use it in the calculation
        if (!mean) {
            mean = Ext.Array.mean(Ext.Array.slice(valArr));
        }

        var sqDiff = 0;
        Ext.Array.each(valArr, function(value, index) {
            sqDiff += Math.pow(value - mean, 2);
        });

        var stdev = Math.sqrt(sqDiff/valArr.length);

        return stdev;
    },
});