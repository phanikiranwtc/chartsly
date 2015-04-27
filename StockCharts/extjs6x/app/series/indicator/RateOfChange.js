/**
 * @class Chartsly.series.indicator.RateOfChange
 * @extends Ext.chart.series.Cartesian
 *
 * RateOfChange (ROC) series that iterates the store records and calculates 
 * the ROC value based on the following formulae:
 *
 * ROC = [(Close - Close n periods ago) / (Close n periods ago)] * 100
 * 
 * For more detail, refer to http://stockcharts.com/school/doku.php?id=chart_school:technical_indicators:rate_of_change_roc_and_momentum
 *
 * The calculated ROC value is set a "roc" field on the record
 */
Ext.define('Chartsly.series.indicator.RateOfChange', {
    extend: 'Ext.chart.series.Cartesian',
    alias: 'series.roc',
    seriesType: 'lineSeries',

    config: {
        /*
         * Data field containing the close value. Defaults to "close"
         */
        closeField: "close",
        /*
         * Look-back period to calculate ROC. Defaults to 14 periods
         */
        period: 14
    },

    /*
     * Creats a ROC series
     * @param {Object} [config] Configuration
     */
    constructor: function (config) {

        var me = this;

        var st = Ext.data.StoreManager.lookup(config.store);

        var close = 0, nPeriodAgoClose = 0, period = config.period, roc;

        var recs = st.getRange(period);

        Ext.Array.each(recs, function (item, index) {
            if (index < period) {
                return;
            }

            //calculate ROC  
            //ROC = [(Close - Close n periods ago) / (Close n periods ago)] * 100
            close = item.get(config.closeField);
            nPeriodAgoClose = st.getAt(index - period).get(config.closeField);         

            roc = ((close - nPeriodAgoClose)/nPeriodAgoClose)*100;

            item.data.roc = roc;
        });

        this.callParent(arguments);
    }
});