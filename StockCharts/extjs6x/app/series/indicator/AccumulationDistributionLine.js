/**
 * @class Chartsly.series.indicator.AccumulationDistributionLine
 * @extends Ext.chart.series.Cartesian
 *
 * AccumulationDistributionLine (ADL) series that iterates the store records and calculates 
 * the ADL value based on the following formulae:
 *
 * 1. Money Flow Multiplier = [(Close  -  Low) - (High - Close)] /(High - Low)
 * 2. Money Flow Volume = Money Flow Multiplier x Volume for the Period
 * 3. ADL = Previous ADL + Current Period's Money Flow Volume
 * 
 * For more detail, refer to http://stockcharts.com/school/doku.php?id=chart_school:technical_indicators:accumulation_distribution_line
 *
 * The calculated ADL value is set a "adl" field on the record
 */
Ext.define('Chartsly.series.indicator.AccumulationDistributionLine', {
    extend: 'Ext.chart.series.Cartesian',
    alias: 'series.adl',
    seriesType: 'lineSeries',

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
        volumeField: "volume"
    },

    /*
     * Creats a ADL series
     * @param {Object} [config] Configuration
     */
    constructor: function (config) {

        var me = this;

        var st = Ext.data.StoreManager.lookup(config.store);
        var recs = st.getRange();

        var prevADL = 0;
        var currADL = 0;

        var high = 0, low = 0, close = 0;

        st.each(function (item, index, length) {
            high = item.get(config.highField);
            low = item.get(config.lowField);
            close = item.get(config.closeField);

            //calculate Money Flow Multiplier
            //Money Flow Multiplier = [(Close  -  Low) - (High - Close)] /(High - Low)
            var mfm = ((close - low) - (high - close))/(high - low);

            //calculate Money Flow Volume
            //Money Flow Volume = Money Flow Multiplier x Volume for the Period
            var mfv = mfm*item.get(config.volumeField);
            //calculate ADL
            //ADL = Previous ADL + Current Period's Money Flow Volume
            currADL = prevADL + mfv;

            item.data.adl = currADL;

            prevADL = currADL;
        });

        this.callParent(arguments);
    }
});
