Ext.define('Chartsly.chart.indicator.AverageDirectionalIndex',{
   extend: 'Ext.chart.CartesianChart',
   requires: ['Chartsly.series.indicator.AverageDirectionalIndex'],
   xtype:'adxchart',
   
   initConfig: function(config) {

       var series = config.series[0];
 
       var clpperiod = series.lookBackPeriod; 

       var clpperiod =""; 

        Ext.Array.each(config.axes, function(axis, index, recs) {
            if (axis.type === 'numeric') {
				
                Ext.apply(axis, {
                    fields: ['adx']
                });
            }
        });
        
        config.series.push({
            store: config.series[0].store,
            type: 'adx',
            xField: config.series[0].xField,
            yField: 'pdiperiod',
            closeField: config.series[0].closeField,
            lookBackPeriod: 14,  //in days
            style: {
                stroke: 'green',
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
        
       config.series.push({
            store: config.series[0].store,
            type: 'adx',
            xField: config.series[0].xField,
            yField: 'ndiperiod',
            closeField: config.series[0].closeField,
            lookBackPeriod: 14,  //in days
            style: {
                stroke: 'red',
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
