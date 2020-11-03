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
                console.log('ret', ret);
                var navEvt = $A.get("e.force:navigateToSObject");
                navEvt.setParams({
                    "recordId": ret,
                    "slideDevName": "detail"
                });
                navEvt.fire();
                
            }
            //     var message = response.getReturnValue();
            //     console.log("message>>>>>>>>" +JSON.stringify(message));
            //     component.set("v.message", message);
            // if(message == 'record successfully insert') {
            //     document.getElementById("showErrorrTractConfig").style.display = "none";
            //     document.getElementById("showMessageTractConfig").style.display = "block";
            // }else{
            //     document.getElementById("showMessageTractConfig").style.display = "none";
            //     document.getElementById("showErrorrTractConfig").style.display = "block";
            // }    
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
                var caseData = component.get("v.caseData");
                console.log("caseData:::", JSON.stringify(caseData));
            }
        });
        $A.enqueueAction(action); 

    },

    getMask : function(component, event, helper) {
        var input = document.querySelector('.tel-mobile');
        var inputSecond = document.querySelector('.tel-mobile-contact');
        $(function(){
            $(input).mask("+7 (999) 999-99-99");
            $(inputSecond).mask("+7 (999) 999-99-99");
        });
    },

    getINN: function(component, event, changeValue) {
        var action = component.get("c.searchDadataInn");
        action.setParams({
            item : changeValue
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
                console.log('ret', ret);
                component.set("v.employerName", ret.opf + " " + ret.name);
                
            }
              
        });  
        $A.enqueueAction(action);
    },
})