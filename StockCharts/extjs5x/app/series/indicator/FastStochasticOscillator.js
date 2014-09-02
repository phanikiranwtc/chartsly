/**
 * @class Chartsly.series.indicator.FastStochasticOscillator
 * @extends Ext.chart.series.Cartesian
 *
 * Fast Stochastic Oscillator series that iterates the store records and calculates the %K and %D value based on the below formula:
 * 
 * 
 * The calculated %K and %D value is set a "pctk" and "pctd" field respectively on the record
 */
Ext.define('Chartsly.series.indicator.FastStochasticOscillator', {
    extend: 'Ext.chart.series.Cartesian',
    alias: 'series.faststochasticoscillator',
    seriesType: 'faststochasticoscillatorSeries',

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
         * Data field containing the open value. Defaults to "open"
         */
        openField: "open",
        /*
         * Look-back period (in days) to calculate %D. Defaults to 14 days
         */
        lookBackPeriod: 14,
        /*
         * Simple Moving Average (in days) to calculate smaDays. Defaults to 3 days
         */
        smaDays: 3
    },

    /*
     * Creats a Fast Stochastic Oscillator series
     * @param {Object} [config] Configuration
     */
    constructor: function (config) {

        var me = this;

        var st = Ext.data.StoreManager.lookup(config.store);
        var recs = st.getRange();
        var highs = Ext.Array.pluck(Ext.Array.pluck(recs, "data"), config.highField);
        var lows = Ext.Array.pluck(Ext.Array.pluck(recs, "data"), config.lowField);
        var closes = Ext.Array.pluck(Ext.Array.pluck(recs, "data"), config.closeField);

        var lpPeriod = config.lookBackPeriod - 1;
	var initialValue = 0;
	var finalValue = config.smaDays;
	var ptckArray = [];

        st.each(function (item, index, length) {
            if (index < lpPeriod) {
                item["pctd"] = "";
                return;
            }
            
            //get highest high of last 14 days
            var maxHigh = Ext.Array.max(Ext.Array.slice(highs, index - lpPeriod, index + 1));

            //get lowest low of last 14 days
            var minHigh = Ext.Array.min(Ext.Array.slice(lows, index - lpPeriod, index + 1));            

            //calculate %K and set it on the record
            var pctk = ((item.data[config.closeField]-minHigh)/(maxHigh-minHigh))*100;
            ptckArray.push(pctk);

            if(ptckArray.length > config.smaDays)
	    {
	    	//calculate %D and set it on the record
		var pctd = Ext.Array.mean(Ext.Array.slice(ptckArray, initialValue, finalValue));
		initialValue++;	
		finalValue++; 
	    }

            item.data.pctk = pctk;
            item.data.pctd = pctd;
        });

        this.callParent(arguments);
    },

    /**
     * @private Override {@link Ext.chart.series.Series#getDefaultSpriteConfig}
     * It gets the cartesian series config by calling the parent and then applies
     * the Fast Stochastic Oscillator specific configs so that they are available to the FastStochasticOscillator
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
