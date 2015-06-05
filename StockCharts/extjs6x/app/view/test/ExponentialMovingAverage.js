/**
 * Class to test EMA
 */
Ext.define("Chartsly.view.test.ExponentialMovingAverage", {
    extend: 'Ext.chart.CartesianChart',
    xtype: 'cs-ema-test-chart',
    requires: [
        'Ext.chart.Chart',
        'Ext.chart.series.CandleStick',
        'Ext.chart.interactions.PanZoom',
        'Ext.chart.axis.Time',
        'Ext.chart.axis.Numeric',
        'Ext.chart.series.Line',
        'Chartsly.model.YahooFinance',
        'Chartsly.store.YahooFinances',
        'Chartsly.series.overlay.ExponentialMovingAverage',
        'Setu.Util'
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
                store: 'YahooFinances', //'Google',
                type: 'ema',
                closeField: 'close',
                period: 5,
                style: {
                    stroke: 'rgb(228, 124, 124)'
                },
                xField: 'date',
                yField: 'ema'
            }, {
                store: 'YahooFinances', //'Google',
                type: 'ema',
                closeField: 'close',
                period: 10,
                style: {
                    stroke: 'rgb(67, 175, 174)'
                },
                xField: 'date',
                yField: 'ema'
            },{
                store: 'YahooFinances', //'Google',
                type: 'ema',
                closeField: 'close',
                period: 15,
                style: {
                    stroke: 'rgb(250, 173, 38)'
                },
                xField: 'date',
                yField: 'ema'
            },{
                store: 'YahooFinances', //'Google',
                type: 'ema',
                closeField: 'close',
                period: 25,
                style: {
                    stroke: 'rgb(167, 206, 64)'
                },
                xField: 'date',
                yField: 'ema'
            },
            {
                store: 'YahooFinances',//'Google',
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
                },
                marker: {
                    opacity: 1,
                    scaling: 0.01,
                    fillStyle : '#E3742D',
                    fx: {
                        duration: 20,
                        easing: 'easeOut'
                    }
                },
                highlightCfg: {
                    opacity: 1,
                    scaling: 1.5
                },
                tooltip: {
                    trackMouse: true,
                    style:{
                        backgroundColor:'#fff',
                        border:'2px solid #E3742D',
                        fontFamily:'Helvetica',
                    },
                    renderer: function(tooltip,record, item) {
                        var open = Util.formatNumber(record.get('open'),"0.0000");
                        var close = Util.formatNumber(record.get('close'),"0.0000");
                        var high = Util.formatNumber(record.get('high'),"0.0000");
                        var low = Util.formatNumber(record.get('low'),"0.0000");
                        var volume = record.get('volume');
                        tooltip.setHtml('<table>'+'<tr>'+'<td>'+'Open:'+'</td>'+'<td>'+'$'+open+'</td>'+'</tr>'+'<tr>'+'<td>'+'Close:'+'</td>'+'<td>'+'$'+close+'</td>'+'</tr>'+'<tr>'+'<td>'+'High:'+'</td>'+'<td>'+'$'+high+'</td>'+'</tr>'+'<tr>'+'<td>'+'Low:'+'</td>'+'<td>'+'$'+low+'</td>'+'</tr>'+'<tr>'+'<td>'+'Volume:'+'</td>'+'<td>'+'$'+volume+'</td>'+'</tr>'+'</table>');
                    }
                }
            }
        ],
        axes: [
            {
                type: 'numeric',
                fields: ['open', 'high', 'low', 'close', 'ema'],
                position: 'left',
                style: {
                    floating: true,
                    // axisLine: false,
                    strokeStyle: '#666',
                    estStepSize: 40
                },
                label: {
                   fontWeight: '300',
                   fontSize: '13px',
                   fontFamily:'helvetica,arial,verdana,sans-serif'
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
                //visibleRange: [0.5, 0.9],
                style: {
                    // axisLine: false,
                    strokeStyle: '#888',
                    estStepSize: 50,
                    textPadding: 10
                },
                label: {
                   fontWeight: '300',
                   fontSize: '13px',
                   fontFamily:'helvetica,arial,verdana,sans-serif',
                   rotate: {
                      degrees: 290
                   }
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
