/**
 * @class Chartsly.sprite.indicator.ChikinMoneyFlow
 * @extends Ext.chart.series.sprite.Line
 *
 * ChikinMoneyFlow series sprite. This does the following:
 * 1) Draws and fills the buying pressure i.e. above zero indicates the positive area
 * 2) Draws and fills the selling pressure i.e. below zero indicatores the negative area
 * 3) Draws horizontal lines at 0
 * 4) Draws the line graph
 */
Ext.define('Chartsly.sprite.indicator.ChaikinMoneyFlow', {
    alias: 'sprite.chaikinmoneyflow',
    extend: 'Ext.chart.series.sprite.Area',

    inheritableStatics: {
        def: {
            processors: {
                preciseStroke: 'bool',
                cmfPeriod: 'number'
            }
        }
    },

    /**
     * @private
     * Draws a line parallel to X-axis
     * @param ctx SVG or Canvas context
     * @param x length of the line
     * @param y ordinate where the line needs to be drawn
     * @return 
     */
    drawYLine: function(ctx, x, y, dashed) {
		
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(x, y);
        ctx.closePath();
		 
        var linedash;
        if (dashed) {
            linedash = ctx.getLineDash();
            ctx.setLineDash([3]);
        }
        ctx.stroke();

        //reset the dash style
        if (dashed) {
            ctx.setLineDash(linedash);
        }
    },
	 
	 /**
     * @private Override {@link Ext.chart.series.sprite.Area#renderClipped}
	  *
	  *  Draws the area sprite and middle line at 0 parallel to y-axis
	  *      
	  */
    renderClipped: function (surface, ctx, clip) {
		 
		 // Call the renderClipped function from super class i.e. Ext.chart.series.sprite.Area to draw Area
		this.superclass.renderClipped.call(this, surface, ctx, clip);
		
		var me = this,
          attr = me.attr,
          matrix = attr.matrix,
          yy = matrix.elements[3],
          dy = matrix.elements[5];
           
        var pixelAdjust = attr.lineWidth * surface.devicePixelRatio / 2;

        pixelAdjust -= Math.floor(pixelAdjust);
		  
        var midLine = Math.round( 0 * yy + dy) - pixelAdjust;
		  
		  var xLenArray = surface.getRect();
		  
		  if(!Ext.isEmpty(xLenArray)){
		  	
			  var xLenValue = xLenArray[2];  
	 		  // Draw middle line at 0 
	 		  me.drawYLine(ctx, xLenValue, midLine);
	
		  }
	
    }
});