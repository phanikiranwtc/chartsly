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
        'Chartsly.model.YahooFinance',
        'Chartsly.store.YahooFinances',
        'Chartsly.series.overlay.BollingerBands',
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
                store:'YahooFinances', //'Google',
                type: 'bbands',
                closeField: 'close',
                period: 15,
                bandGap: 5,
                style: {
                    stroke: 'rgb(187, 175, 174)',
                    lineDash: [5, 5]
                },
                xField: 'date',
                yField: 'bband'
            }, {
                store: 'YahooFinances', //'Google',
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
                store: 'YahooFinances', //'Google',
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
                fields: ['open', 'high', 'low', 'close', 'bband', 'upperbband', 'lowerbband'],
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
                dateFormat:"Y-m-d",
                /*renderer: function (value, layoutContext, lastValue) {
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
                }*/
            }
        ]
    }
});
