
Ext.define('Chartsly.series.indicator.AverageDirectionalIndex', {
    extend: 'Ext.chart.series.Cartesian',
    alias: 'series.adx',
    seriesType: 'lineSeries',  //sprite type for this series

    config: {
       
        /*
         * Data field containing the high value. Defaults to "high"
         */
        highField: "high",
        /*
         * Data field containing the low value. Defaults to "low"
         */
        lowField: "low",
        /*
         * Data field containing the close value. Defaults to "close"
         */
        closeField: "close",
        /*
         * Look-back period (in days) to calculate TR,+DI14,-DI14,+DM,-DM,DX,ADX. Defaults to 14 days
         */
        lookBackPeriod: 14
    },

    /*
     * Creats a ADX series
     * @param {Object} [config] Configuration
     * Caliculating all needful caliculation for ADX Chart series. 
     * All Caliculation related fields were created dynamically, has naming is combine with lookback period, TrueRange14(TR14)
       +DM,-DM,+DI14,-DI14,DX,ADX. 
     */
    constructor: function (config) {

        var me = this;

        var st = Ext.data.StoreManager.lookup(config.store);
   
        var recs = st.getRange();
        
        //fetching the high,low,close values into respective array from configured store
        var highs = Ext.Array.pluck(Ext.Array.pluck(recs, "data"), config.highField);
        var lows = Ext.Array.pluck(Ext.Array.pluck(recs, "data"), config.lowField);
        var closes = Ext.Array.pluck(Ext.Array.pluck(recs, "data"), config.closeField);
        
        var tmp_TR = [];tmp_PDM = [];tmp_NDM = [];
        tmp_DX = [];tmp_ADX = [];
        
        
        //lookbackperiod  
        var mlpPeriod = config.lookBackPeriod;
        var lpPeriod = config.lookBackPeriod - 1;
              
      // define new arrays for temporary True range with lookback period tmp_TR14 Plus Directional Movement with look back period , 
        eval('var tmp_TR'+mlpPeriod+'=[]');
        eval('var tmp_PDM'+mlpPeriod+'=[]'); eval('var tmp_PDI'+mlpPeriod+'=[]');eval('var tmp_DIDiff'+mlpPeriod+'=[]');
        eval('var tmp_NDM'+mlpPeriod+'=[]');eval('var tmp_NDI'+mlpPeriod+'=[]');eval('var tmp_DISum'+mlpPeriod+'=[]');
        


        st.each(function (item, index, length) {
          
           
         if (index == 0) {
             
                          
             tmp_TR.push(null);
             tmp_PDM.push(null);
             tmp_NDM.push(null); 
             tmp_DX.push(null);
             tmp_ADX.push(null);
             
                eval ('tmp_TR'+mlpPeriod+'.push(null)');            
                eval ('tmp_PDM'+mlpPeriod+'.push(null)'); 
                eval ('tmp_NDM'+mlpPeriod+'.push(null)');
              
                eval ('tmp_PDI'+mlpPeriod+'.push(null)');
                eval ('tmp_NDI'+mlpPeriod+'.push(null)');
                
                eval('tmp_DIDiff'+mlpPeriod+'.push(null)');
                eval('tmp_DISum'+mlpPeriod+'.push(null)');
                
                
           } 
        
  
 if (index != 0) {
           var TR = Ext.Array.max([highs[index]-lows[index],Math.abs(highs[index]-closes[index-1]),Math.abs(lows[index]-closes[index-1])]);
           item.data.TR = TR;
           tmp_TR.push(TR);
           
           var PDM =  (( highs[index]- highs[index-1]  >  lows[index-1]-lows[index]) ? Ext.Array.max([highs[index]- highs[index-1],0]) : 0);
           item.data.PDM = PDM;     
           tmp_PDM.push(PDM);     
               
           var NDM =  (( lows[index-1]-lows[index] > highs[index]- highs[index-1]  ) ? Ext.Array.max([lows[index-1]-lows[index],0]) : 0);
           item.data.NDM = NDM;
         
           tmp_NDM.push(NDM); 
  }     
         if (index <= mlpPeriod) {
                item["pctr"] = "";
             
            if(index!=0){ 
               tmp_DX.push(null);
               tmp_ADX.push(null);
                eval ('tmp_TR'+mlpPeriod+'.push(null)');            
                eval ('tmp_PDM'+mlpPeriod+'.push(null)'); 
                eval ('tmp_NDM'+mlpPeriod+'.push(null)');
              
                eval ('tmp_PDI'+mlpPeriod+'.push(null)');
                eval ('tmp_NDI'+mlpPeriod+'.push(null)');
                
                eval('tmp_DIDiff'+mlpPeriod+'.push(null)');
                eval('tmp_DISum'+mlpPeriod+'.push(null)');
             }   
                
               return;
            }
      
           if(index == mlpPeriod+1){
			
			
			eval('TR'+mlpPeriod+' = '+Ext.Array.sum(tmp_TR));  
		   	eval('item.data.TR'+mlpPeriod+' = '+eval('TR'+mlpPeriod)+'' );
			eval('tmp_TR'+mlpPeriod+'.push('+eval('TR'+mlpPeriod)+')' );
			
					 
			eval('var PDM'+mlpPeriod+' = '+Ext.Array.sum(tmp_PDM));   
		    eval('item.data.PDM'+mlpPeriod+' = '+eval('PDM'+mlpPeriod)+'');
		    eval('tmp_PDM'+mlpPeriod+'.push('+eval('PDM'+mlpPeriod)+')' );
			
		    eval('var NDM'+mlpPeriod+' = '+Ext.Array.sum(tmp_NDM));   
			eval('item.data.NDM'+mlpPeriod+' = '+eval('NDM'+mlpPeriod)+'' );	 
			eval('tmp_NDM'+mlpPeriod+'.push('+eval('NDM'+mlpPeriod)+')' );	 
			
			
		  	 
		   } else {

			eval('var TR'+mlpPeriod+' = '+ eval('tmp_TR'+mlpPeriod+'['+(index-1)+'] - '+'(tmp_TR'+mlpPeriod+'['+(index-1)+']/'+mlpPeriod+')+tmp_TR['+index+']'));  
		   	eval('item.data.TR'+mlpPeriod+' = '+eval('TR'+mlpPeriod) );  
		   	eval('tmp_TR'+mlpPeriod+'.push('+eval('TR'+mlpPeriod)+')' );
		   	
		   	
		   	eval('var PDM'+mlpPeriod+' = '+ eval('tmp_PDM'+mlpPeriod+'['+(index-1)+'] - '+'(tmp_PDM'+mlpPeriod+'['+(index-1)+']/'+mlpPeriod+')+tmp_PDM['+index+']')); 
		    eval('item.data.PDM'+mlpPeriod+' = '+eval('PDM'+mlpPeriod)+'');
		    eval('tmp_PDM'+mlpPeriod+'.push('+eval('PDM'+mlpPeriod)+')' );
			
		    eval('var NDM'+mlpPeriod+' = '+ eval('tmp_NDM'+mlpPeriod+'['+(index-1)+'] - '+'(tmp_NDM'+mlpPeriod+'['+(index-1)+']/'+mlpPeriod+')+tmp_NDM['+index+']')); 
			eval('item.data.NDM'+mlpPeriod+' = '+eval('NDM'+mlpPeriod)+'' );	 
			eval('tmp_NDM'+mlpPeriod+'.push('+eval('NDM'+mlpPeriod)+')' );	 
		   	
		   	
			
		   } 
		
		    eval('var PDI'+mlpPeriod+' = '+(100 * eval('tmp_PDM'+mlpPeriod+'['+(index)+']')/eval('tmp_TR'+mlpPeriod+'['+(index)+']')));   
			eval('item.data.PDI'+mlpPeriod+' = '+eval('PDI'+mlpPeriod)+'' );	 
			eval('tmp_PDI'+mlpPeriod+'.push('+eval('PDI'+mlpPeriod)+')' );	 
		
			
			eval('var NDI'+mlpPeriod+' = '+( 100 * eval('tmp_NDM'+mlpPeriod+'['+(index)+']')/eval('tmp_TR'+mlpPeriod+'['+(index)+']')));   
			eval('item.data.NDI'+mlpPeriod+' = '+eval('NDI'+mlpPeriod) );	 
			eval('tmp_NDI'+mlpPeriod+'.push('+eval('NDI'+mlpPeriod)+')' );	 
            
            eval('var DIDiff'+mlpPeriod+' = '+Math.abs(eval('tmp_PDI'+mlpPeriod+'['+(index)+']') - eval('tmp_NDI'+mlpPeriod+'['+(index)+']')));   
			eval('item.data.DIDiff'+mlpPeriod+' = '+eval('DIDiff'+mlpPeriod) );	 
			eval('tmp_DIDiff'+mlpPeriod+'.push('+eval('DIDiff'+mlpPeriod)+')' );	
            
            eval('var DISum'+mlpPeriod+' = '+Math.abs(eval('tmp_PDI'+mlpPeriod+'['+(index)+']') + eval('tmp_NDI'+mlpPeriod+'['+(index)+']')));   
			eval('item.data.DISum'+mlpPeriod+' = '+eval('DISum'+mlpPeriod) );	 
			eval('tmp_DISum'+mlpPeriod+'.push('+eval('DISum'+mlpPeriod)+')' );	
            
              
           var DX = 100 * eval('tmp_DIDiff'+mlpPeriod+'['+(index)+']')/eval('tmp_DISum'+mlpPeriod+'['+(index)+']') ;
           item.data.DX = DX;
           tmp_DX.push(DX);
           
           if(index > 2 * mlpPeriod) {
      
               if(index== 2 * mlpPeriod+1){
                  var ADX = Ext.Array.sum(tmp_DX)/mlpPeriod ;
                  item.data.ADX = ADX;
                  tmp_ADX.push(ADX);
               }else{
				
				  var ADX = ( (tmp_ADX[index-1] * lpPeriod)+ tmp_DX[index] )/ mlpPeriod ; 
				  item.data.ADX = ADX;
                  tmp_ADX.push(ADX);
			   }  
                  
                  
	       
	       }else{
			   tmp_ADX.push(null);
			   
		   }
          
             
      
        });

        this.callParent(arguments);
    },

   
});
