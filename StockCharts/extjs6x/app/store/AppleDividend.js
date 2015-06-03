Ext.define("Chartsly.store.AppleDividend", {
    alias: 'store.AppleDividend',
    requires: ['Chartsly.model.Dividend', 'Ext.data.reader.Array'],
    extend: "Ext.data.ArrayStore",
    config: {
        model: "Chartsly.model.Dividend",
        data: [
            [1423699200000, 'Special', '4000', 'Rs.40.0000 per share(4000%)Special Dividend'],
            [1431561600000, 'Interim', '500', 'Rs.5.0000 per share(500%)Interim Dividend'],
            [1431388800000, 'Final', '800', 'Rs.8.00 per share(800%)Final Dividend'],
            [1431475200000, 'Interim', '350', 'Second Interim Dividend'],
            [1427155200000, 'Final', '500', 'AGM'],
            [1428624000000, 'Final', '450', 'Final Dividend of Rs.4.50 per equity share of Re.1/- each'],
            [1421366400000, 'Final', '430', 'Final Dividend of Rs.4.30 per equity share of Re.2/- each']
        ]
    }
});