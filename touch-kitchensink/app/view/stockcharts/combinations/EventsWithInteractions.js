/**
 * Class to test chart events and interactions
 */
Ext.define("KS.view.stockcharts.combinations.EventsWithInteractions", {
    extend: 'Ext.Panel',
    xtype: 'basic-combo-event-interaction',
    requires: [
        'Ext.chart.Chart',
        'Ext.chart.series.CandleStick',
        'Ext.chart.interactions.PanZoom',
        'Ext.chart.axis.Time',
        'Ext.chart.axis.Numeric',
        'Ext.chart.series.Line',
        'Chartsly.model.Stock', 
        'Chartsly.model.Dividend', 
        'Chartsly.store.Apple',
        'Chartsly.store.AppleDividend',
        'Chartsly.series.Event'
    ],
    exampleDescription: [
        'A combination to a CandleStick chart, with Events, and an interaction - Annotation'
    ],
    config: {
        items: [
            {
                height: 400,
                xtype: 'chart',
                background: 'white',
                insetPadding: {
                    top: 10,
                    right: 0,
                    left: 0,
                    bottom: 0
                },
                interactions: [{
                    type: 'annotation'
                }],//added listeners
                listeners: {
                    annotationupdated: function(chart, annotText, sprite) {
                       alert('Annotation Updated: ' + annotText);
                    },
                    annotationmoved: function(chart, sprite) {
                        alert('Annotation moved to: ' + sprite.attr.x + ':' + sprite.attr.y);
                    }
                },
                series: [{
                        store: Ext.create('Chartsly.store.AppleDividend', {}), 
                        type: 'event',
                        eventType: 'dividend',
                        xField: 'date',
                        yField: 'dividend'
                    }, {
                        store: Ext.create('Chartsly.store.AppleDividend', {}), 
                        type: 'event',
                        eventType: 'split',
                        xField: 'date',
                        yField: 'dividend'
                    }, {
                        store: Ext.create('Chartsly.store.AppleBonus', {}), 
                        type: 'event',
                        eventType: 'bonus',
                        // image: 'resources/images/Dividend.png',
                        xField: 'date',
                        yField: 'bonus'
                    }, 
                    {
                        store: Ext.create('Chartsly.store.Apple', {}),
                        type: 'candlestick',
                        xField: 'date',
                        openField: 'open',
                        highField: 'high',
                        lowField: 'low',
                        closeField: 'close',
                        style: {
                            barWidth: 10,
                            opacity: 0.9,
                            dropStyle: {
                                fill: 'rgb(228,124,124)',
                                stroke: 'rgb(228,124,124)'
                            },
                            raiseStyle: {
                                fill: 'rgb(67,175,174)',
                                stroke: 'rgb(67,175,174)'
                            }
                        },
                        aggregator: {
                            stretagy: 'time'
                        }
                    }
                ],
                axes: [
                    {
                        type: 'numeric',
                        fields: ['open', 'high', 'low', 'close', 'sar'],
                        position: 'left',
                        style: {
                            floating: true,
                            // axisLine: false,
                            strokeStyle: '#666',
                            estStepSize: 40
                        },
                        label: {
                            fillStyle: '#666',
                            fontWeight: '700'
                        },
                        // maximum: 750,
                        // minimum: 0,
                        background: {
                            fill: {
                                type: 'linear',
                                degrees: 180,
                                stops: [
                                    {
                                        offset: 0.3,
                                        color: 'white'
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgba(255,255,255,0)'
                                    }
                                ]
                            }
                        }
                    },
                    {
                        type: 'time',
                        fields: ['date'],
                        position: 'bottom',
                        background: {
                            fill: 'gray'
                        },
                        visibleRange: [0.5, 0.9],
                        style: {
                            // axisLine: false,
                            strokeStyle: '#888',
                            estStepSize: 50,
                            textPadding: 10
                        },
                        label: {
                            fontWeight: '700',
                            fillStyle: '#666'
                        },
                        renderer: function (value, layoutContext, lastValue) {
                            var month, day;
                            switch (layoutContext.majorTicks.unit) {
                                case Ext.Date.YEAR:
                                    return Ext.Date.format(value, 'Y');
                                case Ext.Date.MONTH:
                                    month = Ext.Date.format(value, 'M');
                                    if (month === 'Jan') {
                                        return Ext.Date.format(value, 'Y');
                                    } else {
                                        return month;
                                    }
                                    break;
                                case Ext.Date.DAY:
                                    day = Ext.Date.format(value, 'j');
                                    if (lastValue && value.getMonth() !== lastValue.getMonth()) {
                                        month = Ext.Date.format(value, 'M');
                                        if (month === 'Jan') {
                                            return Ext.Date.format(value, 'M j y');
                                        } else {
                                            return Ext.Date.format(value, 'M j');
                                        }
                                    } else {
                                        return day;
                                    }
                                    break;
                                default:
                                    return Ext.Date.format(value, 'h:i:s');
                            }
                        }
                    }
                ]
            }
        ]
    }
});