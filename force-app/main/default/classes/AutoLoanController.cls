public with sharing class AutoLoanController {
    @AuraEnabled
    public static string save(Account accountData ,Contact contactData,Opportunity opportunityData){
        try{
            System.debug('accountData::::'+accountData);
            System.debug('contactData::::'+contactData);
            System.debug('opportunityData::::'+opportunityData);
            
            insert accountData;
            contactData.AccountId = accountData.id;
            insert contactData;
            opportunityData.AccountId = accountData.id;
            insert opportunityData;
        }
        catch(Exception ex){
            return ex.getMessage();
        }
        return 'record successfully insert';  
    }
}