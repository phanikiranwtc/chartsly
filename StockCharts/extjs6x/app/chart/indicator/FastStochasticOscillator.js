/**
 * @class Chartsly.chart.indicator.FastStochasticOscillator
 * @extends Ext.chart.CartesianChart
 *
 * Fast Stochastic Oscillator chart that looks for numeric axis and adds %D specific configuration
 * such as fields, maximum, and minimum. fields is defaulted to ['pctd','pctk'] as this field is added by the
 * FastStochasticOscillator series to the records.
 * 
 * The calculated %K and %D value is set a "pctk" and 'pctd' field respectively on the record
 */
Ext.define("Chartsly.chart.indicator.FastStochasticOscillator", {
    extend: 'Ext.chart.CartesianChart',
    requires: ['Chartsly.series.indicator.FastStochasticOscillator', 'Chartsly.sprite.indicator.FastStochasticOscillator'],
    xtype: 'faststochasticoscillator',

    initConfig: function(config) {

        var series = config.series[0];
        var obLevel = series.overboughtLevel;
        var osLevel = series.oversoldLevel;

        Ext.Array.each(config.axes, function(axis, index, recs) {
            if (axis.type === 'numeric') {

                Ext.apply(axis, {
                    fields: ['pctd','pctk'],
                    maximum: 100,
                    minimum: 0,
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

	config.series.push({
                store: config.series[0].store,
                type: 'faststochasticoscillator',
                xField: 'date',
                yField: 'pctd',
                highField: "high",
                lowField: "low",
                closeField: "close",
		volumeField: "volume",
                overboughtLevel: 80,
                oversoldLevel: 30,
                lookBackPeriod: 14,  //in days
                smaDays: 3,	//in days
		smooth: true,
                style: {
                     stroke: 'black',
                     miterLimit: 1
                },
                marker: {
                    opacity: 1,
                    scaling: 0.2,
                    fillStyle : '#E3742D',
                    fx: {
                        duration: 20,
                        easing: 'easeOut'
                    }
                },
                highlightCfg: {
                    opacity: 1,
                    scaling: 1.5
                },
                tooltip: {
                    trackMouse: true,
                    style:{
                        backgroundColor:'#fff',
                        border:'2px solid #E3742D',
                        fontFamily:'Helvetica',
                    },
                    renderer: function(tooltip,record, item) {
                        var open = Util.formatNumber(record.get('open'),"0.0000");
                        var close = Util.formatNumber(record.get('close'),"0.0000");
                        var high = Util.formatNumber(record.get('high'),"0.0000");
                        var low = Util.formatNumber(record.get('low'),"0.0000");
                        var volume = record.get('volume');
                        tooltip.setHtml('<table>'+'<tr>'+'<td>'+'Open:'+'</td>'+'<td>'+'$'+open+'</td>'+'</tr>'+'<tr>'+'<td>'+'Close:'+'</td>'+'<td>'+'$'+close+'</td>'+'</tr>'+'<tr>'+'<td>'+'High:'+'</td>'+'<td>'+'$'+high+'</td>'+'</tr>'+'<tr>'+'<td>'+'Low:'+'</td>'+'<td>'+'$'+low+'</td>'+'</tr>'+'<tr>'+'<td>'+'Volume:'+'</td>'+'<td>'+'$'+volume+'</td>'+'</tr>'+'</table>');
                    }
                }
	});

        this.callParent(arguments);
    }
});
