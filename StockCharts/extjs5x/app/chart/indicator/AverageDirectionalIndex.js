Ext.define('Chartsly.chart.indicator.AverageDirectionalIndex',{
   extend: 'Ext.chart.CartesianChart',
   requires: ['Chartsly.series.indicator.AverageDirectionalIndex'],
   xtype:'ADXChart',
   
   initConfig: function(config) {

       var series = config.series[0];
 
       var clpperiod = series.lookBackPeriod; 

        Ext.Array.each(config.axes, function(axis, index, recs) {
            if (axis.type === 'numeric') {
				
                Ext.apply(axis, {
                    fields: ['ADX','PDI'+clpperiod+'','NDI'+clpperiod+''],
                   
                });
            }
        });
        
        config.series.push({
            store: config.series[0].store,
            type: 'adx',
            xField: config.series[0].xField,
            yField: 'PDI'+clpperiod+'',
            closeField: config.series[0].closeField,
           
            smooth: true,
            style: {
                stroke: 'green',
                miterLimit: 1
            }
        });
        
       config.series.push({
            store: config.series[0].store,
            type: 'adx',
            xField: config.series[0].xField,
            yField: 'NDI'+clpperiod+'',
            closeField: config.series[0].closeField,
            
            smooth: true,
            style: {
                stroke: 'red',
                miterLimit: 1
            }
        });

        this.callParent(arguments);
    }
});
