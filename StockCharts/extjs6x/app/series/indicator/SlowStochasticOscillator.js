/**
 * @class Chartsly.series.indicator.SlowStochasticOscillator
 * @extends Ext.chart.series.Cartesian
 *
 *       %K  = 	(Current Close - Lowest Low)/(Highest High - Lowest Low) * 100
 *  Fast %K  = 	%K basic calculation
 *
 *
 *  Lowest Low = lowest low for the look-back period
 *  Highest High = highest high for the look-back period
 *  %K is multiplied by 100 to move the decimal point two places 
 *  The default setting for the Stochastic Oscillator is 14 periods(look-back period), which can be days, weeks, months or an intraday timeframe.
 *
 *  Slow Stochastic Oscillator:
 *                      Slow %K = Fast %K smoothed with 3-period SMA
 *                      Slow %D = 3-period SMA of Slow %K
 * 
 * Ref Link : http://stockcharts.com/school/doku.php?id=chart_school:technical_indicators:stochastic_oscillator_fast_slow_and_full
 *
 *		
 */

Ext.define('Chartsly.series.indicator.SlowStochasticOscillator', {
    extend: 'Ext.chart.series.Cartesian',
    alias: 'series.slowstochasticoscillator',
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
         * Look-back period (in days) to calculate SlowStochasticOscillator. Defaults to 14 days
         */
        lookBackPeriod: 14,
	/*
         * SMA period (in days) for %k. Defaults to 3 days for SlowStochasticOscillator
         */
        smaPctK: 3,
	/*
         * SMA period (in days) for %d. Defaults to 3 days for SlowStochasticOscillator
         */
        smaPctD: 3
    },

    /*
     * Creats a SlowStochasticOscillator series
     * @param {Object} [config] Configuration
     */
    constructor: function (config) {

	/*	
	 *  Defining the seriesType based on the series yField.
	 *  
	 *  This logic is to eliminate the call for Custom sprite "slowstochasticoscillator", multiple times.
	 *
	 *  The Repetion of custom sprite leads to multiple overBought, overSold and "50" lines.
	 *
	 */
	
	// if yField is "slowpctk", then custom sprite will be called.
	if(config.yField == "slowpctk") {
			this.seriesType = "slowstochasticoscillator";
	  	}  


        // if yField is "slowptcd", then custom sprite will not be called.
	else {    
		this.seriesType = "lineSeries";
	  }


        var me = this;
        var st = Ext.data.StoreManager.lookup(config.store);
        var lpPeriod = config.lookBackPeriod - 1;
	
	var recs = st.getRange();
        var highs = Ext.Array.pluck(Ext.Array.pluck(recs, "data"), config.highField);
        var lows = Ext.Array.pluck(Ext.Array.pluck(recs, "data"), config.lowField);

	
	// Defining array to push all the %k values.
	var pctkArray = []; 
	
	// Defining array to push all the %d values.
	var pctdArray = [];     

	// The initial value used for slicing the %k(pctkArray) array.
        var initialValueForPctK = 0;

	// The final value used for slicing the %k(pctkArray) array.
	var finalValueForPctK = config.smaPctK ;

	//The initial value used for slicing the %d(pctdArray) array.
	var initialValueForPctD = 0;

	// The final value used for slicing the %d(pctdArray) array.
	var finalValueForPctD   = config.smaPctD ;
	      

        st.each(function (item, index, length) { 
	
	if(index > lpPeriod){	 	
			      //get highest high of last 14 days
			    var maxHigh = Ext.Array.max(Ext.Array.slice(highs, index - lpPeriod, index + 1));

			    //get lowest low of last 14 days
			    var minHigh = Ext.Array.min(Ext.Array.slice(lows, index - lpPeriod, index + 1));

			    //calculate basic %k. 
			    var pctk = ((item.data[config.closeField]- minHigh )/(maxHigh - minHigh)) * 100 ;
			   
			    pctkArray.push(pctk);	
			    
			    // Enters the loop after the (SMA-period) values for %k are available.	
			     if(pctkArray.length > config.smaPctK)
				{
					var slowpctk = Ext.Array.mean(Ext.Array.slice(pctkArray, initialValueForPctK, finalValueForPctK));
					
					initialValueForPctK ++;	
					finalValueForPctK ++; 
					
					pctdArray.push(slowpctk); 
				}		
			
			     // Enters the loop after the (SMA-period) values for %d are available.	
			     if(pctdArray.length > config.smaPctD)
				{
					var slowptcd = Ext.Array.mean(Ext.Array.slice(pctdArray, initialValueForPctD, finalValueForPctD));

					initialValueForPctD ++;	
					finalValueForPctD ++; 
				}		

				//Setting the value of slow %k and slow %d, on the record.
				item.data.slowpctk = slowpctk;
				item.data.slowptcd = slowptcd;
		   		        
		}
		
        });

        this.callParent(arguments);
    },

    /**
     * @private Override {@link Ext.chart.series.Series#getDefaultSpriteConfig}
     * It gets the cartesian series config by calling the parent and then applies
     * the SlowStochasticOscillator specific configs so that they are available to the slowstochasticoscillator
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
