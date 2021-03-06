({
	searchRecordsHelper : function(component, event, helper, value) {
		$A.util.removeClass(component.find("Spinner"), "slds-hide");
        var value2 = component.get('v.value'),
            boundFrom = component.get('v.boundFrom'),
            boundTo = component.get('v.boundTo');
        component.set('v.message', '');
        component.set('v.recordsList', []);
        
		// Calling Apex Method
        var action = component.get('c.searchDadata');
        action.setParams({
            'item' : value2,
            'boundFrom' : boundFrom,
            'boundTo' : boundTo
        });
        action.setCallback(this,function(response){
            var result = response.getReturnValue();
            
        	if(response.getState() === 'SUCCESS') {
    			if(result.length > 0) {
    				// To check if value attribute is prepopulated or not
					if( $A.util.isEmpty(value) ) {
                        component.set('v.recordsList',result);
                        console.log('v.recordsList', result);        
					} else {
                        component.set('v.selectedRecord', result[0]);
                        console.log('v.selectedRecord', result[0]);

					}
    			} else {
    				component.set('v.message', "No Records Found for '" + value + "'");
    			}
        	} else {
                // If server throws any error
                var errors = response.getError();
                if (errors && errors[0] && errors[0].message) {
                    console.log('errors[0].message', errors[0].message);
                    //component.set('v.message', errors[0].message);
                }
            }
            // To open the drop down list of records
            if( $A.util.isEmpty(value) )
                $A.util.addClass(component.find('resultsDiv'),'slds-is-open');
        	$A.util.addClass(component.find("Spinner"), "slds-hide");
        });
        $A.enqueueAction(action);
	}
})