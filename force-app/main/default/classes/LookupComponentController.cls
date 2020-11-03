public with sharing class LookupComponentController {

    public class RecordsData {
        @AuraEnabled public String label;
        @AuraEnabled public String value;
        public RecordsData(String label, String value) {
            this.label = label;
            this.value = value;
        }
    }

    @AuraEnabled
    public static List<LookupComponentController.ReturnWrapper> searchDadata(String item, String boundFrom, String boundTo) {
        HttpRequest req = getDaDataRequest(item, boundFrom, boundTo);
        Http h = new Http();
        HttpResponse hresp = h.send(req);
        String address = hresp.getBody();
        DaDataReturnWrapper parsedAddress = DaDataReturnWrapper.parse(address);
        List<LookupComponentController.ReturnWrapper> listOfValue = new List<LookupComponentController.ReturnWrapper>();
        for (DaDataReturnWrapper.suggestions currectAddress : parsedAddress.suggestions) {
            LookupComponentController.ReturnWrapper newAddress = new LookupComponentController.ReturnWrapper();
            if (boundTo == 'region' && boundFrom == 'region') {
                newAddress.value = currectAddress.data.region_with_type;
                newAddress.label = currectAddress.data.region_with_type;      
            } else if (boundTo == 'area' && boundFrom == 'area') {
                newAddress.value = currectAddress.data.area_with_type;
                newAddress.label = currectAddress.data.area_with_type;      
            } else if (boundTo == 'settlement' && boundFrom == 'city') {
                //if (currectAddress.data.settlement_with_type == null) {
                //    newAddress.value = currectAddress.data.settlement_with_type;
                //    newAddress.label = currectAddress.data.settlement_with_type;            
                //} else {
                    newAddress.value = currectAddress.data.city_with_type;
                    newAddress.label = currectAddress.data.city_with_type;   
                //}
            } else if (boundTo == 'street' && boundFrom == 'street') {
                newAddress.value = currectAddress.data.street_with_type;
                newAddress.label = currectAddress.data.street_with_type;      
            }
            listOfValue.add(newAddress);
        }

        return listOfValue;
    }

    public static HttpRequest getDaDataRequest(String item, String boundFrom, String boundTo) {
        DaDataSettings__c objSet = DaDataSettings__c.getValues('Authorization');
        String accToken = 'Token ' + objSet.API_key__c;
        String secToken = objSet.Secret_key__c;
        String endPoint = objSet.Endpoint__c;
        String jsonstring;
        if (boundFrom == null && boundTo == null) {
            jsonstring = '{"query":"' + item + '"}';
        } else {
            jsonstring = '{"query":"' + item + '", "from_bound": { "value": "'+ boundFrom +'" }, "to_bound": { "value": "'+ boundTo +'" }}';
        }
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

    public class ReturnWrapper {
        @AuraEnabled public String label;
        @AuraEnabled public String value;
    }


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