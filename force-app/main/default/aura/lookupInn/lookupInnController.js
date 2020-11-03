({
    // To prepopulate the seleted value pill if value attribute is filled
    doInit : function( component, event, helper ) {
        $A.util.toggleClass(component.find('resultsDiv'),'slds-is-open');
        if( !$A.util.isEmpty(component.get('v.value')) ) {
            console.log('v.value', component.get('v.value'));
            helper.searchRecordsHelper(component, event, helper, component.get('v.value'));
        }
    },

    // When a keyword is entered in search box
    searchRecords : function( component, event, helper ) {
        if( !$A.util.isEmpty(component.get('v.value')) ) {
            console.log('v.value2', component.get('v.value'));
            helper.searchRecordsHelper( component, event, helper, '' );
        } else {
            $A.util.removeClass(component.find('resultsDiv'),'slds-is-open');
        }
    },

    // When an item is selected
    selectItem : function( component, event, helper ) {
        if(!$A.util.isEmpty(event.currentTarget.id)) {
            var recordsList = component.get('v.recordsList');
            var index = recordsList.findIndex(x => x.value === event.currentTarget.id)
            if(index != -1) {
                var selectedRecord = recordsList[index];
            }
            // var selectedInn = component.get("v.selectedInn");
            component.set('v.searchString',selectedRecord.label);
            component.set('v.selectedInn',selectedRecord);
            var selectedInn = component.get("v.selectedInn");
            console.log('v.selectedInn typeof ', typeof(selectedInn));
            console.log('v.selectedInn  ', selectedInn);
        
            console.log('v.searchString', selectedRecord.label);
            var lookupInnEvent = component.getEvent("lookupInnEvent");
            lookupInnEvent.setParams({
                "dataInn" : selectedInn
            });
            lookupInnEvent.fire();
            // component.set('v.value',selectedRecord.value);
            // console.log('v.value', selectedRecord.value);
            $A.util.removeClass(component.find('resultsDiv'),'slds-is-open');
        }
    },
    
    showRecords : function( component, event, helper ) {
        if(!$A.util.isEmpty(component.get('v.recordsList')) && !$A.util.isEmpty(component.get('v.searchString'))) {
            $A.util.addClass(component.find('resultsDiv'),'slds-is-open');
        }
    },

    // To remove the selected item.
    removeItem : function( component, event, helper ){
        component.set('v.selectedRecord','');
        component.set('v.value','');
        component.set('v.searchString','');
        setTimeout( function() {
            component.find( 'inputLookup' ).focus();
        }, 250);
    },

    // To close the dropdown if clicked outside the dropdown.
    blurEvent : function( component, event, helper ){
        $A.util.removeClass(component.find('resultsDiv'),'slds-is-open');
    },
})