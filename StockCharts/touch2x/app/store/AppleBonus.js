Ext.define("Chartsly.store.AppleBonus", {
    alias: 'store.AppleDividend',
    requires: ['Chartsly.model.Bonus', 'Ext.data.reader.Array'],
    extend: "Ext.data.ArrayStore",
    config: {
        model: "Chartsly.model.Bonus",
        data: [
            // [822466800000, 'Special', '4000', 'Rs.40.0000 per share(4000%)Special Dividend'],
            // [827996400000, 'Interim', '500', 'Rs.5.0000 per share(500%)Interim Dividend'],
            // [828946800000, 'Final', '800', 'Rs.8.00 per share(800%)Final Dividend'],
            // [838278000000, 'Interim', '350', 'Second Interim Dividend'],
            // [840178800000, 'Final', '500', 'AGM'],
            // [844326000000, 'Final', '450', 'Final Dividend of Rs.4.50 per equity share of Re.1/- each'],
            [834130800000, 'Ratio', '1:1', 'Final bonus']
        ]
    }
});