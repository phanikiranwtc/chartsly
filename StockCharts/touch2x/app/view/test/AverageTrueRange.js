/**
 * Class to test ATR chart
 */
Ext.define("Chartsly.view.test.AverageTrueRange", {
    extend: 'Ext.Panel',
    requires: [
        'Chartsly.view.test.CandleStick',
        'Ext.chart.axis.Time',
        'Ext.chart.axis.Numeric',
        'Ext.chart.series.Line',
        'Chartsly.chart.indicator.AverageTrueRange',
        'Chartsly.model.Stock', 
        'Chartsly.store.Apple'
    ],
    config: {
        items: [
            {
                xtype: 'candlestick-test-chart',
                height: 350
            },
            {
                xclass: 'Chartsly.chart.indicator.AverageTrueRange',
                height: 250,
                background: 'white',
                series: [
                    {
                        store: Ext.create('Chartsly.store.Apple', {}), //'Apple',
                        type: 'atr',
                        xField: 'date',
                        yField: 'atr',
                        highField: "high",
                        lowField: "low",
                        closeField: "close",
                        period: 14,
                        style: {
                            stroke: 'rgba(237,123,43,0.75)',
                            fill: 'rgba(237,123,43,0.1)',
                            miterLimit: 1
                        }
                    }
                ],
                axes: [
                    {
                        type: 'numeric',
                        position: 'left',
                        style: {
                            axisLine: false
                        }
                    },
                    {
                        type: 'time',
                        position: 'bottom',
                        fields: ['date'],
                        style: {
                            strokeStyle: '#666',
                            estStepSize: 150
                        },
                        dateFormat: 'Y',
                        segmenter: {
                            type: 'time',
                            step: {
                                unit: 'y',
                                step: 1
                            }
                        },
                        label: {
                            fontSize: 10,
                            fillStyle: '#666'
                        }
                    }
                ]
            }
        ]
    }
});
