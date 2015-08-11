/**
 * Class to test MoneyFlowIndex chart
 */
Ext.define("Chartsly.view.test.MoneyFlowIndex", {
    extend: 'Ext.Panel',
    requires: [
        'Chartsly.view.test.CandleStick',
        'Ext.chart.axis.Time',
        'Ext.chart.axis.Numeric',
        'Ext.chart.series.Line',
        'Chartsly.chart.indicator.MoneyFlowIndex',
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
                xclass: 'Chartsly.chart.indicator.MoneyFlowIndex',
                height: 250,
                insetPadding: {
                    top: 10,
                    right: 0,
                    left: 0,
                    bottom: 0
                },
                background: 'white',
                series: [
                    {
                        store: Ext.create('Chartsly.store.Apple', {}), //'Apple',
                        type: 'moneyflowindex',
                        xField: 'date',
                        yField: 'mfi',
                        highField: "high",
                        lowField: "low",
                        closeField: "close",
			volumeField: "volume",
                        overboughtLevel: 80,
                        oversoldLevel: 20,
                        lookBackPeriod: 14,  //in days
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
