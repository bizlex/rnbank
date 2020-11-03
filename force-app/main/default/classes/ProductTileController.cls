public with sharing class ProductTileController {

    @AuraEnabled
    public static List<Product2> getProducts(String query, String idCar) {

        System.debug('brand CarTileController=' + query);
        System.debug('car CarTileController=' + idCar);

        idCar = '%QX50%';

        if (String.isEmpty(idCar)) {
            return [
                SELECT Id, Name, Family, Credit_Term__c, Inital_Payment__c, Interest_Rate__c
                FROM Product2
                WHERE Family LIKE :query
                ORDER BY Name
                LIMIT 3
            ];
        } else {
            return [
                SELECT Id, Name, Family, Credit_Term__c, Inital_Payment__c, Interest_Rate__c
                FROM Product2
                WHERE Name LIKE :idCar
                ORDER BY Name
            ];
        }
   
    }
}