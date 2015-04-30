/*
 * This file is generated and updated by Sencha Cmd. You can edit this file as
 * needed for your application, but these edits will have to be merged by
 * Sencha Cmd when upgrading.
 */

var loader=function(){
	setTimeout(function(){
		preloader();
	},5000);
}

var preloader=function(){

	Ext.get('pre-loading').hide();
	Ext.create('KS.view.Viewport');
}

Ext.Loader.setPath({
    'Setu': '../lib/setu',
    'Chartsly': '../StockCharts/extjs6x/app'
});

Ext.application({
    name: 'KS',

    //autoCreateViewport: true,
	
    //-------------------------------------------------------------------------
    // Most customizations should be made to KS.Application. If you need to
    // customize this file, doing so below this section reduces the likelihood
    // of merge conflicts when upgrading to new versions of Sencha Cmd.
    //-------------------------------------------------------------------------

    requires: [
        'Ext.grid.Panel',

        //TODO: KS.view.* must have worked but it is not working
        'KS.view.Header',
        'KS.view.CodePreview',
        'KS.view.ContentPanel',
        'KS.view.DescriptionPanel',
        'KS.view.Navigation',
        'KS.view.stockcharts.indicators.accumdist.Basic',
        'KS.view.stockcharts.indicators.adx.Basic',
        'KS.view.stockcharts.indicators.atr.Basic',
        'KS.view.stockcharts.indicators.cmf.Basic',
        'KS.view.stockcharts.indicators.cci.Basic',
        'KS.view.stockcharts.indicators.faststoch.Basic',
        'KS.view.stockcharts.indicators.fullstoch.Basic',
        'KS.view.stockcharts.indicators.macd.Basic',
        'KS.view.stockcharts.indicators.mfi.Basic',
        'KS.view.stockcharts.indicators.obv.Basic',
        'KS.view.stockcharts.indicators.pmo.Basic',
        'KS.view.stockcharts.indicators.roc.Basic',
        'KS.view.stockcharts.indicators.rsi.Basic',
        'KS.view.stockcharts.indicators.rvi.Basic',
        'KS.view.stockcharts.indicators.trix.Basic',
        'KS.view.stockcharts.indicators.william.Basic',

        'KS.view.stockcharts.overlays.bbands.Basic',
        'KS.view.stockcharts.overlays.ema.Basic',
        'KS.view.stockcharts.overlays.envelop.Basic',
        'KS.view.stockcharts.overlays.sma.Basic',
        'KS.view.stockcharts.overlays.psar.Basic',

        'KS.view.stockcharts.interactions.annotation.Basic',
        'KS.view.stockcharts.interactions.fibonacci.Basic',
        'KS.view.stockcharts.interactions.trendline.Basic',
        'KS.view.stockcharts.interactions.crosshair.Basic',

        'KS.view.stockcharts.events.bonus.Basic',
        'KS.view.stockcharts.events.dividend.Basic',
        'KS.view.stockcharts.events.rights.Basic',
        'KS.view.stockcharts.events.split.Basic',
        'KS.view.stockcharts.events.combinations.Basic',

        'KS.view.stockcharts.combinations.MultipleIndicators',
        'KS.view.stockcharts.combinations.MultipleOverlays',
        'KS.view.stockcharts.combinations.IndicatorsWithOverlay',
        'KS.view.stockcharts.combinations.OverlaysWithInteractions',
        'KS.view.stockcharts.combinations.EventsWithInteractions',
        'KS.view.stockcharts.combinations.MixOfAll',

        'Ext.state.CookieProvider',
        'Ext.window.MessageBox',
        'Ext.tip.QuickTipManager',
        'Ext.data.JsonStore'
    ],

    controllers: [
        'Main'
    ],

    init: function() {
        Ext.tip.QuickTipManager.init();
        Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));       
    },
	 
	 launch: function(){
	 	
		 loader();
		 
	 }
});
