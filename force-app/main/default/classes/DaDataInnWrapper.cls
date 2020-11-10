public class DaDataInnWrapper{

	public class Suggestions {
		public String value;
		public String unrestricted_value;
		public Data_Z data;
	}

	public class Data_Z {
		public String type_z;
		public State state;
		public Opf opf;
		public Name name;
		public String inn;
		public String ogrn;
		public String okpo;
		public String okato;
		public String oktmo;
		public String okogu;
		public String okfs;
		public Address address;
		public String phones;
		public String emails;
		public String ogrn_date;
		public String okved_type;
		public String employee_count;
	}

	public List<Suggestions> suggestions;

	public class Opf {
		public String type_z;
		public String code;
		public String full;
		public String short_z;
	}

	public class Address {
		public String value;
		public String unrestricted_value;
		public Data data;
    }
    

	public class State {
		public String status;
		public String actuality_date;
		public String registration_date;
		public String liquidation_date;
	}

	public class Data {
		public String postal_code;
		public String country;
		public String country_iso_code;
		public String federal_district;
		public String region_fias_id;
		public String region_kladr_id;
		public String region_iso_code;
		public String region_with_type;
		public String region_type;
		public String region_type_full;
		public String region;
		public String area_fias_id;
		public String area_kladr_id;
		public String area_with_type;
		public String area_type;
		public String area_type_full;
		public String area;
		public String city_fias_id;
		public String city_kladr_id;
		public String city_with_type;
		public String city_type;
		public String city_type_full;
		public String city;
		public String city_area;
		public String city_district_fias_id;
		public String city_district_kladr_id;
		public String city_district_with_type;
		public String city_district_type;
		public String city_district_type_full;
		public String city_district;
		public String settlement_fias_id;
		public String settlement_kladr_id;
		public String settlement_with_type;
		public String settlement_type;
		public String settlement_type_full;
		public String settlement;
		public String street_fias_id;
		public String street_kladr_id;
		public String street_with_type;
		public String street_type;
		public String street_type_full;
		public String street;
		public String house_fias_id;
		public String house_kladr_id;
		public String house_type;
		public String house_type_full;
		public String house;
		public String block_type;
		public String block_type_full;
		public String block;
		public String flat_type;
		public String flat_type_full;
		public String flat;
		public String flat_area;
		public String square_meter_price;
		public String flat_price;
		public String postal_box;
		public String fias_id;
		public String fias_code;
		public String fias_level;
		public String fias_actuality_state;
		public String kladr_id;
		public String geoname_id;
		public String capital_marker;
		public String okato;
		public String oktmo;
		public String tax_office;
		public String tax_office_legal;
		public String timezone;
		public String geo_lat;
		public String geo_lon;
		public String beltway_distance;
		public String qc_geo;
		public String qc_complete;
		public String qc_house;
		public String source;
		public String qc;
	}

	public class Management {
		public String name;
		public String post;
		public String disqualified;
	}

	public class Name {
		public String full_with_opf;
		public String short_with_opf;
		public String latin;
		public String full;
		public String short_z;
	}

	
	public static DaDataInnWrapper parse(String json) {
		return (DaDataInnWrapper) System.JSON.deserialize(json, DaDataInnWrapper.class);
	}
}