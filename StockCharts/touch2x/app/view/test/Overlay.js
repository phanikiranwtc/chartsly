/**
 * Class to test chart overlays
 */
Ext.define("Chartsly.view.test.Overlay", {
    extend: 'Ext.Panel',
    requires: [
        // 'Chartsly.view.test.CandleStick'
        'Chartsly.view.test.ParabolicSAR'
    ],
    config: {
        items: [
            {
                height: 500,
                // xtype: 'candlestick-test-chart'
                xtype: 'cs-psar-test-chart'
            }
        ]
    }
});