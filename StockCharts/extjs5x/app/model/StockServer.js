/**
 * StockServe model is used on the AppleServer store.
 *
 */
Ext.define("Chartsly.model.StockServer", {
    extend: 'Ext.data.Model',
    // config: {
        fields: [
            'date',
            "open",
            "high",
            "low",
            "close",
            "volume",
            "adjClose",
            "cmf"
        ]
    // }
});
