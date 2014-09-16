/**
 * The Annotation interaction allows the user to add annotations to a chart.
 * Following are the default gestures used by this interaction:
 * 1) doubletap - to add a new annotation
 * 2) tap - on an existing annotation to start editing
 * 3) drag[start|end] - to move an annotation around
 *
 * TODO: Annotation shall work on polar and spacefilling charts, as well
 */

Ext.define('Chartsly.interactions.Annotation', {

    extend: 'Ext.chart.interactions.Abstract',
    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.axis.layout.Discrete'
    ],

    type: 'annotation',
    alias: 'interaction.annotation',

    config: {
        //TODO: see if we can route these events based on a particular sprite target. Currently, we
        //call getMatchingAnnotationSprite() to figure out if there is a annotation in the area where
        //the event has originated from

        /**
         * @cfg {String} addGesture
         * Specifies which gesture should be used for add an annotation.
         */
        addGesture: 'doubletap',
        /**
         * @cfg {String} addGesture
         * Specifies which gesture should be used for starting/maintaining/ending the move interaction.
         */
        moveGesture: 'drag',
        /**
         * @cfg {String} addGesture
         * Specifies which gesture should be used for viewing/editing an annotation.
         */
        editGesture: 'tap',

        events: [
            /**
             * Fired when an annotation is added to the chart
             * @param chart Chart to which Annotation interaction is added
             * @param text Annotation text entered by the user
             * @param {Ext.draw.sprite.Image} sprite Image sprite that is added to indicate annotation
             * @param e Event object
             */
            'annotationadded',
            /**
             * Fired when an annotation is removed from a chart
             * @param chart Chart to which Annotation interaction is added
             * @param e Event object
             */
            'annotationremoved',
            /**
             * Fired when an annotation text is updated on a chart
             * @param chart Chart to which Annotation interaction is added
             * @param newText New annotation text entered by the user
             * @param oldText Old annotation text
             * @param {Ext.draw.sprite.Image} sprite Image sprite that indicates the annotation
             * @param e Event object
             */
            'annotationupdated',
            /**
             * Fired before the annotation starts moving
             * @preventable
             * @param chart Chart to which Annotation interaction is added
             * @param {Ext.draw.sprite.Image} sprite Image sprite that indicates the annotation
             * @param e Event object
             */
            'beforeannotationmove',
            /**
             * Fired after an annotation has been moved to a new location
             * @param chart Chart to which Annotation interaction is added
             * @param {Ext.draw.sprite.Image} sprite Image sprite that indicates the annotation
             * @param e Event object
             */
            'annotationmoved'
        ]  
    },

    annotations: [],    //internal. Structure is {text: '', sprite: Image sprite object}
    itemOnMove: null,   //internal,
    continueMove: false,    //internal

    updateChart: function (chart) {
        if (!(chart instanceof Ext.chart.CartesianChart)) {
            throw 'Annotation interaction can only be used on cartesian charts.';
        }
        this.callParent(arguments);
    },

    getGestures: function () {
        var me = this,
            gestures = {};
        gestures[me.getAddGesture()] = 'onAddGesture';
        gestures[me.getMoveGesture()] = 'onGesture';
        gestures[me.getMoveGesture() + 'start'] = 'onGestureStart';
        gestures[me.getMoveGesture() + 'end'] = 'onGestureEnd';
        gestures[me.getEditGesture()] = 'onEditGestureEnd';
        return gestures;
    },

    onAddGesture: function (e) {
        var me = this,
            xy = me.getChartPosition(e),
            chart = me.getChart(),
            surface = chart.getSurface('overlay');

        //show an image to indicate annotation
        var img = {
                type: 'image',
                x: xy[0] - 15,
                y: xy[1] - 30,
                draggable: true,
                src: 'resources/images/Annotation.png'
        };

        var item = surface.add(img);
        surface.renderFrame();

        //create a dialog with text area
        Ext.Msg.show({
            header:false,
            buttons: Ext.Msg.YESNOCANCEL,
            buttonText: {yes: 'Save', no: 'Remove'},
            multiline: true,
            closable: false,
            fn: function( btn , text, opt){
                if (btn == 'no') {
                    //remove the annotation sprite
                    surface.remove(item);
                    surface.renderFrame();

                    chart.fireEvent('annotationremoved', chart, e);
                } else {
                    //yes and cancel button
                    //set the annotation text and add annotation to the internal cache
                    me.annotations.push({text: text, sprite: item});

                    chart.fireEvent('annotationadded', chart, text, item, e);
                }
            }
        });
    },

    onEditGestureEnd: function(e) {
        var me = this,
            chart = me.getChart(),
            surface = chart.getSurface('overlay'),
            item = me.getMatchingAnnotationSprite(e);

        if (item) {
            //create a dialog with text area populated for edit
            Ext.Msg.show({
                header:false,
                buttons: Ext.Msg.YESNOCANCEL,
                buttonText: {yes: 'Save', no: 'Remove'},
                multiline: true,
                closable: false,
                value: item.text,
                fn: function( btn , text, opt){
                    if( btn == 'cancel' ){
                        //do nothing, for now
                    } else if (btn == 'no') {
                        //remove the annotation sprite
                        surface.remove(item.sprite);
                        surface.renderFrame();

                        chart.fireEvent('annotationremoved', chart, e);
                    } else {
                        //yes button
                        //set the annotation text and add annotation to the internal cache
                        var oldTxt = item.text;
                        item.text = text;
                        chart.fireEvent('annotationupdated', chart, item.text, oldTxt, item.sprite, e);
                    }
                }
            });            
        }
    },

    onGestureStart: function (e) {
        var me = this,
            chart = me.getChart();

        // console.log(e);
        me.lockEvents(me.getMoveGesture());

        var xy = me.getChartPosition(e);

        me.itemOnMove = me.getMatchingAnnotationSprite(e);

        //control comes here for every dragstart event, even if we are not dragging an annotation. And
        //in that case the item will be null
        if (me.itemOnMove) {
            if (chart.fireEvent('beforeannotationmove', chart, me.itemOnMove.sprite, e) != false) {
                me.continueMove = true;
            }
        }
    },

    onGesture: function(e) {
        var me = this;

        if (!me.continueMove) {
            return;
        }

        if (me.getLocks()[me.getMoveGesture()] !== me) {
            return;
        }

        var xy = me.getChartPosition(e);

        if (me.itemOnMove) {
            me.itemOnMove.sprite.setAttributes({x: xy[0] - 15, y: xy[1] - 15});  
            me.getChart().getSurface('overlay').renderFrame();      
        }
    },

    onGestureEnd: function (e) {
        var me = this,
            chart = me.getChart(),
            surface =  chart.getSurface('overlay');

        surface.renderFrame();
        me.unlockEvents(me.getMoveGesture());

        chart.fireEvent('annotationmoved', chart, me.itemOnMove.sprite, e);
    },

    /**
     * @private
     * Translates the event co-ordinates to chart co-ordinates and returns them
     * @param e Event object
     * @return Return [x, y] chart co-ordinates
     *
     */
    getChartPosition: function(e) {
        var me = this;

        var chart = me.getChart(),
            surface = chart.getSurface('overlay'),
            rect = Ext.Array.slice(chart.getInnerRect()),
            padding = chart.getInnerPadding(),
            px = padding.left,
            py = padding.top,
            chartWidth = rect[2],
            chartHeight = rect[3],
            xy = chart.getEventXY(e),
            x = xy[0],
            y = xy[1];

        if (x < 0) {
            x = 0;
        } else if (x > chartWidth) {
            x = chartWidth;
        }
        if (y < 0) {
            y = 0;
        } else if (y > chartHeight) {
            y = chartHeight;
        }
        x += px;
        y += py;

        return [x, y];
    },

    /**
     * @private
     * Based on the location of the event, finds out if there is an annotation rendered in that
     * position and returns it
     * @param e Event object
     * @return Annotation item in the following structure:
     *      {
     *          text: 'annotation text entered by the user',
     *          sprite: image sprite
     *      }
     *
     */
    getMatchingAnnotationSprite: function(e) {
        var me = this;
        var tmp = null,
            items = me.annotations, 
            i, 
            l = items.length, 
            xy = me.getChartPosition(e),
            x = xy[0],
            y = xy[1];

        for (i = 0; i < l; i++) {
            tmp = items[i];

            //TODO: we are loosing the detection on the edges
            // console.log(xy, [tmp.attr.x, tmp.attr.y], [tmp.attr.x + 30, tmp.attr.y + 30]);
            var attr = tmp.sprite.attr;

            if ((x >= attr.x && x <= (attr.x + 30)) && 
                (y >= attr.y && y <= (attr.y + 30))) {
                // console.log('Found a matching annotation sprite. Returning......');
                return tmp;
            }
        }

        //if we are here, we could not find anything
        // console.log('No matching annotation sprite found. You are probably outside of it!');

    }

});
