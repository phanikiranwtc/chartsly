Ext.define('KS.view.Navigation', {
    extend: 'Ext.dataview.NestedList',
    xtype: 'navigation',
    requires: [
        'Ext.field.Search',
        'KS.model.ListItem',
        'KS.store.Examples'
    ],

    title: 'Chartsly Examples',

    config: {
        store: 'Examples'
    },

    initialize: function() {
        var me = this;

        // me.columns = [{
        //     xtype: 'treecolumn',
        //     text: 'Name',
        //     flex: 1,
        //     dataIndex: 'text',
        //     scope: me,
        //     renderer: function(value) {
        //         var searchString = this.searchField.getValue();

        //         if (searchString.length > 0) {
        //             return this.strMarkRedPlus(searchString, value);
        //         }

        //         return value;
        //     }
        // }];

        // var store = Ext.create('Ext.data.TreeStore', {
        //     model: 'KS.model.ListItem',
        //     storeId: 'tree-store',
        //     // defaultRootProperty: 'children',
        //     proxy : {
        //         type : 'ajax',
        //         url  : 'resources/data/navigation.json'
        //     },
        //     autoLoad: true,
        //     listeners: {
        //         load: function(store, recs, success) {
        //             alert('Status: ' + success + ':' + recs.length);
        //         }
        //     }
        // });

        // Ext.apply(me, {
        //     store: 'Examples'
        // });

        me.callParent(arguments);
    },

    filterStore: function(value) {
        var me = this,
            store = me.store,
            searchString = value.toLowerCase(),
            filterFn = function(node) {
                var children = node.childNodes,
                    len      = children && children.length,
                    visible  = v.test(node.get('text')),
                    i;

                // If the current node does NOT match the search condition
                // specified by the user...
                if ( !visible ) {

                    // Check to see if any of the child nodes of this node
                    // match the search condition.  If they do then we will
                    // mark the current node as visible as well.
                    for (i = 0; i < len; i++) {
                        if ( children[i].isLeaf() ) {
                            visible = children[i].get('visible');
                        }
                        else {
                            visible = filterFn(children[i]);
                        }
                        if (visible) {
                            break;
                        }
                    }

                }

                else { // Current node matches the search condition...

                    // Force all of its child nodes to be visible as well so
                    // that the user is able to select an example to display.
                    for (i = 0; i < len; i++) {
                        children[i].set('visible', true );
                    }

                }

                return visible;
            }, v;

        if (searchString.length < 1) {
            store.clearFilter();
        } else {
            v = new RegExp(searchString, 'i');
            store.getFilters().replaceAll({
                filterFn: filterFn
            });
        }
    },

    strMarkRedPlus : function (search, subject) {
        return subject.replace(
            new RegExp( '('+search+')', "gi" ),
            "<span style='color: red;'><b>$1</b></span>"
        );
    }
});