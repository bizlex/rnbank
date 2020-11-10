({
    saveData : function(component, event, helper) {
        var action = component.get("c.save");
        action.setParams({
            caseData : component.get("v.caseData")
            });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "ERROR"){
                console.log('ERROR ttt ', response.getError()); 
                var er = response.getError();
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type": "error",
                    "message": er
                });                
            }
            if (component.isValid() && state === "SUCCESS"){
                var ret = response.getReturnValue();
                console.log('insert ok =', ret);
                component.set("v.caseData", ret);
                component.set("v.caseId", ret.Id);

            }
              
        });  
        $A.enqueueAction(action);
    },

    updateData : function(component, event, helper) {
        var action = component.get("c.updateCase");
        action.setParams({
            caseData : component.get("v.caseData"),
            caseId: component.get("v.caseId"),
            });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "ERROR"){
                console.log('ERROR ttt ', response.getError()); 
                var er = response.getError();
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type": "error",
                    "message": er
                });                
            }
            if (component.isValid() && state === "SUCCESS"){
                var ret = response.getReturnValue();
                console.log('update ok =', ret);
                // var navEvt = $A.get("e.force:navigateToSObject");
                // navEvt.setParams({
                //     "recordId": ret,
                //     "slideDevName": "detail"
                // });
                // navEvt.fire();
                
            }
              
        });  
        $A.enqueueAction(action);
    },

    getCase : function(component, event, helper) {
        console.log(' getCase = ');
        var action = component.get("c.getCaseById");
        action.setParams({
            caseId : component.get("v.caseId")
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "ERROR"){
                console.log('ERROR ttt ', response.getError()); 
                var er = response.getError();
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type": "error",
                    "message": er
                });                
            }
            if (component.isValid() && state === "SUCCESS"){
                var ret = response.getReturnValue();
                console.log('insert ok =', ret);
                component.set("v.caseData", ret[0]);
                component.set("v.caseId", ret[0].Id);

            }
              
        });  
        $A.enqueueAction(action);
    },

    getCarById: function(component, event, itemCar) {
        var action = component.get("c.getCarById");
        action.setParams({
            "query": itemCar
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "ERROR"){
                console.log('ERROR ttt ', response.getError()); 
                var er = response.getError();
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type": "error",
                    "message": er
                });                
            }
            if (component.isValid() && state === "SUCCESS"){
                var ret = response.getReturnValue();
                // console.log('ret', JSON.stringify(ret));
                component.set("v.carById", ret);
                var car = component.get("v.carById");
                console.log('car', car);
                component.set("v.caseData.Auto__c", car[0].Id);
                console.log('Auto__c', component.get("v.caseData.Auto__c"));
                component.set("v.caseData.Price__c", car[0].Price__c);
                console.log('Price__c', component.get("v.caseData.Price__c"));
                component.set("v.caseData.Subject", "Credit for " + car[0].Name);
                console.log('v.caseData.Subject', component.get("v.caseData.Subject"));
                var caseData = component.get("v.caseData");
                console.log("caseData:::", JSON.stringify(caseData));
            }
        });
        $A.enqueueAction(action); 

    },

    handleStep: function(component, event, handleStep) {
        var handleStep = component.get("v.handleStep");
        console.log('handleStep = ', handleStep);
        if (handleStep == 'secondStep') {
            component.set("v.firstStep", false);
            component.set("v.secondStep", true);
            component.set("v.thirdStep", false);
            component.set("v.fourthStep", false);
            component.set("v.isOpenedItem", true);
            component.set("v.isButtonDisabled", true);
            console.log('handleStep1 = ');

            console.log(' getCase = ');
            // this.getCase(component, event, helper);
            var action = component.get("c.getCaseById");
            action.setParams({
                caseId : component.get("v.caseId")
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "ERROR"){
                    console.log('ERROR ttt ', response.getError()); 
                    var er = response.getError();
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "type": "error",
                        "message": er
                    });                
                }
                if (component.isValid() && state === "SUCCESS"){
                    var ret = response.getReturnValue();
                    console.log('insert ok =', ret);
                    component.set("v.caseData", ret[0]);
                    component.set("v.caseId", ret[0].Id);
                    component.set("v.itemCar", ret[0].Auto__c);
                }
                
            });  
            $A.enqueueAction(action);

        } else if (handleStep == 'thirdStep') {
            component.set("v.firstStep", false);
            component.set("v.secondStep", false);
            component.set("v.thirdStep", true);
            component.set("v.fourthStep", false);
            component.set("v.isOpenedItem", true);
            component.set("v.isButtonDisabled", true);
            // this.getCase(component, event, helper);
            var action = component.get("c.getCaseById");
            action.setParams({
                caseId : component.get("v.caseId")
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "ERROR"){
                    console.log('ERROR ttt ', response.getError()); 
                    var er = response.getError();
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "type": "error",
                        "message": er
                    });                
                }
                if (component.isValid() && state === "SUCCESS"){
                    var ret = response.getReturnValue();
                    console.log('insert ok =', ret);
                    component.set("v.caseData", ret[0]);
                    component.set("v.caseId", ret[0].Id);
                    component.set("v.itemCar", ret[0].Auto__c);
                }
                
            });  
            $A.enqueueAction(action);
            

        } else if (handleStep == 'fourthStep') {
            component.set("v.firstStep", false);
            component.set("v.secondStep", false);
            component.set("v.thirdStep", false);
            component.set("v.fourthStep", true);
            component.set("v.isOpenedItem", true);
            component.set("v.isButtonDisabled", true);
            // this.getCase(component, event, helper);
            var action = component.get("c.getCaseById");
            action.setParams({
                caseId : component.get("v.caseId")
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "ERROR"){
                    console.log('ERROR ttt ', response.getError()); 
                    var er = response.getError();
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "type": "error",
                        "message": er
                    });                
                }
                if (component.isValid() && state === "SUCCESS"){
                    var ret = response.getReturnValue();
                    console.log('insert ok =', ret);
                    component.set("v.caseData", ret[0]);
                    component.set("v.caseId", ret[0].Id);
                    component.set("v.itemCar", ret[0].Auto__c);
                }
                
            });  
            $A.enqueueAction(action);
        }
    },

    

    
})