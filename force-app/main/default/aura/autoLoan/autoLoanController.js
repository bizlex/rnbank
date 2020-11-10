({
    doInit : function(component, event, helper) {
        helper.handleStep(component, event, helper, component.get("v.handleStep"));
        component.set("v.caseData.Term__c", 36);
    },
    
    jsLoaded: function(component, event, helper) {
        console.log('getMask');
        component.set("v.isJqueryLoaded",true);
        component.set("v.needToProcessReRenderLogic",true);
        var input = document.querySelector('.tel-mobile');
        $(function(){
            $(input).mask("+7 (999) 999-99-99");
        });
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

            if (firstName == "" || firstName == null || firstName == undefined || firstName.length === 0 || !firstName.trim() &&
                middleName == "" || middleName == null || middleName == undefined || middleName.length === 0 || !middleName.trim() &&
                lastName == "" || lastName == null || lastName == undefined || lastName.length === 0 || !lastName.trim() &&
                mobilePhone == "" || mobilePhone == null || mobilePhone == undefined || mobilePhone.length === 0 || !mobilePhone.trim() &&
                email == "" || email == null || email == undefined || email.length === 0 || !email.trim()
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
                component.set("v.caseData.Stage_Step__c", "Filling data. Step 1");
                component.set("v.secondStep", true);
                component.set("v.isButtonDisabled", true);
                component.set("v.thirdStep", false);
                component.set("v.showError", false);
                component.set("v.fourthStep", false);
                var caseData = component.get("v.caseData");
                console.log("caseData:::", JSON.stringify(caseData));
                helper.saveData(component, event, helper);
                var recordId = component.get("v.recordId");
                console.log('recordId = ', recordId);
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
            console.log("district:::", district);
            console.log("city:::", city);
            console.log("street:::", street);
            console.log("house:::", house);
            console.log("numberPassport:::", numberPassport);
            console.log("dateOfIssue:::", dateOfIssue);
            console.log("statusMarriage:::", statusMarriage);
            var caseData = component.get("v.caseData");
            console.log("caseData:::", JSON.stringify(caseData));

            if (seriesPassport == "" || seriesPassport == null || seriesPassport === undefined || seriesPassport.length === 0 || !seriesPassport.trim() &&
                numberPassport == "" || numberPassport == null || numberPassport === undefined || numberPassport.length === 0 || !numberPassport.trim() &&
                dateOfIssue == "" || dateOfIssue == null || dateOfIssue === undefined || dateOfIssue.length === 0 || !dateOfIssue.trim() &&
                statusMarriage == "" || statusMarriage == null || statusMarriage === undefined || statusMarriage.length === 0 || !statusMarriage.trim() &&
                dependentPersons == "" || dependentPersons == null || dependentPersons === undefined || dependentPersons.length === 0 || !dependentPersons.trim() &&
                statusSocial == "" || statusSocial == null || statusSocial === undefined || statusSocial.length === 0 || !statusSocial.trim() &&
                region === "" || region === null || region === undefined || region.length === 0 || !region.trim() &&
                city == "" || city == null || city == undefined || city.length === 0 || !city.trim() &&
                street == "" || street == null || street === undefined || street.length === 0 || !street.trim() &&
                house == "" || house == null || house === undefined || house.length === 0 || !house.trim() &&
                flat == "" || flat == null || flat === undefined || flat.length === 0 || !flat.trim()
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
                component.set("v.caseData.Stage_Step__c", "Filling data. Step 2");
                var caseData = component.get("v.caseData");
                console.log("caseData:::", JSON.stringify(caseData));
                helper.updateData(component, event, helper);

            }
        }

        if (thirdStep == true) {
            var firstNameContact = component.find("firstNameContact").get("v.value");
            var middleNameContact = component.find("middleNameContact").get("v.value");
            var lastNameContact = component.find("lastNameContact").get("v.value");
            var mobilePhoneContact = document.querySelector('.tel-mobile').value;
            var mobile = document.querySelector('.tel-mobile');
            var dateOfBirth = component.find("dateOfBirth").get("v.value");
            var relationToApplicant = component.find("relationToApplicant").get("v.value");
            var regPhoneformat = /^\+[\d]{1}\ \([\d]{2,3}\)\ [\d]{2,3}-[\d]{2,3}-[\d]{2,3}$/;
            var caseData = component.get("v.caseData");
            console.log("caseData:::", JSON.stringify(caseData));

            if (firstNameContact == "" || firstNameContact == null || firstNameContact == undefined || firstNameContact.length === 0 || !firstNameContact.trim() &&
                middleNameContact == "" || middleNameContact == null || middleNameContact == undefined || middleNameContact.length === 0 || !middleNameContact.trim() && 
                lastNameContact == "" || lastNameContact == null || lastNameContact == undefined || lastNameContact.length === 0 || !lastNameContact.trim() &&
                mobilePhoneContact == "" || mobilePhoneContact == null || mobilePhoneContact == undefined || mobilePhoneContact.length === 0 || !mobilePhoneContact.trim() &&
                relationToApplicant == "" || relationToApplicant == null || relationToApplicant == undefined || relationToApplicant.length === 0 || !relationToApplicant.trim() &&
                dateOfBirth == "" || dateOfBirth == null || dateOfBirth == undefined || dateOfBirth.length === 0 || !dateOfBirth.trim()
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
                component.set("v.caseData.Mobile_phoneContactPerson__c", mobilePhoneContact);
                component.set("v.caseData.Stage_Step__c", "Filling data. Step 3");
                helper.updateData(component, event, helper);
                var caseData = component.get("v.caseData");
                console.log("caseData:::", JSON.stringify(caseData));
            }
        }

        if (fourthStep == true) {
            var legalEntityType = component.find("legalEntityType").get("v.value");
            var employerName = component.find("employerName").get("v.value");
            var inn = component.find("inn").get("v.value");
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

            if (legalEntityType === "" || legalEntityType == null || legalEntityType == undefined || legalEntityType.length === 0 || !legalEntityType.trim() &&
                regionEmployer === "" || regionEmployer == null || regionEmployer === undefined || regionEmployer.length === 0 || !regionEmployer.trim() &&
                employerName === "" || employerName == null || employerName === undefined || employerName.length === 0 || !employerName.trim() &&
                inn === "" || inn == null || inn === undefined || inn.length === 0 || !inn.trim() &&
                cityEmployer === "" || cityEmployer == null || cityEmployer === undefined || cityEmployer.length === 0 || !cityEmployer.trim() &&
                streetEmployer === "" || streetEmployer == null || streetEmployer === undefined || streetEmployer.length === 0 || !streetEmployer.trim() &&
                houseEmployer === "" || houseEmployer == null || houseEmployer === undefined || houseEmployer.length === 0 || !houseEmployer.trim() &&
                position === "" || position == null || position === undefined || position.length === 0 || !position.trim() &&
                hireDate === "" || hireDate == null || hireDate === undefined || hireDate.length === 0 || !hireDate.trim() &&
                totalWorkExperience === "" || totalWorkExperience == null || totalWorkExperience === undefined || totalWorkExperience.length === 0 || !totalWorkExperience.trim() &&
                primaryEmploymentIncome === "" || primaryEmploymentIncome == null || primaryEmploymentIncome === undefined || primaryEmploymentIncome.length === 0 || !primaryEmploymentIncome.trim() &&
                dateSalary === "" || dateSalary == null || dateSalary === undefined || dateSalary.length === 0 || !dateSalary.trim() 
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
                component.set("v.caseData.INN__c", inn);
                component.set("v.caseData.Stage_Step__c", "Filling data. Step 4");
                helper.updateData(component, event, helper);
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
        console.log('thirdStep prevTab=', thirdStep);
        console.log('fourthStep prevTab=', fourthStep);
        console.log('fifthStep prevTab=', fifthStep);

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

        helper.updateData(component, event, helper);
        var caseData = component.get("v.caseData");
        console.log("caseData:::", JSON.stringify(caseData));
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            "recordId": caseData.Id,
            "slideDevName": "detail"
        });
        navEvt.fire();
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
        var toString = childEvent['addressFull'].toString();
        console.log('toSting =', toString);
        var stringToArray = toString.split(',');
        console.log('stringToArray =', stringToArray);
        var addressEmployer = {
            zip: stringToArray[0],
            region: stringToArray[1],
            district: stringToArray[2],
            city: stringToArray[3],
            street: stringToArray[4],
            house: stringToArray[5],
            office: stringToArray[6],
        }
        console.log('addressEmployer =', addressEmployer);
        component.set("v.caseData.Employer_Name__c", childEvent.value);

        var indexRegion =  childEvent.region.slice(-2);
        console.log('indexRegion =', indexRegion);
        if (indexRegion == 'ая') {
            component.set("v.caseData.RegionEmployer__c", childEvent.region + " обл");
        } else if (indexRegion == 'ий') {
            component.set("v.caseData.RegionEmployer__c", childEvent.region + " край");
        } else {
            component.set("v.caseData.RegionEmployer__c", childEvent.region);
        }
       
        if (childEvent.city === '' || childEvent.city == null ) {
            if (childEvent.address.includes(childEvent.settlement)) {
                var index = childEvent.address.indexOf(childEvent.settlement);
                console.log('index = ', index);
                console.log('index = ', childEvent.address.slice(index -2, index));
                var indexCitySettlement = childEvent.address.slice(index -5, index);
                
            }
            component.set("v.caseData.CityEmployer__c", indexCitySettlement + " " + childEvent.settlement);
        } else {
            if (childEvent.address.includes(childEvent.city)) {
                var index = childEvent.address.indexOf(childEvent.city);
                console.log('index = ', index);
                console.log('index = ', childEvent.address.slice(index -2, index));
                var indexCity = childEvent.address.slice(index -2, index);
                component.set("v.caseData.CityEmployer__c", indexCity + " " + childEvent.city);
            }
        }

        if (childEvent.street === '' || childEvent.street == null ) {
            if (childEvent.address.includes(childEvent.settlement)) {
                var index = childEvent.address.indexOf(childEvent.settlement);
                console.log('index = ', index);
                console.log('index = ', childEvent.address.slice(index -2, index));
                var indexStreetSettlement = childEvent.address.slice(index -5, index);
                
            }
            component.set("v.caseData.StreetEmployer__c", indexStreetSettlement + " " + childEvent.settlement);
        } else {
            var indexStreet =  childEvent.street.slice(-2);
            console.log('indexStreet =', indexStreet);
            if (indexStreet == 'ая') {
                component.set("v.caseData.StreetEmployer__c", "ул " + childEvent.street);
            } else if (indexStreet == 'ий') {
                component.set("v.caseData.StreetEmployer__c", childEvent.street + " пер");
            } else {
                component.set("v.caseData.StreetEmployer__c", childEvent.street);
            }
        }
        
        if (!childEvent.street === '' || !childEvent.street == null) {
            var indexDistrict =  childEvent.area.slice(-2);
            if (indexDistrict == 'ий') {
                component.set("v.caseData.DistrictEmployer__c", childEvent.area + " р-н");
            } else {
                component.set("v.caseData.DistrictEmployer__c", childEvent.area);
            }
        }
        
        component.set("v.caseData.HouseEmployer__c", childEvent.house);
        if (!childEvent.flat === '' || !childEvent.flat == null ) {
            component.set("v.caseData.Office__c", childEvent.flat);
        } 
        if (!childEvent.block === '' || !childEvent.block == null ) {
            component.set("v.caseData.BlockEmployer__c", childEvent.block);
        } 
        
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

    handleStep : function(component, event, helper) { 
        console.log('handleStep ok');

    }


    
});