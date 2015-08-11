
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
        
        var tmp_Tr = [];tmp_Pdm = [];tmp_Ndm = [];
        tmp_Dx = [];tmp_Adx = [];
    
        //lookbackperiod  
        var mlpPeriod = config.lookBackPeriod; 
      
        var lpPeriod = config.lookBackPeriod - 1;
              
     
       // temporary variable for calculating the +DI , - DI and adx and their dependency calculations 
        
        var tmp_TrPeriod=[]; 
        var tmp_PdmPeriod=[]; var tmp_PdiPeriod=[];var tmp_DiDiffPeriod=[];
        var tmp_NdmPeriod=[];var tmp_NdiPeriod=[]; var tmp_DiSumPeriod=[];
        
       


        st.each(function (item, index, length) {
         
         if(config.yField!='adx'){
			 return false;
			 }
           
         if (index == 0) {
             
                          
             tmp_Tr.push(null);
             tmp_Pdm.push(null);
             tmp_Ndm.push(null); 
           
             tmp_Dx.push(null);
             tmp_Adx.push(null);
          
             tmp_TrPeriod.push(null);
              
             tmp_PdmPeriod.push(null);
             tmp_PdiPeriod.push(null);
             
             tmp_NdmPeriod.push(null); 
             tmp_NdiPeriod.push(null);
             
             tmp_DiDiffPeriod.push(null);
             tmp_DiSumPeriod.push(null);
        
                
                
                
           } 
       
  
 if (index != 0) {
           var tr = Ext.Array.max([highs[index]-lows[index],Math.abs(highs[index]-closes[index-1]),Math.abs(lows[index]-closes[index-1])]);
           item.data.tr = tr;
           tmp_Tr.push(tr);
           
           var pdm =  (( highs[index]- highs[index-1]  >  lows[index-1]-lows[index]) ? Ext.Array.max([highs[index]- highs[index-1],0]) : 0);
           item.data.pdm = pdm;     
           tmp_Pdm.push(pdm);     
               
           var ndm =  (( lows[index-1]-lows[index] > highs[index]- highs[index-1]  ) ? Ext.Array.max([lows[index-1]-lows[index],0]) : 0);
           item.data.ndm = ndm;
         
           tmp_Ndm.push(ndm); 
  }    

         if (index <= mlpPeriod) {
            
             
            if(index!=0){ 
               tmp_Dx.push(null);
               tmp_Adx.push(null);
               
             tmp_TrPeriod.push(null);
              
             tmp_PdmPeriod.push(null);
             tmp_PdiPeriod.push(null);
             
             tmp_NdmPeriod.push(null); 
             tmp_NdiPeriod.push(null);
                
             tmp_DiDiffPeriod.push(null);
             tmp_DiSumPeriod.push(null);
        
             }   
                
               return;
            }
       
           if(index == mlpPeriod+1 ){
			
			
			var trPeriod = Ext.Array.sum(tmp_Tr);  
		   	item.data.trperiod = trPeriod;
			tmp_TrPeriod.push(trPeriod);
			
					 
			var pdmPeriod = Ext.Array.sum(tmp_Pdm);   
		    item.data.pdmperiod = pdmPeriod;
		    tmp_PdmPeriod.push(pdmPeriod);
			
		    var ndmPeriod = Ext.Array.sum(tmp_Ndm);   
		    item.data.ndmperiod = ndmPeriod;
		    tmp_NdmPeriod.push(ndmPeriod); 
			
			
		  	 
		   } else {

			var trPeriod = tmp_TrPeriod[(index-1)] - (tmp_TrPeriod[(index-1)]/(lpPeriod+1))+ tmp_Tr[index] ;  
	    	item.data.trperiod = trPeriod;
			tmp_TrPeriod.push(trPeriod);
		   	
		   	
		   	
		    
		    var pdmPeriod = ( tmp_PdmPeriod[(index-1)] - (tmp_PdmPeriod[(index-1)]/mlpPeriod) +tmp_Pdm[index] ); 
		    item.data.pdmperiod = pdmPeriod;
		    tmp_PdmPeriod.push(pdmPeriod);
			
		 
		     var ndmPeriod = ( tmp_NdmPeriod[(index-1)] - (tmp_NdmPeriod[(index-1)]/mlpPeriod) +tmp_Ndm[index] );  	
		   	 item.data.ndmperiod = ndmPeriod;
		     tmp_NdmPeriod.push(ndmPeriod); 
		   	
			
		   } 
		
			var pdiPeriod  =  (100 * tmp_PdmPeriod[index])/tmp_TrPeriod[index];   
			item.data.pdiperiod  = pdiPeriod;	 
			tmp_PdiPeriod.push(pdiPeriod);	 
		
		
	
			var ndiPeriod  =  (100 * tmp_NdmPeriod[index])/tmp_TrPeriod[index];   
			item.data.ndiperiod  = ndiPeriod;	 
			tmp_NdiPeriod.push(ndiPeriod);	 
			
			
       
      		
            var diDiffPeriod = Math.abs( tmp_PdiPeriod[index] - tmp_NdiPeriod[index]);   
			item.data.didiffperiod = diDiffPeriod;	 
			tmp_DiDiffPeriod.push(diDiffPeriod);	
            
        	
            var diSumPeriod = Math.abs( tmp_PdiPeriod[index] + tmp_NdiPeriod[index] );   
			
			item.data.disumperiod = diSumPeriod;	 
			tmp_DiSumPeriod.push(diSumPeriod);	
			
		     	
            
              
           var dx = 100 * ( tmp_DiDiffPeriod[index]/ tmp_DiSumPeriod[index] ) ;
           item.data.dx = dx;
           tmp_Dx.push(dx);
           
           if(index > 2 * lpPeriod+1) {
      
               if(index== 2 * lpPeriod+2){
                  var adx = Ext.Array.sum(tmp_Dx)/mlpPeriod;
                  item.data.adx = adx;
                  tmp_Adx.push(adx);
               }else{
				
				  var adx = ((tmp_Adx[index-1] * lpPeriod)+ tmp_Dx[index])/(lpPeriod+1) ; 
				  item.data.adx = adx;
                  tmp_Adx.push(adx);
			   }  
            
             
         
	      
	       }else{
			   tmp_Adx.push(null);
			   
		   }
          
          
      
        }); 
      
        this.callParent(arguments);
    }   
   
});
