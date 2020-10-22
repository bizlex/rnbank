({
    nextTab : function(component, event, helper) {
        component.set("v.setMessage", '');           
        var showAccount = component.get("v.showAccount");
        var showContact = component.get("v.showContact");
        var showOpportunity = component.get("v.showOpportunity");
        var showData = component.get("v.showData");
        
        if(showAccount == true){
            var accountName = component.find("Name").get("v.value");
            console.log('accountName:::'+accountName);
            if(accountName =='' || accountName == null) {
                component.set("v.setMessage",'error');           
            }
            if(component.get("v.setMessage")=='error') { 
                component.set("v.showContact",false);
                component.set("v.showOpportunity", false);
                component.set("v.showError", true);
                component.set("v.showData", false);
                
            }else{ 
                component.set("v.showAccount", false);
                component.set("v.showContact", true);
                component.set("v.showOpportunity", false); 
                component.set("v.showError", false);
                component.set("v.showData", false);
            }
        } 

        if(showContact == true){
            var lastName = component.find("LastName").get("v.value");
            console.log('lastName:::'+lastName);
            if(lastName =='' || lastName == null) {
                component.set("v.setMessage",'error');           
            }
            if(component.get("v.setMessage")=='error') { 
                component.set("v.showAccount", false);
                component.set("v.showOpportunity", false);
                component.set("v.showError", true);
                component.set("v.showData", false);
            }else{ 
                component.set("v.showAccount", false);
                component.set("v.showContact", false);
                component.set("v.showOpportunity", true);
                component.set("v.showError", false);
                component.set("v.showData", false);
            }
        }   
        
        if(showOpportunity == true){
            var OpportunityName = component.find("OpportunityName").get("v.value");
            console.log('OpportunityName:::'+OpportunityName);
            var StageName = component.find("StageName").get("v.value");
            console.log('StageName:::'+StageName);
            var closeDate = component.find("closeDate").get("v.value");
            console.log('closeDate:::'+closeDate);
            if((OpportunityName =='' || OpportunityName == null) || (StageName =='' || StageName == null) || (closeDate =='' || closeDate == null)) {
                component.set("v.setMessage",'error');           
            }
            if(component.get("v.setMessage")=='error') { 
                component.set("v.showAccount", false);
                component.set("v.showContact", false);
                component.set("v.showError", true);
                component.set("v.showData", false); 
            }else{ 
                component.set("v.showOpportunity", false);
                component.set("v.showContact", false);
                component.set("v.showAccount", false)
                component.set("v.showError", false);
                component.set("v.showData", true);
            }
        }   
        
    },

    prevTab : function(component, event, helper) {
        var showAccount = component.get("v.showAccount");
        var showContact = component.get("v.showContact");
        var showOpportunity = component.get("v.showOpportunity");
        var showData = component.get("v.showData");
        
        if(showContact == true) {
            component.set("v.showAccount", true);
            component.set("v.showContact", false);
            component.set("v.showOpportunity", false);
            component.set("v.showError", false);
            component.set("v.showData", false);
        }    
        if(showOpportunity == true) {
            component.set("v.showAccount", false);
            component.set("v.showContact", true);
            component.set("v.showOpportunity", false);
            component.set("v.showError", false);
            component.set("v.showData", false);
        } 
        if(showData == true) {
            component.set("v.showAccount", false);
            component.set("v.showContact", false);
            component.set("v.showOpportunity", true);
            component.set("v.showError", false);
            component.set("v.showData", false);
        }  
    },
    
    onSelectChange : function(component, event, helper) {
        var selected = component.find("StageName").get("v.value");
        component.set("v.OpportunityData.StageName",selected);
        console.log('opp::::'+JSON.stringify(selected));
    },
    
    saveRecord : function(component, event, helper) {
        helper.saveData(component, event, helper);               
    }
})