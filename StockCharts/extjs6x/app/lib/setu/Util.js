/**
 * This is a utility class for the "Chartsly" application
 */
Ext.define('Chartsly.lib.setu.Util', {
    singleton : true,
	 alias: 'util',
	 alternateClassName:'Util',
	 /**
	  * Finds the field in the model associated with store
	  *
	  *  @param {Ext.data.Store} Store used for series
	  *  @param {String} fieldName i.e. y-field for the series, which is used to check whether the store 
	  *							(associated model) has this field or not
	  *
	  *  @return {Boolean} `true` if the fieldsName exists else `false`
	  */
    isFieldPresent: function (store, fieldName) {
		
		 var fieldPresent = false;
		 
		 if(! Ext.isEmpty(store) && ! Ext.isEmpty(fieldName) ){
		 	
	 	  		var modelFieldsArray = store.getModel().getFields();
	 	  		var fieldNamesArray = Ext.Array.pluck(modelFieldsArray, "name");
	  
	 	 		fieldPresent =  Ext.Array.contains(fieldNamesArray,fieldName);
			
		 }
	  	
		 return fieldPresent;
    }

    
});
