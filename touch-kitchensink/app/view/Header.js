Ext.define('KS.view.Header', {
    extend: 'Ext.TitleBar',
    xtype: 'appHeader',
    id: 'app-header',
    config: {
        title: 'Chartsly Kitchen Sink',
        // height: 52,

        items: [{
                xtype : 'button',
                id: 'viewSourceButton',
                hidden: true, 
                align : 'right',
                ui    : 'action',
                action: 'viewSource',
                text  : 'Source'
        }]
    }
});
