public with sharing class AutoLoanController {

    @AuraEnabled
    public static Case save(Case caseData) { 

        try{
            insert caseData;
        }
        catch(Exception ex){
            System.debug('Case insert failed' + ex.getMessage());
        }

        return caseData;
    }

    @AuraEnabled
    public static void updateCase(Case caseData, String caseId) {

        System.debug('caseData' + caseData);
        System.debug('caseId' + caseId);

        if (caseData.Id == caseId) {
            try {
                update caseData;
            } catch (Exception e) {
                System.debug('Case update failed' + e.getMessage());
            }
        } else {
            System.debug('caseData.Id != caseId');

            // updateOldCase(caseId);
            // List<Case> oldCase = [SELECT Id FROM Case WHERE Id =:caseId];

            // System.debug('oldCase = ' + oldCase);
            // update oldCase;
        }
       
    }

    @AuraEnabled
    public static List<Car__c> getCarById(String query) {
        System.debug('car AutoLoanController = ' + query);

        return [
            SELECT Id, Brand__c, Brand_Image__c, Name, Model__c, Model_Image__c, Model_Image_URL__c, Price__c
            FROM Car__c
            WHERE Id = :query
            ORDER BY Name
            LIMIT 1
        ];
        
    }

    @AuraEnabled
    public static List<Case> getCaseById(String caseId) {

        System.debug('caseId getCaseById = ' + caseId);

        return [
            SELECT Id, Subject, Last_Name__c, Term__c, First_Name__c, Middle_Name__c,
                Auto__c, Mobile_phone__c, ApplicantEmail__c
            FROM Case 
            WHERE Id =:caseId
        ];
        
    }
}