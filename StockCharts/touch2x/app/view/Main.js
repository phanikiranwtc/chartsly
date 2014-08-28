Ext.define('Chartsly.view.Main', {
    extend: 'Ext.Panel',
    xtype: 'main',
    requires: [
        'Chartsly.view.test.WilliamPctR'
    ],
    config: {

        items: [{
            xclass: 'Chartsly.view.test.WilliamPctR'
        }]
    }
});
