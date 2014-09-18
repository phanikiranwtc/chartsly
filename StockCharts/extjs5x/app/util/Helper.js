/**
 * This class is helper class for the "Chartsly" application.
 *
 */
Ext.define('Chartsly.util.Helper', {
    singleton : true,
	 alias: 'helper',
	 alternateClassName:'Helper',
	 /**
	  *  @param {Ext.data.Store} Store used for series
	  *  @param fieldName	y-field for the series, which is used to check whether the store 
	  *							(associated model) has this field or not
	  */
    checkForFieldPresence: function (store, fieldName) {
		
		 var fieldPresent = false;
		 
		 if(! Ext.isEmpty(store) && ! Ext.isEmpty(fieldName) ){
		 	
	 	  		var modelFieldsArray = store.getModel().getFields();
	 	  		var fieldNamesArray = Ext.Array.pluck(modelFieldsArray, "name");
	  
	 	 		fieldPresent =  Ext.Array.contains(fieldNamesArray,fieldName);
			
		 }
	  	
		 return fieldPresent;
    }

    
});
