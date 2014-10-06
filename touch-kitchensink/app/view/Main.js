Ext.define('KS.view.Main', {
    extend: 'Ext.Panel',
    xtype: 'main',
    requires: [
    ],
    config: {
        items: [{
            xtype: 'nestedlist',
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
        }]
    }
});
