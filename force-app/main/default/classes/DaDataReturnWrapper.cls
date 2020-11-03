public class DaDataReturnWrapper {

    public List<Suggestions> suggestions;

    public class Suggestions {
        public String value;
        public String unrestricted_value;
        public Data data;
    }

    public class Data {
        public String region_with_type;
        public String region_fias_id;
        public String area_with_type;
        public String area_fias_id;
        public String city_with_type;
        public String city_fias_id;
        public String settlement_with_type;
        public String settlement_fias_id;
        public String street_with_type;
        public String house;
        public String house_fias_id;
    }

    
    public static DaDataReturnWrapper parse(String json) {
        return (DaDataReturnWrapper) System.JSON.deserialize(json, DaDataReturnWrapper.class);
    }
}