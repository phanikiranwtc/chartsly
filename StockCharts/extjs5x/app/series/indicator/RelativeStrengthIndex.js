/**
 * @class Chartsly.series.indicator.RelativeStrengthIndex
 * @extends Ext.chart.series.Cartesian
 *
 * Relative Strength Index series that iterates the store records and calculates the RSI value based on the below formula:
 * 
 * 
 * The calculated RSI value is set a "rsi" field on the record
 */
Ext.define('Chartsly.series.indicator.RelativeStrengthIndex', {
    extend: 'Ext.chart.series.Cartesian',
    alias: 'series.relativestrengthindex',
    seriesType: 'relativestrengthindexSeries',

    config: {
        /*
         * Overbought level. Defaults to 80
         */
        overboughtLevel: 80,
        /*
         * Oversold level. Defaults to 30
         */
        oversoldLevel: 30,
        /*
         * Data field containing the close value. Defaults to "close"
         */
        closeField: "close",
        /*
         * Look-back period (in days) to calculate RSI. Defaults to 14 days
         */
        lookBackPeriod: 14
    },

    /*
     * Creats a Relative Strength Index series
     * @param {Object} [config] Configuration
     */
    constructor: function (config) {

        var me = this;

        var st = Ext.data.StoreManager.lookup(config.store);
        var recs = st.getRange();
        var closes = Ext.Array.pluck(Ext.Array.pluck(recs, "data"), config.closeField);

        var lpPeriod = config.lookBackPeriod - 1;

	var gainArray = [];
	var lossArray = [];

        st.each(function (item, index, length) {
            if (index < lpPeriod) {
                item["rsi"] = "";
                return;
            }
            
	//get the changes of close price ~ difference of current and previous
	var changes = Ext.Array.slice(closes, (index - lpPeriod)+1,(index - lpPeriod)+2)-Ext.Array.slice(closes, (index - lpPeriod)+0,(index - lpPeriod)+1);
			
	if(changes > 0) {
	
		gainArray.push(changes);
		
	} else {
		
		lossArray.push(changes*(-1));
		
	}

	//gain sum
	var gainSum = Ext.Array.sum(gainArray);
	
	//loss sum
	var lossSum = Ext.Array.sum(lossArray);
	
	//gain average
	var gainAvg = gainSum/config.lookBackPeriod;
	
	//loss average
	var lossAvg = lossSum/config.lookBackPeriod;

	var rs = gainAvg/lossAvg;

            //calculate Relative Strength Index and set it on the record
            var rsi = 100-(100/(1+rs));
	    rsi = Ext.util.Format.number(rsi,"0.00");	    
            item.data.rsi = rsi;
        });

        this.callParent(arguments);
    },

    /**
     * @private Override {@link Ext.chart.series.Series#getDefaultSpriteConfig}
     * It gets the cartesian series config by calling the parent and then applies
     * the Relative Strength Index specific configs so that they are available to the RelativeStrengthIndex
     * series
     * @return {Object} sprite config object
     */
    getDefaultSpriteConfig: function () {
        var me = this,
            parentStyleConfig = me.callParent(arguments);

        return Ext.apply(parentStyleConfig, {
            overboughtLevel: me.config.overboughtLevel,
            oversoldLevel: me.config.oversoldLevel,
            lookBackPeriod: me.config.lookBackPeriod
        });
    }

});
