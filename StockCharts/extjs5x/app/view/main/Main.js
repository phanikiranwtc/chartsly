/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Chartsly.view.main.Main', {
    extend: 'Ext.container.Container',

    requires: [
    // 'Chartsly.view.test.WilliamPctR'
    // 'Chartsly.view.test.AccumulationDistributionLine'
    // 'Chartsly.view.test.AverageTrueRange'
    // 'Chartsly.view.test.CommodityChannelIndex'
    // 'Chartsly.view.test.OnBalanceVolume'
    // 'Chartsly.view.test.RateOfChange'
    // 'Chartsly.view.test.PriceMomentumOscillator'
    // 'Chartsly.view.test.TRIX'
    // 'Chartsly.view.test.MovingAverageConvergenceDivergence'
    // 'Chartsly.view.test.RelativeVigorIndex'
    //'Chartsly.view.test.Overlay'
	 'Chartsly.view.test.ChaikinMoneyFlow'
    ],

    xtype: 'app-main',
    
    controller: 'main',
    viewModel: {
        type: 'main'
    },

    layout: {
        type: 'fit'
    },

    items: [{
        // xclass: 'Chartsly.view.test.WilliamPctR'
        // xclass: 'Chartsly.view.test.AccumulationDistributionLine'
        // xclass: 'Chartsly.view.test.AverageTrueRange'
        // xclass: 'Chartsly.view.test.CommodityChannelIndex'
        // xclass: 'Chartsly.view.test.OnBalanceVolume'
        // xclass: 'Chartsly.view.test.RateOfChange'
        // xclass: 'Chartsly.view.test.PriceMomentumOscillator'
        // xclass: 'Chartsly.view.test.TRIX'
        // xclass: 'Chartsly.view.test.MovingAverageConvergenceDivergence'
        // xclass: 'Chartsly.view.test.RelativeVigorIndex'
        //xclass: 'Chartsly.view.test.Overlay'
		    xclass: 'Chartsly.view.test.ChaikinMoneyFlow'
    }]
});
