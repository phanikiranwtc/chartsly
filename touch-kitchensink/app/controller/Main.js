Ext.define('KS.controller.Main', {
    extend: 'Ext.app.Controller',

    requires: [
        'KS.view.*'
    ],

    config: {
        refs: {
            navigation: 'navigation',
            contentPanel: 'contentPanel',
            descriptionPanel: 'descriptionPanel',
            codePreview: 'codePreview'
        },
        control: {
            'navigation': {
                leafitemtap: 'onNavSelectionChange'
            },
            'codePreview tool[type=maximize]': {
                click: 'onMaximizeClick'
            },
            'tool[regionTool]': {
                click: 'onSetRegion'
            }
        }
    },
            
    onSetRegion: function (tool) {
        // var panel = tool.toolOwner;

        // var regionMenu = panel.regionMenu || (panel.regionMenu =
        //         Ext.widget({
        //             xtype: 'menu',
        //             items: [{
        //                 text: 'North',
        //                 checked: panel.region === 'north',
        //                 group: 'mainregion',
        //                 handler: function () {
        //                     panel.setBorderRegion('north');
        //                 }
        //             },{
        //                 text: 'South',
        //                 checked: panel.region === 'south',
        //                 group: 'mainregion',
        //                 handler: function () {
        //                     panel.setBorderRegion('south');
        //                 }
        //             },{
        //                 text: 'East',
        //                 checked: panel.region === 'east',
        //                 group: 'mainregion',
        //                 handler: function () {
        //                     panel.setBorderRegion('east');
        //                 }
        //             },{
        //                 text: 'West',
        //                 checked: panel.region === 'west',
        //                 group: 'mainregion',
        //                 handler: function () {
        //                     panel.setBorderRegion('west');
        //                 }
        //             }]
        //         }));

        // regionMenu.showBy(tool.el);
    },

    afterViewportLayout: function() {
        // if (!this.navigationSelected) {
        //     var id = location.hash.substring(1),
        //         navigation = this.getNavigation(),
        //         store = navigation.getStore(),
        //         node;

        //     if (store.isLoading()) {
        //         store.on('load', this.afterViewportLayout, this, {
        //             single: true
        //         });
        //         return;
        //     }

        //     node = id ? store.getNodeById(id) : store.getRoot().firstChild.firstChild;

        //     navigation.getSelectionModel().select(node);
        //     navigation.getView().focusNode(node);
        //     this.navigationSelected = true;
        // }
    },

    onNavSelectionChange: function(list, subList, idx, target, record) {
        var text = record.get('text'),
            xtype = record.get('id'),
            alias = 'widget.' + xtype,
            contentPanel = this.getContentPanel(),
            cmp;

        if (xtype) { // only leaf nodes have ids

            // Bracket removal, adding, title setting, and description update within one layout.
            // Ext.suspendLayouts();

            contentPanel.removeAll(true);

            var className = Ext.ClassManager.getNameByAlias(alias);
            var ViewClass = Ext.ClassManager.get(className);
            var clsProto = ViewClass.prototype;

            cmp = new ViewClass();
            contentPanel.add(cmp);

            // contentPanel.setTitle(record.parentNode.get('text') + ' - ' + text);

            document.title = document.title.split(' - ')[0] + ' - ' + text;
            location.hash = xtype;

            // this.updateDescription(clsProto);

            // if (clsProto.exampleCode) {
            //     this.updateCodePreview(clsProto.exampleCode);
            // } else {
            //     this.updateCodePreviewAsync(clsProto, xtype);
            // }

            // Ext.resumeLayouts(true);
            
            if (cmp.floating) {
                cmp.show();
            }
        }
    }

});
