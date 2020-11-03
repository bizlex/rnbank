public with sharing class LookupInnController {
    
    public class ReturnInnWrapper {
        @AuraEnabled public String name;
        @AuraEnabled public String opf;
    }

    @AuraEnabled
    public static LookupComponentController.ReturnInnWrapper searchDadataInn(String item) {
        HttpRequest req = getDaDataRequestInn(item);
        Http h = new Http();
        HttpResponse hresp = h.send(req);
        String address = hresp.getBody();
        address = address.replace('type', 'type_z');
        address = address.replace('short', 'short_z');
        DaDataInnWrapper parsedAddress = DaDataInnWrapper.parse(address);
        LookupComponentController.ReturnInnWrapper qwe = new LookupComponentController.ReturnInnWrapper();
        if (parsedAddress.suggestions.size() > 0) {
            qwe.name = parsedAddress.suggestions[0].data.name.short_z;
            qwe.opf = parsedAddress.suggestions[0].data.opf.short_z;
        }
        return qwe;
    }

    public static HttpRequest getDaDataRequestInn(String item) {
        DaDataSettings__c objSet = DaDataSettings__c.getValues('Authorization');
        String accToken = 'Token ' + objSet.API_key__c;
        String secToken = objSet.Secret_key__c;
        String endPoint = objSet.Endpoint_Org__c;
        String jsonstring = '{"query":"' + item + '"}';
        HttpRequest req = new HttpRequest();
        req.setHeader('Content-Type','application/json');
        req.setHeader('Accept','application/json');
        req.setHeader('Authorization', accToken);
        req.setHeader('X-Secret', secToken);
        req.setMethod('POST');
        req.setBody(jsonstring);
        req.setEndpoint(endPoint);
        return req;
    }
}