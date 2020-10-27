({
    nextTab: function (component, event, helper) {
        component.set("v.setMessage", "");
        var firstStep = component.get("v.firstStep");
        var secondStep = component.get("v.secondStep");
        var thirdStep = component.get("v.thirdStep");
        console.log('firstStep = ', firstStep);
        console.log('secondStep = ', secondStep);
        console.log('thirdStep = ', thirdStep);
        var fourthStep = component.get("v.fourthStep");

        if (firstStep == true) {
            var firstName = component.find("firstName").get("v.value");
            console.log("firstName:::" + firstName);
            if (firstName == "" || firstName == null) {
                component.set("v.setMessage", "error");
            }
            if (component.get("v.setMessage") == "error") {
                component.set("v.secondStep", false);
                component.set("v.thirdStep", false);
                component.set("v.showError", true);
                component.set("v.fourthStep", false);
            } else {
                component.set("v.firstStep", false);
                component.set("v.secondStep", true);
                component.set("v.thirdStep", false);
                component.set("v.showError", false);
                component.set("v.fourthStep", false);
            }
        }

        if (secondStep == true) {
            var seriesPassport = component.find("seriesPassport").get("v.value");
            console.log("seriesPassport:::" + seriesPassport);
            if (seriesPassport == "" || seriesPassport == null) {
                component.set("v.setMessage", "error");
            }
            if (component.get("v.setMessage") == "error") {
                component.set("v.firstStep", false);
                component.set("v.thirdStep", false);
                component.set("v.showError", true);
                component.set("v.fourthStep", false);
            } else {
                component.set("v.firstStep", false);
                component.set("v.secondStep", false);
                component.set("v.thirdStep", true);
                component.set("v.showError", false);
                component.set("v.fourthStep", false);
            }
        }

        if (thirdStep == true) {
            var firstNameContact = component.find("firstNameContact").get("v.value");
            console.log("firstNameContact:::" + firstNameContact);
            if (
                firstNameContact == "" ||
                firstNameContact == null
            ) {
                component.set("v.setMessage", "error");
            }
            if (component.get("v.setMessage") == "error") {
                component.set("v.firstStep", false);
                component.set("v.secondStep", false);
                component.set("v.showError", true);
                component.set("v.fourthStep", false);
            } else {
                component.set("v.thirdStep", false);
                component.set("v.secondStep", false);
                component.set("v.firstStep", false);
                component.set("v.showError", false);
                component.set("v.fourthStep", true);
            }
        }
    },

    prevTab: function (component, event, helper) {
        var firstStep = component.get("v.firstStep");
        var secondStep = component.get("v.secondStep");
        var thirdStep = component.get("v.thirdStep");
        var fourthStep = component.get("v.fourthStep");
        console.log('firstStep prevTab= ', firstStep);
        console.log('secondStep prevTab= ', secondStep);
        console.log('thirdStep prevTab= ', thirdStep);

        if (secondStep == true) {
            component.set("v.firstStep", true);
            component.set("v.secondStep", false);
            component.set("v.thirdStep", false);
            component.set("v.showError", false);
            component.set("v.fourthStep", false);
        }
        if (thirdStep == true) {
            component.set("v.firstStep", false);
            component.set("v.secondStep", true);
            component.set("v.thirdStep", false);
            component.set("v.showError", false);
            component.set("v.fourthStep", false);
        }
        if (fourthStep == true) {
            component.set("v.firstStep", false);
            component.set("v.secondStep", false);
            component.set("v.thirdStep", true);
            component.set("v.showError", false);
            component.set("v.fourthStep", false);
        }
    },

    onSelectChange: function (component, event, helper) {
        var selected = component.find("StageName").get("v.value");
        component.set("v.OpportunityData.StageName", selected);
        console.log("opp::::" + JSON.stringify(selected));
    },

    saveRecord: function (component, event, helper) {
        helper.saveData(component, event, helper);
    },

    changeCreditTerm: function (cmp, event) {
        console.log(cmp.get("v.creditTerm"));
    },

    changeStatusMarriage: function(component, event, helper) {
		var changeValue = event.getParam("value");
		component.set("v.statusMarriageValue", changeValue);
        var statusMarriageValue = component.get("v.statusMarriageValue");
        console.log('statusMarr = ', statusMarriageValue);
    },
    
    changeStatusSocial: function(component, event, helper) {
        var changeValue = event.getParam("value");
        console.log('changeValue = ', changeValue); 
    },

    changeformBusiness: function(component, event, helper) {
        var changeValue = event.getParam("value");
        console.log('changeValue = ', changeValue); 
	},
});