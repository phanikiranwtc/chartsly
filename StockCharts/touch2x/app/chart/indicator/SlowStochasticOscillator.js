/**
 * @class Chartsly.chart.indicator.SlowStochasticOscillator
 * @extends Ext.chart.CartesianChart
 *
 * SlowStochasticOscillator chart that looks for numeric axis and adds SlowStochasticOscillator specific configuration
 * such as fields, maximum, and minimum. 
 *
 * Calculated fields are  ['slowpctk', 'slowptcd' ], added by the  slowstochasticoscillator series to the records.
 * 
 * SlowStochasticOscillator has two line graphs, one line represents %k and other represents %d.
 *
 * Here, another series type is being pushed, to represent %d line.
 *
 *		
 */
Ext.define("Chartsly.chart.indicator.SlowStochasticOscillator", {
    extend: 'Ext.chart.CartesianChart',
    requires: ['Chartsly.series.indicator.SlowStochasticOscillator', 'Chartsly.sprite.indicator.SlowStochasticOscillator'],
    xtype: 'slowstochasticoscillator',

    initConfig: function(config) {

        var series = config.series[0];
        var obLevel = series.overboughtLevel;
        var osLevel = series.oversoldLevel;

        Ext.Array.each(config.axes, function(axis, index, recs) {
            if (axis.type === 'numeric') {
                Ext.apply(axis, {
                    fields: ['slowpctk', 'slowptcd' ],
                    maximum: 100,
                    minimum: 0,
		    // Added majorTickSteps = 20, so that logic works for all multiples of five, between 0 to 100.		
		    majorTickSteps: 20,	

                    renderer: function (value, layoutContext, lastValue) { 
		                if (value == osLevel || value == 50 || value == obLevel){
		                    return value;
		                } else {
		                    return "";
		                }
                    } 
                });
            }
        });

	//add a line series for %d line
	 config.series.push({
           	        store: config.series[0].store,
                        type: 'slowstochasticoscillator',
                        xField: 'date',
                        yField: 'slowptcd',
                        style: {
                              stroke: 'rgba(255,0,0,0.75)',
                              miterLimit: 1
                        },
        });



        this.callParent(arguments);
    }
});
