Ext.define('KS.view.CrossHair', {
extend: 'Ext.chart.interactions.Abstract',
    requires: [
        'Ext.chart.grid.HorizontalGrid',
        'Ext.chart.grid.VerticalGrid',
        'Ext.chart.CartesianChart',
        'Ext.chart.axis.layout.Discrete'
    ],

    type: 'crosshair',
    alias: 'interaction.crosshair',

    config: {
        
        axes: {
            top: {label: {}, rect: {}},
            right: {label: {}, rect: {}},
            bottom: {label: {}, rect: {}},
            left: {label: {}, rect: {}}
        },

        
        lines: {
            horizontal: {
                strokeStyle: 'black',
                lineDash: [5, 5]
            },
            vertical: {
                strokeStyle: 'black',
                lineDash: [5, 5]
            }
        },
        gesture: 'drag'
    },

    applyAxes: function (axesConfig, oldAxesConfig) {
        return Ext.merge(oldAxesConfig || {}, axesConfig);
    },

    applyLines: function (linesConfig, oldLinesConfig) {
        return Ext.merge(oldLinesConfig || {}, linesConfig);
    },

    updateChart: function (chart) {
        if (!(chart instanceof Ext.chart.CartesianChart)) {
            throw 'Crosshair interaction can only be used on cartesian charts.';
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

    onGestureStart: function (e) {
        var me = this,
            chart = me.getChart(),
            surface = chart.getSurface('overlay-surface');
            
         region = chart.getInnerRegion(),
            chartWidth = region[2],
            chartHeight = region[3],
            xy = chart.element.getXY(),
            x = e.pageX - xy[0] - region[0],
            y = e.pageY - xy[1] - region[1],
            axes = chart.getAxes(),
            axesConfig = me.getAxes(),
            linesConfig = me.getLines();
           
          var axis, axisSurface, axisRegion, axisWidth, axisHeight, axisPosition,
            axisLabel, labelPadding,
            axisSprite, attr, axisThickness, lineWidth, halfLineWidth,
            i;
            
        if (x > 0 && x < chartWidth && y > 0 && y < chartHeight) {
            me.lockEvents(me.getGesture());
            me.horizontalLine = surface.add(Ext.apply({
                xclass: 'Ext.chart.grid.HorizontalGrid',
                x: 0,
                y: y,
                width: chartWidth
            }, linesConfig.horizontal));

            me.verticalLine = surface.add(Ext.apply({
                xclass: 'Ext.chart.grid.VerticalGrid',
                x: x,
                y: 0,
                height: chartHeight
            }, linesConfig.vertical));

            me.axesLabels = me.axesLabels || {};
            for (i = 0; i < axes.length; i++) {
                axis = axes[i];
                axisSurface = axis.getSurface();
                axisRegion = axisSurface.getRegion();
                axisSprite = axis.getSprites()[0];
                axisWidth = axisRegion[2];
                axisHeight = axisRegion[3];
                axisPosition = axis.getPosition();
                attr = axisSprite.attr;
                axisThickness = axisSprite.thickness;
                lineWidth = attr.axisLine ? attr.lineWidth : 0;
                halfLineWidth = lineWidth / 2;
                labelPadding = Math.max(attr.majorTickSize, attr.minorTickSize) + lineWidth;
                me.axesLabels[axisPosition] = axisSurface.add({type: 'composite'});
                axisLabel = me.axesLabels[axisPosition];

               axisLabel.add(Ext.apply({
                    type: 'rect',
                    fillStyle: 'white',
                    x: axisPosition === 'right' ? lineWidth : axisSurface.roundPixel(axisWidth - axisThickness - labelPadding) - halfLineWidth,
                    y: axisPosition === 'bottom' ? lineWidth : axisSurface.roundPixel(axisHeight - axisThickness - labelPadding) - lineWidth,
                    width: axisPosition === 'left' ? axisThickness - halfLineWidth + labelPadding : axisThickness + labelPadding,
                    height: axisPosition === 'top' ? axisThickness + labelPadding : axisThickness + labelPadding
                }, axesConfig.rect || axesConfig[axisPosition].rect));
                
                axisLabel.labelText = axisLabel.add(Ext.apply(Ext.Object.chain(axis.config.label), axesConfig.label || axesConfig[axisPosition].label, {
                    type: 'text',
                    x: (function () {
                        switch (axisPosition) {
                            case 'left':
                                return axisWidth - labelPadding - halfLineWidth - axisThickness / 2;
                            case 'right':
                                return axisThickness / 2 + labelPadding - halfLineWidth;
                            default:
                                return 0;
                        }
                    })(),
                    y: (function () {
                        switch (axisPosition) {
                            case 'top':
                                return axisHeight - labelPadding - halfLineWidth - axisThickness / 2;
                            case 'bottom':
                                return axisThickness / 2 + labelPadding;
                            default:
                                return 0;
                        }
                    })()
                }));
                
            }
            return false;
        }

    },

    onGesture: function (e) {
        var me = this;
        if (me.getLocks()[me.getGesture()] !== me) {
            return;
        }
        var chart = me.getChart(),
            surface = chart.getSurface('overlay-surface'),
            region = Ext.Array.slice(chart.getInnerRegion()),
            padding = chart.getInnerPadding(),
            px = padding.left,
            py = padding.top,
            chartWidth = region[2],
            chartHeight = region[3],
            xy = chart.element.getXY(),
            x = e.pageX - xy[0] - region[0],
            y = e.pageY - xy[1] - region[1],
            axes = chart.getAxes(),
            axis, axisPosition, axisAlignment, axisSurface, axisSprite, axisMatrix,
            axisLayoutContext, axisSegmenter,
            axisLabel, labelBBox, textPadding,
            xx, yy, dx, dy,
            xValue, yValue,
            text,
            i;

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

        for (i = 0; i < axes.length; i++) {
            axis = axes[i];
            axisPosition = axis.getPosition();
            axisAlignment = axis.getAlignment();
            axisSurface = axis.getSurface();
            axisSprite = axis.getSprites()[0];
            axisMatrix = axisSprite.attr.matrix;
            textPadding = axisSprite.attr.textPadding * 2;
            axisLabel = me.axesLabels[axisPosition];
          
            axisLayoutContext = axisSprite.getLayoutContext();
            axisSegmenter = axis.getSegmenter();

            if (axisLabel) {
                if (axisAlignment === 'vertical') {
                    yy = axisMatrix.getYY();
                    dy = axisMatrix.getDY();
                    yValue = (y - dy - py) / yy;
                    if (axis.getLayout() instanceof Ext.chart.axis.layout.Discrete) {
                        y = Math.round(yValue) * yy + dy + py;
                        yValue = axisSegmenter.from(Math.round(yValue));
                        yValue = axisSprite.attr.data[yValue];
                    } else {
                        yValue = axisSegmenter.from(yValue);
                    }
                    text = axisSegmenter.renderer(yValue, axisLayoutContext);
               
                    axisLabel.setAttributes({translationY: y - py});
                  
                    //axisLabel.labelText.setAttributes({text: text});
                     axisLabel.sprites[1].attr.text=text;
                    //labelBBox = axisLabel.labelText.getBBox();
                    labelBBox=axisLabel.sprites[1].getBBox();
                    axisLabel.sprites[0].config.height=labelBBox.height + textPadding;
                    axisLabel.sprites[0].config.y= -(labelBBox.height + textPadding) / 2;
                    
                    axisSurface.renderFrame();
                } else {
                    xx = axisMatrix.getXX();
                    dx = axisMatrix.getDX();
                    xValue = (x - dx - px) / xx;
                    if (axis.getLayout() instanceof Ext.chart.axis.layout.Discrete) {
                        x = Math.round(xValue) * xx + dx + px;
                        xValue = axisSegmenter.from(Math.round(xValue));
                        xValue = axisSprite.attr.data[xValue];
                    } else {
                        xValue = axisSegmenter.from(xValue);
                    }
                    text = axisSegmenter.renderer(xValue, axisLayoutContext);

                    axisLabel.setAttributes({translationX: x - px});
                    axisLabel.sprites[1].attr.text=text;
                    labelBBox=axisLabel.sprites[1].getBBox();
                    axisLabel.sprites[0].config.width=labelBBox.width + textPadding+2;
                    axisLabel.sprites[0].config.x= -(labelBBox.width + textPadding) / 2;
                    //labelBBox = axisLabel.labelText.getBBox();
                    //axisLabel.labelText.setAttributes({text: text});
                    // labelBBox = axisLabel.labelText.getBBox();
                    // axisLabel.labelRect.setAttributes({
                    //     width: labelBBox.width + textPadding,
                    //    x: -(labelBBox.width + textPadding) / 2
                    // });
                    axisSurface.renderFrame();
                }
            }
        }
        me.horizontalLine.setAttributes({y: y});
        me.verticalLine.setAttributes({x: x});
        surface.renderFrame();
        return false;
    },

    onGestureEnd: function (e) {
        var me = this,
            chart = me.getChart(),
            surface =  chart.getSurface('overlay-surface'),
            axes = chart.getAxes(),
            axis, axisPosition, axisSurface, axisLabel,
            i;

        surface.remove(me.verticalLine);
        surface.remove(me.horizontalLine);

        for (i = 0; i < axes.length; i++) {
            axis = axes[i];
            axisPosition = axis.getPosition();
            axisSurface = axis.getSurface();
            axisLabel = me.axesLabels[axisPosition];
            if (axisLabel) {
                delete me.axesLabels[axisPosition];
                axisSurface.remove(axisLabel);
            }
            axisSurface.renderFrame();
        }

        surface.renderFrame();
        me.unlockEvents(me.getGesture());
    }

})
