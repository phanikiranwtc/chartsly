/**
 * Class to test Relative Strength Index chart
 */
Ext.define("Chartsly.view.test.RsiChart", {
    extend: 'Ext.Panel',
    requires: [
        'Ext.chart.axis.Time',
        'Ext.chart.axis.Numeric',
        'Ext.chart.series.Line',
        'Chartsly.chart.indicator.RsiChart',
        'Chartsly.model.Stock', 
        'Chartsly.store.RSI'
    ],
    config: {
        items: [
            {
                xclass: 'Chartsly.chart.indicator.RsiChart',
                height: 250,
                insetPadding: {
                    top: 10,
                    right: 10,
                    left: 10,
                    bottom: 0
                },
                background: 'white',
                series: [
                    {
                        store: Ext.create('Chartsly.store.RSI', {}), //'Apple',
                        type: 'rsichart',
                        xField: 'date',
                        yField: 'rsi',
                        highField: "high",
                        lowField: "low",
                        overboughtLevel: 80,
                        oversoldLevel: 30,
                        lookBackPeriod: 14,  //in days
                        style: {
                            stroke: '#85bedb',
                            fill: '#85bedb',
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
