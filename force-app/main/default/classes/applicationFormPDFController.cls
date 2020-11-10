public class applicationFormPDFController {
    public Id idApplication {get;set;}
    public Integer IssueDateDay {get;set;}
    public Integer IssueDateMonth {get;set;}
    public Integer IssueDateYear {get;set;}
    public Integer amount {get;set;}
    public String MobileCode {get;set;}
    public String MobileNumber {get;set;}
    public String OfficeCode {get;set;}
    public String OfficeNumber {get;set;}
    public String HomeCode {get;set;}
    public String HomeNumber {get;set;}
    public String AddCode {get;set;}
    public String AddNumber {get;set;}
    public Integer BirthDateDay {get;set;}
    public Integer BirthDateMonth {get;set;}
    public Integer BirthDateYear {get;set;}
    public String ContactMobileCode {get;set;}
    public String ContactMobileNumber {get;set;}
    public Integer HireDateDay {get;set;}
    public Integer HireDateMonth {get;set;}
    public Integer HireDateYear {get;set;}
    public Integer WorkDateMonth {get;set;}
    public Integer WorkDateYear {get;set;}
    public Integer CreatedDateDay {get;set;}
    public Integer CreatedDateMonth {get;set;}
    public Integer CreatedDateYear {get;set;}
     
    public Case app {get;set;}

    public applicationFormPDFController(ApexPages.StandardController stdController){
        app = (Case)stdController.getRecord();
        //idApplication = apexpages.currentpage().getparameters().get('idApplication');5005r000000cKTkAAM
        //idApplication='5005r000000cL9mAAE';
        idApplication=app.Id;
        app = [SELECT Id,
               MasterRecordId, CaseNumber, ContactId, AccountId,      
               Type, Status, Subject, Priority, Description, IsClosed, ClosedDate, IsEscalated, OwnerId, 
                ContactPhone, ContactMobile, ContactEmail, ContactFax, Comments, 
               
               Applicant_Type__c, previously_credited_under_the_program__c,
               
               Auto__c, Auto__r.Name,Credit_amount__c, Monthly_payment__c, Term__c, 
               
               Last_Name__c, First_Name__c, Middle_Name__c, 
               Former_Name_if_applicable__c, Insurance_Number__c, Security_word__c,
               Series__c, PassportNumber__c, Issue_date__c, 
               Married__c, Dependants_number__c,  Social_status__c, 
               
               Same_as_registration_address__c, Region__c, District__c, City__c, 
               Street__c, House__c, Block__c, Building__c, Flat__c, 
               
               Mobile_phone__c, Office_Phone__c, Home_Phone__c, Additional_Phone__c, 
               Extension_if_applicable__c, ApplicantEmail__c, 
               
               Relation_to_the_Applicant__c, 
               Last_NameContactPerson__c, First_NameContactPerson__c, Middle_NameContactPerson__c, Date_of_Birth__c, Mobile_phoneContactPerson__c, 
               
               Legal_Entity_Type__c, Employer_Name__c, INN__c, 
               
               RegionEmployer__c, DistrictEmployer__c, CityEmployer__c, StreetEmployer__c, 
               HouseEmployer__c, BlockEmployer__c, BuildingEmployer__c, Office__c, 
               
               Position__c, Hire_date__c, Main_Income__c, Total_work_experience_from__c, Salary_day__c, 
               Pension__c, Pension_Amount__c, Alimony__c, AlimonyAmount__c, Property_Rent__c, Property_Rent_Income__c, 
               Deposits_Investments_Dividends__c, Deposits_Investments_Dividends_Income__c, 
               Part_time_job__c, Part_time_job_Income__c, Freelance__c, Freelance_Income__c, 
               
               Contact_Full_Name__c, CreatedDate
               FROM Case 
               WHERE Id =: idApplication LIMIT 1];
        amount = (Integer) app.Credit_amount__c;
        
        if (app.Issue_date__c !=null){
            IssueDateDay   = app.Issue_date__c.day();
            IssueDateMonth = app.Issue_date__c.month();
            IssueDateYear  = app.Issue_date__c.year();
        }        
        
        if (app.Mobile_phone__c !=null){
            MobileCode = app.Mobile_phone__c.left(3);
            MobileNumber = app.Mobile_phone__c.mid(3,app.Mobile_phone__c.length());
        }        
        if (app.Office_Phone__c !=null){
            OfficeCode = app.Office_Phone__c.left(3);
            OfficeNumber = app.Office_Phone__c.mid(3,app.Office_Phone__c.length());
        }        
        if (app.Home_Phone__c !=null){
            HomeCode = app.Home_Phone__c.left(3);
            HomeNumber = app.Home_Phone__c.mid(3,app.Home_Phone__c.length());
        }        
        if (app.Additional_Phone__c !=null){
            AddCode = app.Additional_Phone__c.left(3);
            AddNumber = app.Additional_Phone__c.mid(3,app.Additional_Phone__c.length());
        }        
        
        if (app.Date_of_Birth__c !=null){
            BirthDateDay   = app.Date_of_Birth__c.day();
            BirthDateMonth = app.Date_of_Birth__c.month();
            BirthDateYear  = app.Date_of_Birth__c.year();
        }        
        if (app.Mobile_phoneContactPerson__c !=null){
            ContactMobileCode = app.Mobile_phoneContactPerson__c.left(3);
            ContactMobileNumber = app.Mobile_phoneContactPerson__c.mid(3,app.Mobile_phone__c.length());
        }        
        
        if (app.Hire_date__c !=null){
            HireDateDay   = app.Hire_date__c.day();
            HireDateMonth = app.Hire_date__c.month();
            HireDateYear  = app.Hire_date__c.year();
        }        
        
        if (app.Total_work_experience_from__c !=null){
            WorkDateMonth = app.Total_work_experience_from__c.month();
            WorkDateYear  = app.Total_work_experience_from__c.year();
        }        
        
        if (app.CreatedDate !=null){
            CreatedDateDay   = app.CreatedDate.day();
            CreatedDateMonth = app.CreatedDate.month();
            CreatedDateYear  = app.CreatedDate.year();
        }        
        
    }
}