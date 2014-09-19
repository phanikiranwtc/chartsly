Ext.define('KS.view.DescriptionPanel', {
    extend: 'Ext.Panel',
    xtype: 'descriptionPanel',
    id: 'description-panel',
    autoHeight: true,
    autoScroll: true,
    rtl: false,
    bodyStyle: 'padding: 12px',

    initComponent: function() {
        this.ui = (Ext.themeName === 'neptune') ? 'light' : 'default';
        this.callParent();
    }
});