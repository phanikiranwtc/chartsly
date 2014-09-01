/**
 * @class Chartsly.series.indicator.MoneyFlowIndex
 * @extends Ext.chart.series.Cartesian
 *
 * MoneyFlowIndex  series that iterates the store records and calculates the MoneyFlowIndex value based on the below formula:
 *   MoneyFlowIndex     = (100 - 100/(1 + MoneyFlowRatio));
 *   MoneyFlowRatio    =  lookbackperiodPostiveMoneyFlow / lookbackperiodNegativeMoneyFlow ;
 *   Here, 14-days is the LookBackPeriod.
 *
 * The calculated MoneyFlowIndex value is set a "mfi" field on the record
 */
Ext.define('Chartsly.series.indicator.MoneyFlowIndex', {
    extend: 'Ext.chart.series.Cartesian',
    alias: 'series.moneyflowindex',
    seriesType: 'moneyflowindex',  //sprite type for this series

    config: {
        /*
         * Overbought level. Defaults to 80
         */
        overboughtLevel: 80,
        /*
         * Oversold level. Defaults to 20
         */
        oversoldLevel: 20,
        /*
         * Data field containing the high value. Defaults to "high"
         */
        highField: "high",
        /*
         * Data field containing the low value. Defaults to "low"
         */
        lowField: "low",
        /*
         * Data field containing the close value. Defaults to "close"
         */
        closeField: "close",
	 /*
         * Data field containing the Volume value. Defaults to "volume"
         */
        volumeField: "volume", 
        /*
         * Look-back period (in days) to calculate MoneyFlowIndex. Defaults to 14 days
         */
        lookBackPeriod: 14
    },

    /*
     * Creats a MoneyFlowIndex series
     * @param {Object} [config] Configuration
     */
    constructor: function (config) {

        var me = this;
        var st = Ext.data.StoreManager.lookup(config.store);
        var lpPeriod = config.lookBackPeriod - 1;

        // Defining Array to store postiveMoneyFlow values.
	var postiveMoneyFlow  = [];
	
	//Defining Array to store negativeMoneyFLow values.
	var negativeMoneyFlow = [];


        st.each(function (item, index, length) { 

	   // Calculating typicalPrice as per the formula, for the current record.
           var currentTypicalPrice =  (item.get(config.highField) + item.get(config.lowField) + item.get(config.closeField) )/3;
	
	   // Calculating rawMoneyFlow as per the formula, for the current record.
	   var rawMoneyFlow =  (currentTypicalPrice * item.get(config.volumeField)) ;
			
	  

	   // Enters the condition from second record.
	   if(index > 0) {
		   items = item.store.data.items;
		   
		   // Calculating typicalPrice as per the formula, for the previous record. 	
		   var previousTypicalPrice = (items[index-1].get(config.highField) + items[index-1].get(config.lowField) + items[index-1].get(config.closeField))/3;	
	
		   
                   //Storing values in postiveMoneyFlow array.
		   if(currentTypicalPrice > previousTypicalPrice) {
			postiveMoneyFlow[index]  = rawMoneyFlow;	
			negativeMoneyFlow[index] = 0;	
		    }

		  //Storing values in negativeMoneyFlow array.			
		  else{
			negativeMoneyFlow[index] = rawMoneyFlow;
			postiveMoneyFlow[index]  = 0;
		   }	
	
	     }				
	
		

            // Getting 14day-postive and negative money flow values, and hence calculating MoneyFlowIndex.
	    if (index > lpPeriod) { 
                    
		    // Calculating 14day-PostiveMoneyFLow value.	
		    lookbackperiodPostiveMoneyFlow   =	Ext.Array.sum(Ext.Array.slice(postiveMoneyFlow, index - lpPeriod, index + 1));

		    // Calculating 14day-NegativeMoneyFlow value.
		    lookbackperiodNegativeMoneyFlow  =	Ext.Array.sum(Ext.Array.slice(negativeMoneyFlow, index - lpPeriod, index + 1));

		    //calculate Money Flow Index and set it on the record
		    var moneyFlowRatio    =  lookbackperiodPostiveMoneyFlow / lookbackperiodNegativeMoneyFlow ;
		    var moneyFlowIndex    = (100 - 100/(1 + moneyFlowRatio));
		    item.data.mfi         = moneyFlowIndex;
	  }

		
        });

        this.callParent(arguments);
    },

    /**
     * @private Override {@link Ext.chart.series.Series#getDefaultSpriteConfig}
     * It gets the cartesian series config by calling the parent and then applies
     * the MoneyFlowIndex specific configs so that they are available to the MoneyFlowIndex
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
