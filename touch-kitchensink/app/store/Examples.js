Ext.define('KS.store.Examples', {
    extend: 'Ext.data.TreeStore',

    requires: [
        'KS.model.ListItem',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    config: {
        model: 'KS.model.ListItem',
        autoLoad: true,
        storeId: 'Examples',
        proxy: {
            type: 'ajax',
            url: 'resources/data/navigation.json',
            reader: {
                type: 'json'
            }
        }
    }
});