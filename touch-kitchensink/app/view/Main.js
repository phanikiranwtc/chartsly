Ext.define('KS.view.Main', {
    extend: 'Ext.Panel',
    xtype: 'main',
    requires: [
        'KS.view.Navigation',
        'KS.view.ContentPanel'
    ],
    config: {
        items: [{
            xtype: 'navigation',
            title: 'Chartsly Examples',
            docked: 'left',
            width: 300            
        }, {
            xtype: 'titlebar',
            docked: 'top',
            title: 'Chartsly Kitchen Sink',
            items: [{
                xtype: 'button',
                text: 'Source',
                align: 'right'
            }]
        }, {
            xtype: 'contentPanel',
            title: 'Content Area'
        }]
    }
});
