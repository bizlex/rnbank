public with sharing class LookupInnController {
    
    public class ReturnInnWrapper {
        @AuraEnabled public String value;
        @AuraEnabled public String label;
        @AuraEnabled public String address;
        @AuraEnabled public String name;
        @AuraEnabled public String opf;
    }

    @AuraEnabled
    public static LookupInnController.ReturnInnWrapper[] searchDadataInn(String item) {
        System.debug('item = ' + item);
        HttpRequest req = getDaDataRequestInn(item);
        System.debug('req = ' + req);
        Http h = new Http();
        HttpResponse hresp = h.send(req);
        System.debug('hresp = ' + hresp);

        String inn = hresp.getBody();
        System.debug('inn = ' + JSON.serialize(inn));

        inn = inn.replace('type', 'type_z');
        inn = inn.replace('short', 'short_z');
        System.debug('inn2 = ' + JSON.serialize(inn));
        DaDataInnWrapper parsedInn = DaDataInnWrapper.parse(inn);
        System.debug('parsedInn = ' + JSON.serialize(parsedInn));

        LookupInnController.ReturnInnWrapper[] listOfValue = new LookupInnController.ReturnInnWrapper[]{};
        for (DaDataInnWrapper.cls_suggestions currectInn : parsedInn.suggestions) {
            LookupInnController.ReturnInnWrapper qwe = new LookupInnController.ReturnInnWrapper();
            if (parsedInn.suggestions.size() > 0) {
                qwe.value = currectInn.value;
                qwe.label = currectInn.value;
                qwe.address = currectInn.data.address.value;
                // qwe.name = currectInn.data.name.short_z;
                // qwe.opf = currectInn.data.opf.short_z;
            }
            listOfValue.add(qwe);
        }
        
        System.debug('listOfValue = ' + listOfValue);
        return listOfValue;
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