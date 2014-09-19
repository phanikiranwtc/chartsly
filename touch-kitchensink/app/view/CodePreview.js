Ext.define('KS.view.CodePreview', {
    extend: 'Ext.Panel',
    xtype: 'codePreview',
    title: 'Code Preview',
    autoScroll: true,
    
    initComponent: function() {
        this.ui = (Ext.themeName === 'neptune') ? 'light' : 'default';
        this.callParent();
    }
});