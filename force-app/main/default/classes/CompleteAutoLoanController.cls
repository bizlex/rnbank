public with sharing class CompleteAutoLoanController {
    
    @AuraEnabled
    public static List<Case> getCases() {

        return [
            SELECT Id, CaseNumber, Subject, Stage_Step__c, CreatedDate
            FROM Case
            WHERE Stage_Step__c = 'Filling data. Step 1' 
                OR Stage_Step__c = 'Filling data. Step 2'
                OR Stage_Step__c = 'Filling data. Step 3' 
            ORDER BY CaseNumber DESC
            LIMIT 3
        ];
        
   
    }
}