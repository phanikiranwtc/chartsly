Ext.define('Chartsly.view.Main', {
    extend: 'Ext.Panel',
    xtype: 'main',
    requires: [
        // 'Chartsly.view.test.WilliamPctR'
        // 'Chartsly.view.test.AccumulationDistributionLine'
        // 'Chartsly.view.test.AverageTrueRange'
        // 'Chartsly.view.test.CommodityChannelIndex'
        'Chartsly.view.test.OnBalanceVolume'
        // 'Chartsly.view.test.RateOfChange'
        // 'Chartsly.view.test.PriceMomentumOscillator'
        // 'Chartsly.view.test.TRIX'
        // 'Chartsly.view.test.MovingAverageConvergenceDivergence'
        // 'Chartsly.view.test.RelativeVigorIndex'
    ],
    config: {

        items: [{
            // xclass: 'Chartsly.view.test.WilliamPctR'
            // xclass: 'Chartsly.view.test.AccumulationDistributionLine'
            // xclass: 'Chartsly.view.test.AverageTrueRange'
            // xclass: 'Chartsly.view.test.CommodityChannelIndex'
            xclass: 'Chartsly.view.test.OnBalanceVolume'
            // xclass: 'Chartsly.view.test.RateOfChange'
            // xclass: 'Chartsly.view.test.PriceMomentumOscillator'
            // xclass: 'Chartsly.view.test.TRIX'
            // xclass: 'Chartsly.view.test.MovingAverageConvergenceDivergence'
            // xclass: 'Chartsly.view.test.RelativeVigorIndex'
        }]
    }
});
