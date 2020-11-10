({
    doInit : function (component, event, helper) {
        helper.getCases(component, event, helper);
    },

    
    handleSelect: function(component, event, helper) { 
        console.log('handleSelect');
        var eventButton = event.getSource().get("v.name");
        console.log('eventButton = ', eventButton);
        var eventStep = event.getSource().get("v.alternativeText");
        console.log('eventStep = ', eventStep);

        component.set("v.chosenCase", eventButton);
        console.log('v.chosenCase =', component.get("v.chosenCase"));
        if (eventStep == 'Filling data. Step 1') {
            component.set("v.stepNumber", 'secondStep');
        } else if (eventStep == 'Filling data. Step 2') {
            component.set("v.stepNumber", 'thirdStep');
        } else if (eventStep == 'Filling data. Step 3') {
            component.set("v.stepNumber", 'fourthStep');
        }

        component.set("v.isSelect", true);
        component.set("v.isOpen", false);
       
    },
   
})