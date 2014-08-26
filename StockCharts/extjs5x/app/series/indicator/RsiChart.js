/**
 * @class Chartsly.series.indicator.RsiChart
 * @extends Ext.chart.series.Cartesian
 *
 * Relative Strength Index series that iterates the store records and calculates the RSI value based on the below formula:
 * 
 * 
 * The calculated RSI value is set a "rsi" field on the record
 */
Ext.define('Chartsly.series.indicator.RsiChart', {
    extend: 'Ext.chart.series.Cartesian',
    alias: 'series.rsichart',
    type: 'rsichart',
    seriesType: 'rsiSeries',

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
        var highs = Ext.Array.pluck(Ext.Array.pluck(recs, "data"), config.highField);
        var lows = Ext.Array.pluck(Ext.Array.pluck(recs, "data"), config.lowField);

        var lpPeriod = config.lookBackPeriod - 1;

        st.each(function (item, index, length) {
            if (index < lpPeriod) {
                item["rsi"] = "";
                return;
            }

	var highSum = 0;
	var lowSum = 0;

	//get high of last 14 days
	var highArray = Ext.Array.slice(highs, index - lpPeriod, index + 1);

	//get low of last 14 days
	var lowArray = Ext.Array.slice(lows, index - lpPeriod, index + 1);

	for(i=0;i<highArray.length;i++) {

		//get sum of high of last 14 days
		highSum = highSum+highArray[i];

		//get sum of low of last 14 days
		lowSum = lowSum+lowArray[i];
	}

	//get Average of high of last 14 days
	var firstHighAvg = highSum/highArray.length;

	//get Average of low of last 14 days
	var firstLowAvg = lowSum/lowArray.length;

	//get Current high of last 14 days
	var currentHigh = highArray[highArray.length-1];

	//get Current low of last 14 days
	var currentLow = lowArray[lowArray.length-1];

	//Average of High
	var highAvg = ((firstHighAvg*(highArray.length-1))+currentHigh)/highArray.length;

	//Average of Low
	var lowAvg = ((firstLowAvg*(lowArray.length-1))+currentLow)/lowArray.length;

	var rs = highAvg/lowAvg;

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
     * the Relative Strength Index specific configs so that they are available to the RsiChart
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
