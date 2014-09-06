/**
 * The Fibonacci Retracements interaction allows the user draw lines on a chart.
 * The values are obtained by single-touch dragging on the chart.
 *
 * TODO: parameterize the lines style - color, width
 */

Ext.define('Chartsly.interactions.FibonacciRetracements', {

    extend: 'Ext.chart.interactions.Abstract',
    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.axis.layout.Discrete'
    ],

    type: 'fibonacci',
    alias: 'interaction.fibonacci',

    config: {
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
        gestures[me.getGesture() + 'start'] = 'onGestureStart';
        gestures[me.getGesture() + 'end'] = 'onGestureEnd';
        return gestures;
    },

    /**
     * Based on the mouse over position on the chart preparing the Y-axes numeric value
     */
    getNumericAxesValue : function (y) {
        
        var me = this;

        var chart = me.getChart();
        var padding = chart.getInnerPadding();
        var px = padding.left;
        var py = padding.top;

        // var y = chart.getEventXY(e)[1];

        var axis = chart.getAxes()[0];
        var axisPosition = axis.getPosition();
        var axisAlignment = axis.getAlignment();
        var axisSurface = axis.getSurface();
        var axisSprite = axis.getSprites()[0];
        var axisMatrix = axisSprite.attr.matrix;
        var textPadding = axisSprite.attr.textPadding * 2;
        var axisLayoutContext = axisSprite.getLayoutContext();
        var axisSegmenter = axis.getSegmenter();

        var yy = axisMatrix.getYY();
        var dy = axisMatrix.getDY();
        var yValue = (y - dy - py) / yy;
        if (axis.getLayout() instanceof Ext.chart.axis.layout.Discrete) {
            y = Math.round(yValue) * yy + dy + py;
            yValue = axisSegmenter.from(Math.round(yValue));
            yValue = axisSprite.attr.data[yValue];
        } else {
            yValue = axisSegmenter.from(yValue);
        }
        text = axisSegmenter.renderer(yValue, axisLayoutContext);

        return text * 1;    //multiplied it by 1 to convert it into a number
    },
    
    /**
     * @private
     * This method updates the numeric value based on the golden ratios 
     * and mouse over point's record
     */
    drawRetracementRatio : function (text, x, y, color) {

        var ratio = {
            type: "text",
            text: text,
            fill: color,
            animate:true,
            font: "12px monospace",
            x:x,
            y:y - 10
        };
        return ratio;
    },

    /**
     * @private
     * This method draws the Febonacci retracements grid based on the 
     * given parameters path
     */
    drawRetracementLine : function (chart, startX, startY, color) {
        
        var line = Ext.create('Ext.draw.sprite.Path', {
              type: 'path',
              animate:true,
              path : "M "+startX+" "+startY,
              stroke: color,
              "stroke-width": 1,
              opacity: 0.5
        });
    
        return line;
    },
    
    /**
     * @private
     */
    addStartingSprites: function(x, y) {
        var me = this;
            chart = me.getChart(),
            surface = chart.getSurface('main');

        var endX = x, 
            endY = y,
            startX = me.startX, 
            startY = me.startY,
        
            ls1 = [startX,startY],

            ls2 = [startX,(1-0.236) * 1 + startY],
        
            ls3 = [startX,(1-0.382) * 1 + startY],
        
            ls4 = [startX,(1-0.5) * 1 + startY],
        
            ls5 = [startX,(1-0.618) * 1 + startY],
        
            ls6 = [startX,(1-0.786) * 1 + startY],

            ls7 = [startX,startY];
                
        var startValueAtRatio = me.startValueAtRatio;
        var endValueAtRatio = me.getNumericAxesValue(y);
        
        var mianDiff = startValueAtRatio - endValueAtRatio;
        
        me.line1 = me.drawRetracementLine (me, ls1[0], ls1[1], "#488CC9");
        surface.add(me.line1);

        me.line2 = me.drawRetracementLine (me, ls2[0], ls2[1], "#498826");
        surface.add(me.line2);
                
        me.line3 = me.drawRetracementLine (me, ls3[0], ls3[1], "#00BEFF");
        surface.add(me.line3);
                
        me.line4 = me.drawRetracementLine (me, ls4[0], ls4[1], "#7642A7");
        surface.add(me.line4);
                    
        me.line5 = me.drawRetracementLine (me, ls5[0], ls5[1], "#2EA7B3");
        surface.add(me.line5);
                    
        me.line6 = me.drawRetracementLine (me, ls6[0], ls6[1], "#FF9900");
        surface.add(me.line6);
            
        me.line7 = me.drawRetracementLine (me, ls7[0], ls7[1], "#488CC9");
        surface.add(me.line7);
    },

    /**
     * @private
     * This method draws the Febonacci Retracement grid on the chart surface
     * for the golden ratios 0%, 23.6%, 38.2, 50%, 61.8%, 78.6%, 100
     */
    drawRetracementsGrid : function (x, y) {
        var me = this;
            chart = me.getChart(),
            surface = chart.getSurface('main');

        var endX = x, 
            endY = y,
            startX = me.startX, 
            startY = me.startY,
        
            ls1 = [startX,startY],
            le1 = [endX,startY],

            ls2 = [startX,((1-0.236)*(endY-startY))+startY],
            le2 = [endX,((1-0.236)*(endY-startY))+startY],
        
            ls3 = [startX,((1-0.382)*(endY-startY))+startY],
            le3 = [endX,((1-0.382)*(endY-startY))+startY],
        
            ls4 = [startX,((1-0.5)*(endY-startY))+startY],
            le4 = [endX,((1-0.5)*(endY-startY))+startY],
        
            ls5 = [startX,((1-0.618)*(endY-startY))+startY],
            le5 = [endX,((1-0.618)*(endY-startY))+startY],
        
            ls6 = [startX,((1-0.786)*(endY-startY))+startY],
            le6 = [endX,((1-0.786)*(endY-startY))+startY],

            ls7 = [startX,endY],
            le7 = [endX,endY];
        
        
        var startValueAtRatio = me.startValueAtRatio;
        var endValueAtRatio = me.getNumericAxesValue(y);

        var mianDiff = startValueAtRatio - endValueAtRatio;

        me.line1.setAttributes({path : "M "+ls1[0]+" "+ls1[1]+" L "+le1[0]+" "+le1[1]});

        //text type sprite does not update the text is it is done using setAttributes call. So. we
        //have to remove the old sprite and add a new one with the new text
        surface.remove(me.retracementRatio1);
        var ratioCfg = me.drawRetracementRatio("100% ("+Ext.Number.toFixed(startValueAtRatio, 2)+")", ls1[0], ls1[1], "#488CC9");
        me.retracementRatio1 = surface.add(ratioCfg);
        
        var secondValue = (mianDiff)*0.236 + endValueAtRatio;
        
        me.line2.setAttributes({path : "M "+ls2[0]+" "+ls2[1]+" L "+le2[0]+" "+le2[1]});
        surface.remove(me.retracementRatio2);
        ratioCfg = me.drawRetracementRatio("38.2% ("+Ext.Number.toFixed(secondValue, 2)+")", ls2[0], ls2[1], "#498826");
        me.retracementRatio2 = surface.add(ratioCfg);

        var thirdValue = (mianDiff)*(0.382 - 0.236) + secondValue;
        
        me.line3.setAttributes({path : "M "+ls3[0]+" "+ls3[1]+" L "+le3[0]+" "+le3[1]});
        surface.remove(me.retracementRatio3);
        ratioCfg = me.drawRetracementRatio("38.2% ("+Ext.Number.toFixed(thirdValue, 2)+")", ls3[0], ls3[1], "#00BEFF");
        me.retracementRatio3 = surface.add(ratioCfg);
            
        var fourthValue = (mianDiff)*(0.5 - 0.382) + thirdValue;
        
        me.line4.setAttributes({path : "M "+ls4[0]+" "+ls4[1]+" L "+le4[0]+" "+le4[1]});
        surface.remove(me.retracementRatio4);
        ratioCfg = me.drawRetracementRatio("50% ("+Ext.Number.toFixed(fourthValue, 2)+")", ls4[0], ls4[1], "#7642A7");
        me.retracementRatio4 = surface.add(ratioCfg);
                
        var fifthValue = (mianDiff)*(0.618 - 0.5) + fourthValue;
        
        me.line5.setAttributes({path : "M "+ls5[0]+" "+ls5[1]+" L "+le5[0]+" "+le5[1]});
        surface.remove(me.retracementRatio5);
        ratioCfg = me.drawRetracementRatio("61.8% ("+Ext.Number.toFixed(fifthValue, 2)+")", ls5[0], ls5[1], "#2EA7B3");
        me.retracementRatio5 = surface.add(ratioCfg);
                
        var sixthValue = (mianDiff)*(0.786 - 0.618) + fifthValue;
        
        me.line6.setAttributes({path : "M "+ls6[0]+" "+ls6[1]+" L "+le6[0]+" "+le6[1]});
        surface.remove(me.retracementRatio6);
        ratioCfg = me.drawRetracementRatio("78.6% ("+Ext.Number.toFixed(sixthValue, 2)+")", ls6[0], ls6[1], "#FF9900");
        me.retracementRatio6 = surface.add(ratioCfg);
        
        me.line7.setAttributes({path : "M "+ls7[0]+" "+ls7[1]+" L "+le7[0]+" "+le7[1]});
        surface.remove(me.retracementRatio7);
        ratioCfg = me.drawRetracementRatio("0% ("+Ext.Number.toFixed(endValueAtRatio, 2)+")", ls7[0], ls7[1], "#488CC9");
        me.retracementRatio7 = surface.add(ratioCfg);
    },

    /**
     * @private
     */
    onGestureStart: function (e) {
        var me = this;

        var chart = me.getChart(),
            surface = chart.getSurface('main'),
            rect = chart.getInnerRegion(),
            chartWidth = rect[2],
            chartHeight = rect[3],
            xy = chart.getEventXY(e),
            x = xy[0],
            y = xy[1];

        if (x > 0 && x < chartWidth && y > 0 && y < chartHeight) {
            me.lockEvents(me.getGesture());

            me.startX = x;
            me.startY = y;

            me.startValueAtRatio = me.getNumericAxesValue(y);

            //clear all the existing sprites and draw the fresh Fibonacci
            surface.removeAll();

            //add initial sprites to draw the lines
            me.addStartingSprites(x, y, e);

            return false;
        }

    },

    /**
     * @private
     */
    onGesture: function (e) {
        var me = this;
        if (me.getLocks()[me.getGesture()] !== me) {
            return;
        }

        var chart = me.getChart(),
            surface = chart.getSurface('main'),
            rect = Ext.Array.slice(chart.getInnerRegion()),
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

        me.drawRetracementsGrid(x, y);
        chart.getSurface('main').renderFrame();
        return false;
    },

    /**
     * @private
     */
    onGestureEnd: function (e) {
        var me = this,
            chart = me.getChart(),
            surface =  chart.getSurface('main');

        surface.renderFrame();
        me.unlockEvents(me.getGesture());
    }

});