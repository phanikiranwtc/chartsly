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
            }
        });

        this.callParent(arguments);
    }
});
