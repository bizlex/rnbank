({
    doInit : function(component, event, helper) {
        component.set("v.caseData.Term__c", 36);
    },
    
    jsLoaded: function(component, event, helper) {
        helper.getMask(component, event, helper);
    },
    
    nextTab: function (component, event, helper) {
        component.set("v.setMessage", "");
        var firstStep = component.get("v.firstStep");
        var secondStep = component.get("v.secondStep");
        var thirdStep = component.get("v.thirdStep");
        var fourthStep = component.get("v.fourthStep");
        console.log('firstStep = ', firstStep);
        console.log('secondStep = ', secondStep);
        console.log('thirdStep = ', thirdStep);
        console.log('fourthStep = ', fourthStep);
        

        if (firstStep == true) {
            var firstName = component.find("firstName").get("v.value");
            var middleName = component.find("middleName").get("v.value");
            var lastName = component.find("lastName").get("v.value");
            var mobilePhone = document.querySelector('.tel-mobile').value;
            var mobile = document.querySelector('.tel-mobile');
            component.set("v.caseData.Mobile_phone__c", mobilePhone);
            var email = component.find("email").get("v.value");
            var auto = component.get("v.caseData.Auto__c");
            var regExpEmailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            var regPhoneformat = /^\+[\d]{1}\ \([\d]{2,3}\)\ [\d]{2,3}-[\d]{2,3}-[\d]{2,3}$/;
            console.log("firstName:::", firstName);
            console.log("middleName:::", middleName);
            console.log("lastName:::", lastName);
            console.log("mobilePhone:::", mobilePhone);
            console.log("email:::", email);
            var caseData = component.get("v.caseData");
            console.log("caseData:::", JSON.stringify(caseData));

            if (firstName == "" || firstName == null || firstName == undefined &&
                middleName == "" || middleName == null || middleName == undefined &&
                lastName == "" || lastName == null || lastName == undefined &&
                mobilePhone == "" || mobilePhone == null || mobilePhone == undefined &&
                email == "" || email == null || email == undefined
            ) {
                component.set("v.setMessage", "error");
                
                if (mobilePhone == "" || mobilePhone == null || mobilePhone == undefined) {
                    mobile.classList.add('slds-has-error');
                } else {
                    mobile.classList.remove('slds-has-error');
                }
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type": "error",
                    "message": "Please enter correct data."
                });
                toastEvent.fire();
                event.stopPropagation();

                return;
            }

            if (mobilePhone.match(regPhoneformat)) {
                document.querySelector('.tel-mobile').classList.remove('slds-has-error');
                console.log('phone ok = ');
            
            } else {
                console.log('phone is bad');
                document.querySelector('.tel-mobile').classList.add('slds-has-error');
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type": "error",
                    "message": "Please enter correct Phone."
                });
                toastEvent.fire();
                event.stopPropagation();

                return;
            }
            
            if (email.match(regExpEmailformat)) {
                console.log('email ok = '); 
            } else {
                console.log('email is bad');
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type": "error",
                    "message": "Please enter correct Email."
                });
                toastEvent.fire();
                event.stopPropagation();

                return;
            }

            if (auto == "" || auto == null || auto == undefined) {
                console.log('auto is bad');
                // var testElements = document.getElementsByClassName('page-single-news__clients_item');
                // testElements.forEach((element) => {
                //     console.log(element);
                //   });
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type": "error",
                    "message": "Please choose the car."
                });
                toastEvent.fire();
                event.stopPropagation();

                return;
            } else {
                console.log('auto ok = ');
                
                // document.querySelectorAll('.page-single-news__clients_item').classList.remove('slds-has-error'); 
            }

            if (component.get("v.setMessage") == "error") {
                // var mobile = document.querySelector('.tel-mobile');
                // mobile.classList.add('slds-has-error');
                component.set("v.secondStep", false);
                component.set("v.thirdStep", false);
                component.set("v.showError", true);
                component.set("v.fourthStep", false);
            } else {
                // var mobile = document.querySelector('.tel-mobile');
                // mobile.classList.remove('slds-has-error');
                component.set("v.firstStep", false);
                component.set("v.secondStep", true);
                component.set("v.isButtonDisabled", true);
                component.set("v.thirdStep", false);
                component.set("v.showError", false);
                component.set("v.fourthStep", false);
            }
        }

        if (secondStep == true) {
            var seriesPassport = component.find("seriesPassport").get("v.value");
            var numberPassport = component.find("numberPassport").get("v.value");
            var dateOfIssue = component.find("dateOfIssue").get("v.value");
            var statusMarriage = component.find("statusMarriage").get("v.value");
            var dependentPersons = component.find("dependentPersons").get("v.value");
            var statusSocial = component.find("statusSocial").get("v.value");
            var region = component.find("region").get("v.value");
            var district = component.find("district").get("v.value");
            var city = component.find("city").get("v.value");
            var street = component.find("street").get("v.value");
            var flat = component.find("flat").get("v.value"); 
            var house = component.find("house").get("v.value"); 
            var regSeriesFormat = /^\d{4}$/;
            var regNumPassFormat = /^\d{6}$/;
            var dependentPersonsFormat = /^\d{1,2}$/;
            console.log("seriesPassport:::", seriesPassport);
            console.log("region:::", region);
            console.log("numberPassport:::", numberPassport);
            console.log("dateOfIssue:::", dateOfIssue);
            console.log("statusMarriage:::", statusMarriage);
            var caseData = component.get("v.caseData");
            console.log("caseData:::", JSON.stringify(caseData));

            if (seriesPassport == "" || seriesPassport == null || seriesPassport === undefined &&
                numberPassport == "" || numberPassport == null || numberPassport === undefined &&
                dateOfIssue == "" || dateOfIssue == null || dateOfIssue === undefined &&
                statusMarriage == "" || statusMarriage == null || statusMarriage === undefined &&
                dependentPersons == "" || dependentPersons == null || dependentPersons === undefined &&
                statusSocial == "" || statusSocial == null || statusSocial === undefined &&
                region == "" || region == null || region === undefined &&
                district == "" || district == null || district === undefined &&
                city == "" || city == null || city === undefined &&
                street == "" || street == null || street === undefined &&
                house == "" || house == null || house === undefined &&
                flat == "" || flat == null || flat === undefined
            ) {
                component.set("v.setMessage", "error");
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type": "error",
                    "message": "Please enter correct data."
                });
                toastEvent.fire();
                event.stopPropagation();

                return;
                
            }
            
            if (seriesPassport.match(regSeriesFormat)) {
                console.log('seriesPassport ok = '); 
            } else {
                console.log('seriesPassport is bad');
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type": "error",
                    "message": "Please enter correct Series Passport."
                });
                toastEvent.fire();
                event.stopPropagation();

                return;
            }

            if (numberPassport.match(regNumPassFormat)) {
                console.log('numberPassport ok = '); 
            } else {
                console.log('numberPassport is bad');
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type": "error",
                    "message": "Please enter correct Number Passport."
                });
                toastEvent.fire();
                event.stopPropagation();

                return;
            }

            if (dependentPersons.match(dependentPersonsFormat)) {
                console.log('dependentPersons ok = '); 
            } else {
                console.log('dependentPersons is bad');
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type": "error",
                    "message": "Please enter correct Dependent Persons."
                });
                toastEvent.fire();
                event.stopPropagation();

                return;
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
                component.set("v.fourthStep", false);
                component.set("v.fourthStep", false);
                component.set("v.caseData.Region__c", region);
                component.set("v.caseData.District__c", district);
                component.set("v.caseData.City__c", city);
                component.set("v.caseData.Street__c", street);
                var caseData = component.get("v.caseData");
                console.log("caseData:::", JSON.stringify(caseData));
            }
        }

        if (thirdStep == true) {
            helper.getMask(component, event, helper);
            var firstNameContact = component.find("firstNameContact").get("v.value");
            var middleNameContact = component.find("middleNameContact").get("v.value");
            var lastNameContact = component.find("lastNameContact").get("v.value");
            var mobilePhoneContact = component.find("mobilePhoneContact").get("v.value");
            var dateOfBirth = component.find("dateOfBirth").get("v.value");
            var relationToApplicant = component.find("relationToApplicant").get("v.value");
            var regPhoneformat = /^\+[\d]{1}\ \([\d]{2,3}\)\ [\d]{2,3}-[\d]{2,3}-[\d]{2,3}$/;
            var caseData = component.get("v.caseData");
            console.log("caseData:::", JSON.stringify(caseData));

            if (firstNameContact == "" || firstNameContact == null || firstNameContact == undefined &&
                middleNameContact == "" || middleNameContact == null || middleNameContact == undefined &&
                lastNameContact == "" || lastNameContact == null || lastNameContact == undefined &&
                mobilePhoneContact == "" || mobilePhoneContact == null || mobilePhoneContact == undefined &&
                relationToApplicant == "" || relationToApplicant == null || relationToApplicant == undefined &&
                dateOfBirth == "" || dateOfBirth == null || dateOfBirth == undefined
            ) {
                component.set("v.setMessage", "error");
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type": "error",
                    "message": "Please enter correct data."
                });
                toastEvent.fire();
                event.stopPropagation();

                return;
            }

            if (mobilePhoneContact.match(regPhoneformat)) {
                console.log('phone ok = '); 
            } else {
                console.log('phone is bad');
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type": "error",
                    "message": "Please enter correct Phone."
                });
                toastEvent.fire();
                event.stopPropagation();

                return;
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

        if (fourthStep == true) {
            var legalEntityType = component.find("legalEntityType").get("v.value");
            var employerName = component.find("employerName").get("v.value");
            var iin = component.find("iin").get("v.value");
            var regionEmployer = component.find("regionEmployer").get("v.value");
            var districtEmployer = component.find("districtEmployer").get("v.value");
            var cityEmployer = component.find("cityEmployer").get("v.value");
            var streetEmployer = component.find("streetEmployer").get("v.value");
            var houseEmployer = component.find("houseEmployer").get("v.value");
            var officeEmployer = component.find("officeEmployer").get("v.value");
            var position = component.find("position").get("v.value");
            var hireDate = component.find("hireDate").get("v.value");
            var totalWorkExperience = component.find("totalWorkExperience").get("v.value");
            var primaryEmploymentIncome = component.find("primaryEmploymentIncome").get("v.value");
            var dateSalary = component.find("dateSalary").get("v.value");
            
            var caseData = component.get("v.caseData");
            console.log("caseData:::", JSON.stringify(caseData));

            if (legalEntityType == "" || legalEntityType == null || legalEntityType == undefined &&
                regionEmployer == "" || regionEmployer == null || regionEmployer === undefined &&
                employerName == "" || employerName == null || employerName === undefined &&
                iin == "" || iin == null || iin === undefined &&
                districtEmployer == "" || districtEmployer == null || districtEmployer === undefined &&
                cityEmployer == "" || cityEmployer == null || cityEmployer === undefined &&
                streetEmployer == "" || streetEmployer == null || streetEmployer === undefined &&
                houseEmployer == "" || houseEmployer == null || houseEmployer === undefined &&
                officeEmployer == "" || officeEmployer == null || officeEmployer === undefined &&
                position == "" || position == null || position === undefined &&
                hireDate == "" || hireDate == null || hireDate === undefined &&
                totalWorkExperience == "" || totalWorkExperience == null || totalWorkExperience === undefined &&
                primaryEmploymentIncome == "" || primaryEmploymentIncome == null || primaryEmploymentIncome === undefined &&
                dateSalary == "" || dateSalary == null || dateSalary === undefined
            ) {
                component.set("v.setMessage", "error");
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type": "error",
                    "message": "Please enter correct data."
                });
                toastEvent.fire();
                event.stopPropagation();

                return;
            }
            
            if (component.get("v.setMessage") == "error") {
                component.set("v.firstStep", false);
                component.set("v.secondStep", false);
                component.set("v.showError", true);
                component.set("v.fourthStep", false);
                component.set("v.fifthStep", false);
            } else {
                component.set("v.thirdStep", false);
                component.set("v.secondStep", false);
                component.set("v.firstStep", false);
                component.set("v.showError", false);
                component.set("v.fourthStep", false);
                component.set("v.caseData.RegionEmployer__c", regionEmployer);
                component.set("v.caseData.DistrictEmployer__c", districtEmployer);
                component.set("v.caseData.CityEmployer__c", cityEmployer);
                component.set("v.caseData.StreetEmployer__c", streetEmployer);
                component.set("v.caseData.Employer_Name__c", employerName);
                var caseData = component.get("v.caseData");
                console.log("caseData:::", JSON.stringify(caseData));
                console.log('DELAY = ');
                component.set("v.spinner", true);
                console.log('DELAY1 = ');
                window.setTimeout(
                    $A.getCallback(function() {
                        component.set("v.spinner", false);
                        component.set("v.fifthStep", true);

                    }), 15000
                );
            }
        }
    },

    prevTab: function (component, event, helper) {
        var firstStep = component.get("v.firstStep");
        var secondStep = component.get("v.secondStep");
        var thirdStep = component.get("v.thirdStep");
        var fourthStep = component.get("v.fourthStep");
        var fifthStep = component.get("v.fifthStep");
        console.log('firstStep prevTab= ', firstStep);
        console.log('secondStep prevTab= ', secondStep);
        console.log('thirdStep', thirdStep);
        console.log('fourthStep', fourthStep);
        console.log('fifthStep', fifthStep);

        if (secondStep == true) {
            component.set("v.firstStep", true);
            component.set("v.isButtonDisabled", false);
            component.set("v.secondStep", false);
            component.set("v.thirdStep", false);
            component.set("v.showError", false);
            component.set("v.fourthStep", false);
            component.set("v.fifthStep", false);
        }
        if (thirdStep == true) {
            component.set("v.firstStep", false);
            component.set("v.secondStep", true);
            component.set("v.thirdStep", false);
            component.set("v.showError", false);
            component.set("v.fourthStep", false);
            component.set("v.fifthStep", false);
        }
        if (fourthStep == true) {
            component.set("v.firstStep", false);
            component.set("v.secondStep", false);
            component.set("v.thirdStep", true);
            component.set("v.showError", false);
            component.set("v.fourthStep", false);
            component.set("v.fifthStep", false);
        }
        if (fifthStep == true) {
            component.set("v.firstStep", false);
            component.set("v.secondStep", false);
            component.set("v.thirdStep", false);
            component.set("v.showError", false);
            component.set("v.fourthStep", true);
            component.set("v.fifthStep", false);
        }
    },

    saveRecord: function (component, event, helper) {
        console.log('changeValue = ');
        
        // component.set("v.isButtonDisabled", true);
        var selectedProduct = component.get("v.selectedProduct");

        
        console.log('changeValue2 = ');

        if (selectedProduct == "" || selectedProduct == null || selectedProduct == undefined ) {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "type": "error",
                "message": "Please choose one of the products."
            });
            toastEvent.fire();
            event.stopPropagation();

            return;
        } else {
            component.set("v.caseData.ProductId", selectedProduct);
            var caseData = component.get("v.caseData");
            console.log("caseData:::", JSON.stringify(caseData));
        }

        helper.saveData(component, event, helper);
    },

    changeCreditTerm: function (cmp, event) {
        console.log(cmp.get("v.caseData.Term__c"));
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

    changeLegalEntityType: function(component, event, helper) {
        var changeValue = event.getParam("value");
        console.log('changeValue = ', changeValue); 
    },
    
    changeRelationToApplicant: function(component, event, helper) {
        var changeValue = event.getParam("value");
        console.log('changeValue = ', changeValue); 
    },
    
    changeAddress: function(component, event, helper) {
        var changeValue = event.getParam("value");
        console.log('changeValue = ', changeValue);
    },

    changeINN: function(component, event, helper) {
        var changeValue = event.getParam("value");
        console.log('changeValue = ', changeValue);
        helper.getINN(component, event, changeValue);
    },

    selectBrand: function(component, event, helper) {
        console.log('click');
        var rectype, recTypeId;
        rectype = event.currentTarget;
        recTypeId =  rectype.getAttribute("title");
        console.log('recTypeId', recTypeId);
        component.set("v.brandCars", recTypeId);

        if (component.get("v.listCars") == false) {
            component.set("v.listCars", true);
        } else {
            component.set("v.listCars", false);
            component.set("v.listCars", true);
            component.set("v.listCars", false);
        } 
    },

    handleComponentEvent: function(component, event, helper) {
        var childEvent = event.getParam("idByEvent");
        component.set("v.itemCar", childEvent);
        var itemCar = component.get("v.itemCar");
        helper.getCarById(component, event, itemCar);
        component.set("v.listCars", false);
        component.set("v.isOpenedItem", true);
        component.set("v.listBrands", false);
        var caseData = component.get("v.caseData");
        console.log("caseData:::", JSON.stringify(caseData));
    },

    handleLookupInnEvent: function(component, event, helper) {
        console.log("event:::");
        var childEvent = event.getParam("dataInn");
        console.log("childEvent", JSON.stringify(childEvent));
        console.log("childEvent", childEvent.value);
        console.log("childEvent", childEvent.address);

        component.set("v.dataFromLookupInn", childEvent);
        var gettedData = component.get("v.dataFromLookupInn");
        console.log("v.dataFromLookupInn", gettedData);


       
    },

    closeCard: function(component, event, helper) {
        component.set("v.isOpenedItem", false);
        component.set("v.listBrands", true);
        component.set("v.itemCar", "");
        component.set("v.caseData.Auto__c", "");
        console.log('Auto__c closeCard ', component.get("v.caseData.Auto__c"));
        component.set("v.caseData.Price__c", "");
        console.log('Price__c closeCard ', component.get("v.caseData.Price__c"));
        var caseData = component.get("v.caseData");
        console.log("caseData:::", JSON.stringify(caseData));
    },

    changeProduct : function(component, event, helper) {
        // var selectedProductChecked = event.target.checked;
        // console.log('selectedProductChecked', selectedProductChecked);
        var selectedProductId = event.target.value;
        console.log('selectedProductValue', selectedProductId);
        component.set("v.selectedProduct", selectedProductId);
        if (selectedProductId == '01t5r000000FPSYAA4') {
            component.set("v.caseData.Credit_amount__c", 2538000);
        } else if (selectedProductId == '01t5r000000FPSdAAO') {
            component.set("v.caseData.Credit_amount__c", 2227000);
        } else if (selectedProductId == '01t5r000000FPSiAAO') {
            component.set("v.caseData.Credit_amount__c", 1449500);
        } else {
            console.log('selectedProductChecked');
        }

	},


    
});