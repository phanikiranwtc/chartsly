Ext.define('KS.view.Header', {
    extend: 'Ext.Container',
    xtype: 'appHeader',
    id: 'app-header',
    height: 52,
    layout: {
        type: 'hbox',
        align: 'middle'
    },

    items: [{
        xtype: 'component',
        id: 'app-header-title',
        html: 'Chartsly Kitchen Sink',
        flex: 1
    }]
});
