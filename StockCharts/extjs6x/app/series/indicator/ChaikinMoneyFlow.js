/**
 * @class Chartsly.series.indicator.ChaikinMoneyFlow
 * @extends Ext.chart.series.Cartesian
 *
 * Chikin Money Flow series iterate the records and calculates the CMF value based on following formula's
 *
 * 1. Money Flow Multiplier = [(Close  -  Low) - (High - Close)] /(High - Low) 
 * 
 * 2. Money Flow Volume = Money Flow Multiplier x Volume for the Period
 * 
 * 3. 20-period CMF = 20-period Sum of Money Flow Volume / 20 period Sum of Volume 
 *
 * 
 * The calculated Chikin Money Flow value is set a "cmf" field on the record
 */
Ext.define('Chartsly.series.indicator.ChaikinMoneyFlow', {
    extend: 'Ext.chart.series.Area',
    alias: 'series.chaikinmoneyflow',
    seriesType: 'areaSeries',
	  requires : 'Setu.Util',

    config: {
		
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
		   * Data field containing the volume value. Defaults to "volume"
		   */
		  volumeField: "volume",
        /*
         * Chaikin money flow period (in days) to calculate Chaikin Money Flow. Defaults to 20 days
         */
        chaikinMoneyFlowPeriod: 20
    },

    /*
     * Creats a Chaikin Money Flow series
     * @param {Object} [config] Configuration
     */
    constructor: function (config) {
		 
        var me = this;

        var st = Ext.data.StoreManager.lookup(config.store);
		  
		  // Checking for server side input data, if input data has "cmf" value then no calculation required else calculate
		  // "cmf" value and then create Chikin MoneyFlow series
		  
		  var cmfValuePresent = Util.isFieldPresent(st, config.yField);
		  
		  if( !cmfValuePresent ){
			  
        var recs = st.getRange();

        var cmfPeriod = config.chaikinMoneyFlowPeriod - 1;

        st.each(function (item, index, length) {
           
			   //
				// Calculating Money Flow Multiplier value for each record with following formula
				//
				// Money Flow Multiplier = [(Close  -  Low) - (High - Close)] /(High - Low)
				//
				
				var mfm = ( ((item.data[config.closeField] - item.data[config.lowField]) - ( item.data[config.highField] -  item.data[config.closeField] )) / (item.data[config.highField] - item.data[config.lowField]));
				
				item.data.mfm= mfm;
	
				//
				// Money Flow Volume = Money Flow Multiplier x Volume for the Period
				//
				
				var mfVolume = ( mfm * item.data[config.volumeField] );

				item.data.mfVolume = mfVolume;

				// Calculate Chaikin Money Flow for chaikinMoneyFlowPeriod
				// e.g. : 20-period CMF = 20-period Sum of Money Flow Volume / 20 period Sum of Volume

	         if (index < cmfPeriod) {
	                item["periodCMF"] = "";
	                return;
	         }else{

					var periodCMFRecs = Ext.Array.slice(recs, index - cmfPeriod, index + 1);

					var sumOfPeriodMFVArray = Ext.Array.pluck(Ext.Array.pluck(periodCMFRecs, "data"), 'mfVolume');
					var sumOfVolumeArray = Ext.Array.pluck(Ext.Array.pluck(periodCMFRecs, "data"), 'volume');
								
					var periodCMF = Ext.Array.sum(sumOfPeriodMFVArray) / Ext.Array.sum(sumOfVolumeArray);

					item.data.cmf = periodCMF;
					 
	          }
			
        });
		  
	  }

        this.callParent(arguments);
    }

});
