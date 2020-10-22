public class applicationFormPDFController {
    public Id idApplication {get;set;}
    public String autoName {get;set;}
    public Decimal amount {get;set;}
    public Boolean isamount {get;set;}

    public applicationFormPDFController(){
        //idApplication = apexpages.currentpage().getparameters().get('idApplication');5005r000000cKTkAAM
        idApplication='5005r000000cKTkAAM';
        Case app = [SELECT Id,Auto__r.Name,Credit_amount__c
                    FROM Case 
                    WHERE Id =: idApplication LIMIT 1];
        autoName = app.Auto__r.Name;
        amount = app.Credit_amount__c;
        isamount = true;
    }
}