/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Chartsly.view.main.Main', {
    extend: 'Ext.container.Container',
    xtype: 'app-main',

    
    controller: 'main',
    viewModel: 'main',
    requires: [
    'Chartsly.view.test.WilliamPctR',
    // 'Chartsly.view.test.AccumulationDistributionLine'
    // 'Chartsly.view.test.AverageTrueRange'
    // 'Chartsly.view.test.CommodityChannelIndex'
    // 'Chartsly.view.test.OnBalanceVolume'
    // 'Chartsly.view.test.RateOfChange'
    // 'Chartsly.view.test.PriceMomentumOscillator'
    // 'Chartsly.view.test.TRIX'
    // 'Chartsly.view.test.MovingAverageConvergenceDivergence'
    // 'Chartsly.view.test.RelativeVigorIndex'
    // 'Chartsly.view.test.Overlay'
    //'Chartsly.view.test.ChaikinMoneyFlow'
    // 'Chartsly.view.test.MoneyFlowIndex'
    // 'Chartsly.view.test.RelativeStrengthIndex'
    // 'Chartsly.view.test.AverageDirectionalIndex'
    // 'Chartsly.view.test.SlowStochasticOscillator'
    // 'Chartsly.view.test.FastStochasticOscillator'
    // 'Chartsly.view.test.BollingerBands'
    // 'Chartsly.view.test.ExponentialMovingAverage'
    //'Chartsly.view.test.Annotation'
     // 'Chartsly.view.test.CrossHairInteactions'
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
         xclass: 'Chartsly.view.test.WilliamPctR'
        // xclass: 'Chartsly.view.test.AccumulationDistributionLine'
        // xclass: 'Chartsly.view.test.AverageTrueRange'
        // xclass: 'Chartsly.view.test.CommodityChannelIndex'
        // xclass: 'Chartsly.view.test.OnBalanceVolume'
        // xclass: 'Chartsly.view.test.RateOfChange'
        // xclass: 'Chartsly.view.test.PriceMomentumOscillator'
        // xclass: 'Chartsly.view.test.TRIX'
        // xclass: 'Chartsly.view.test.MovingAverageConvergenceDivergence'
        // xclass: 'Chartsly.view.test.RelativeVigorIndex'
        // xclass: 'Chartsly.view.test.Overlay'
        // xclass: 'Chartsly.view.test.ChaikinMoneyFlow'
        // xclass: 'Chartsly.view.test.MoneyFlowIndex'
        // xclass:'Chartsly.view.test.RelativeStrengthIndex'
        // xclass:'Chartsly.view.test.AverageDirectionalIndex'
        // xclass:'Chartsly.view.test.SlowStochasticOscillator'
        // xclass:'Chartsly.view.test.FastStochasticOscillator'
        // xclass:'Chartsly.view.test.BollingerBands'
        // xclass:'Chartsly.view.test.ExponentialMovingAverage'
        // xclass:'Chartsly.view.test.Annotation'
        //  xclass:'Chartsly.view.test.CrossHairInteactions'
    }]
});
