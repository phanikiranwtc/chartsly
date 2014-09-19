Ext.define('KS.view.Main', {
    extend: 'Ext.Container',
    xtype: 'mainview',

    requires: [
        'Ext.dataview.NestedList'
    ],

    config: {
        fullscreen: true,

        layout: {
            type: 'card',
            animation: {
                type: 'slide',
                direction: 'left',
                duration: 250
            }
        },

        items: [
            {
                id: 'launchscreen',
                cls : 'card',
                scrollable: true,
                html: '<div><h2>Welcome to Sencha Touch <span class="version">' + Ext.version +'</span></h2></div>'
            },
            {
                id: 'mainNestedList',
                xtype : 'nestedlist',
                useTitleAsBackText: true,
                updateTitleText: false,
                docked: 'left',
                width: 300,
                store: 'Demos',
                title: 'Chartsly Examples'
            },
            {
                id: 'mainNavigationBar',
                xtype: 'appHeader',
                docked: 'top'
            }
        ]
    }
});
