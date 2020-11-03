public with sharing class CarTileController {
    
    @AuraEnabled
    public static List<Car__c> getCars(String query, String idCar) {

        System.debug('brand CarTileController=' + query);
        System.debug('car CarTileController=' + idCar);

        if (String.isEmpty(idCar)) {
            return [
                SELECT Id, Brand__c, Brand_Image__c, Name, Model__c, Model_Image__c, Model_Image_URL__c, Price__c
                FROM Car__c
                WHERE Brand__c LIKE :query
                ORDER BY Name
            ];
        } else {
            return [
                SELECT Id, Brand__c, Brand_Image__c, Name, Model__c, Model_Image__c, Model_Image_URL__c, Price__c
                FROM Car__c
                WHERE Id = :idCar
                ORDER BY Name
                LIMIT 1
            ];
        }
   
    }

    // @AuraEnabled
    // public static List<Car__c> getCarById(String query) {
    //     System.debug('car = ' + query);

    //     return [
    //         SELECT Id, Brand__c, Brand_Image__c, Name, Model__c, Model_Image__c, Model_Image_URL__c, Price__c
    //         FROM Car__c
    //         WHERE Id = :query
    //         ORDER BY Name
    //     ];
        
    // }
}