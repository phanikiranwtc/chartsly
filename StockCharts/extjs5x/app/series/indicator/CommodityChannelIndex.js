/**
 * @class Chartsly.series.indicator.CommodityChannelIndex
 * @extends Ext.chart.series.Cartesian
 *
 * Commodity Channel Index (CCI) series that iterates the store records and calculates the CCI 
 * value based on the below formulae:
 * 1. Typical Price (TP) = (High + Low + Close)/3
 * 2. CCI = (Typical Price  -  20-period SMA of TP) / (.015 x Mean Deviation)
 * 
 * The calculated CCI value is set as "cci" field on the record
 */
Ext.define('Chartsly.series.indicator.CommodityChannelIndex', {
    extend: 'Ext.chart.series.Cartesian',
    alias: 'series.cci',
    seriesType: 'cci',  //sprite type for this series

    config: {
        /*
         * Strong level. Defaults to 100
         */
        strongLevel: 100,
        /*
         * Weak level. Defaults to -100
         */
        weakLevel: -100,
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
         * Look-back period to calculate CCI. Defaults to 14 periods
         */
        period: 14
    },

    /*
     * Creats a CCI series
     * @param {Object} [config] Configuration
     */
    constructor: function (config) {

        var me = this;

        var st = Ext.data.StoreManager.lookup(config.store);

        var tp = 0, tpArr = [], period = config.period, cci;

        st.each(function (item, index, length) {
            //calculate Typical price
            //Typical Price (TP) = (High + Low + Close)/3
            tp = (item.get(config.highField) + item.get(config.lowField) + item.get(config.closeField))/3;

            tpArr.push(tp);

            if (index >= period) {
                //calculate SMA of TP
                var tpArrForPeriod = Ext.Array.slice(tpArr, index - period, index);
                var tpSMA = Ext.Array.mean(tpArrForPeriod);

                //calculate mean deviation
                var meanDev = me.meanDeviation(tpSMA, tpArrForPeriod, period);

                //calculate CCI
                //CCI = (Typical Price  -  20-period SMA of TP) / (.015 x Mean Deviation)
                cci = (tp - tpSMA)/(0.15*meanDev);
            }

            item.data.cci = cci;
        });

        tpArr = null;

        this.callParent(arguments);
    },

    /**
    * @private
    * Calculates Mean Deviation of the SMA of TP
    * @param tpSMA moving average of TP for the specified period
    * @param tpArr Typical Prices for the specified period
    * @param count number of periods
    * @return returns mean deviation value
    */
    meanDeviation: function(tpSMA, tpArr, count) {
        var i = 0;
        Ext.Array.each(tpArr, function(tp, idx) {
            i += Math.abs(tpSMA - tp);
        });

        return i/count; 

    },

    /**
     * @private Override {@link Ext.chart.series.Series#getDefaultSpriteConfig}
     * It gets the cartesian series config by calling the parent and then applies
     * the CCI specific configs so that they are available to the CommodityChannelIndex
     * series
     * @return {Object} sprite config object
     */
    getDefaultSpriteConfig: function () {
        var me = this,
            parentStyleConfig = me.callParent(arguments);

        return Ext.apply(parentStyleConfig, {
            strongLevel: me.config.strongLevel,
            weakLevel: me.config.weakLevel,
            period: me.config.period
        });
    }

});