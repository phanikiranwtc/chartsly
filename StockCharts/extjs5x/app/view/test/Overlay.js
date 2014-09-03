/**
 * Class to test chart overlays
 */
Ext.define("Chartsly.view.test.Overlay", {
    extend: 'Ext.Panel',
    requires: [
        // 'Chartsly.view.test.CandleStick'
        // 'Chartsly.view.test.ParabolicSAR'
        'Chartsly.view.test.SimpleMovingAverage'
    ],
    config: {
        layout: 'fit',
        items: [
            {
                // xtype: 'candlestick-test-chart'
                // xtype: 'cs-psar-test-chart'
                xtype: 'cs-sma-test-chart'
            }
        ]
    }
});