/**
 * Class to test chart overlays
 */
Ext.define("KS.view.stockcharts.overlays.ema.Basic", {
    extend: 'Ext.Panel',
    xtype: 'basic-ema',
    requires: [
        'Chartsly.view.test.ExponentialMovingAverage'
    ],
    exampleDescription: [
        'A CandleStick chart with Exponential Moving Average (EMA) overlay.'
    ],
    config: {
        // height: 400,
        // layout: 'fit',
        items: [
            {
                height: 500,
                xtype: 'cs-ema-test-chart'
            }
        ]
    }
});