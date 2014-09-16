/**
 * Class to test chart overlays
 */
Ext.define("Chartsly.view.test.Overlay", {
    extend: 'Ext.Panel',
    requires: [
        // 'Chartsly.view.test.CandleStick'
        // 'Chartsly.view.test.ParabolicSAR'
        // 'Chartsly.view.test.SimpleMovingAverage'
        // 'Chartsly.view.test.ExponentialMovingAverage'
        // 'Chartsly.view.test.BollingerBands'
        // 'Chartsly.view.test.MovingAverageEnvelops'
        // 'Chartsly.view.test.Trendline'
        // 'Chartsly.view.test.FibonacciRetracements'
        // 'Chartsly.view.test.Annotation'
        'Chartsly.view.test.Event'
    ],
    config: {
        layout: 'fit',
        items: [
            {
                // xtype: 'candlestick-test-chart'
                // xtype: 'cs-psar-test-chart'
                // xtype: 'cs-sma-test-chart'
                // xtype: 'cs-ema-test-chart'
                // xtype: 'cs-bbands-test-chart'
                // xtype: 'cs-maenv-test-chart'
                // xtype: 'cs-tline-test-chart'
                // xtype: 'cs-fibonacci-test-chart'
                // xtype: 'cs-annot-test-chart'
                xtype: 'cs-event-test-chart'
            }
        ]
    }
});