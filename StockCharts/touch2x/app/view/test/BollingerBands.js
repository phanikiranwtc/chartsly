/**
 * Class to test Bollinger Bands
 *
 * ******* NOTICE ********
 * TODO: This is terribly done by adding three series to render the band with upper and lower lines. 
 * TODO: This needs to be changed so that the Bollinger Series and/or sprite takes care of showing three
 * lines. Since, the events are not working on charts & series, we could not implement it the way we 
 * wanted to. Refer to http://www.sencha.com/forum/showthread.php?288676 for more detail on this problem.
 * We will re-visit this as soon as the patch is available from Sencha and design the series, properly. Until
 * then, please bear with the poor performace (due to the design problem)
 * 
 */
Ext.define("Chartsly.view.test.BollingerBands", {
    extend: 'Ext.chart.CartesianChart',
    xtype: 'cs-bbands-test-chart',
    requires: [
        'Ext.chart.Chart',
        'Ext.chart.series.CandleStick',
        'Ext.chart.interactions.PanZoom',
        'Ext.chart.axis.Time',
        'Ext.chart.axis.Numeric',
        'Ext.chart.series.Line',
        'Chartsly.model.Stock', 
        'Chartsly.store.Apple',
        'Chartsly.series.overlay.BollingerBands'
    ],
    config: {
        background: 'white',
        insetPadding: {
            top: 10,
            right: 0,
            left: 0,
            bottom: 0
        },
        series: [{
                store: Ext.create('Chartsly.store.Google', {}), //'Google',
                type: 'bbands',
                closeField: 'close',
                period: 15,
                bandGap: 5,
                style: {
                    stroke: 'rgb(187, 175, 174)'
                },
                xField: 'date',
                yField: 'bband'
            }, {
                store: Ext.create('Chartsly.store.Google', {}), //'Google',
                type: 'bbands',
                closeField: 'close',
                period: 15,
                bandGap: 5,
                style: {
                    stroke: 'rgb(67, 175, 174)'
                },
                xField: 'date',
                yField: 'upperbband'
            }, {
                store: Ext.create('Chartsly.store.Google', {}), //'Google',
                type: 'bbands',
                closeField: 'close',
                period: 15,
                bandGap: 5,
                style: {
                    stroke: 'rgb(67, 175, 174)'
                },
                xField: 'date',
                yField: 'lowerbband'
            },
            {
                store: Ext.create('Chartsly.store.Google', {}),//'Google',
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
                fields: ['open', 'high', 'low', 'close', 'bband', 'upperbband', 'lowerbband'],
                position: 'left',
                style: {
                    floating: true,
                    axisLine: false,
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
                    axisLine: false,
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
});
