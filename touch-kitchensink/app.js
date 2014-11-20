/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

Ext.Loader.setPath({
    'Setu': '../lib/setu',
    'Chartsly': '../StockCharts/touch2x/app',
    'KS': 'app'
});

Ext.application({
    name: 'KS',

    requires: [
        'Ext.MessageBox',
        
        //TODO: KS.view.* must have worked but it is not working
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

        'KS.view.stockcharts.events.bonus.Basic',
        'KS.view.stockcharts.events.dividend.Basic',
        'KS.view.stockcharts.events.rights.Basic',
        'KS.view.stockcharts.events.split.Basic',
        'KS.view.stockcharts.events.combinations.Basic',

        // 'KS.view.stockcharts.combinations.MultipleIndicators',
        // 'KS.view.stockcharts.combinations.MultipleOverlays',
        // 'KS.view.stockcharts.combinations.IndicatorsWithOverlay',
        // 'KS.view.stockcharts.combinations.OverlaysWithInteractions',
        // 'KS.view.stockcharts.combinations.EventsWithInteractions',
        // 'KS.view.stockcharts.combinations.MixOfAll'
    ],

    views: [
        'Main'
    ],

    stores: [
        'Examples'
    ],

    controllers: [
        'Main'
    ],

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        // Initialize the main view
        Ext.Viewport.add(Ext.create('KS.view.Main'));
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
