/**
 * @class Chartsly.chart.indicator.TRIX
 * @extends Ext.chart.CartesianChart
 *
 * TRIX chart that looks for numeric axis and adds TRIX specific configuration
 * such as fields. fields is defaulted to ['trix', 'sigtrix'] as this field is added by the
 * TRIX series to the records.
 * 
 * The calculated trix and sigtrix values are set as "trix" and "sigtrix" fields on the record, respectively
 */
Ext.define("Chartsly.chart.indicator.TRIX", {
    extend: 'Ext.chart.CartesianChart',
    requires: ['Chartsly.series.indicator.TRIX'],
    xtype: 'trixchart',

    initConfig: function(config) {

        Ext.Array.each(config.axes, function(axis, index, recs) {
            if (axis.type === 'numeric') {
                Ext.apply(axis, {
                    fields: ['trix', 'sigtrix']
                });
            }
        });

        //TODO: Find a better solution for preparing the config and drawing TRIX signal line.
        //Will re-visit this in the next iteration.
        
        //add a line series for TRIX Signal line
        config.series.push({
            store: config.series[0].store,
            type: 'trix',
            xField: 'date',
            yField: 'sigtrix',
            closeField: "close",
            period: config.period,
            signalPeriod: config.signalPeriod,
            // smooth: true,
            style: {
                stroke: 'rgba(255,102,102,0.75)',
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
