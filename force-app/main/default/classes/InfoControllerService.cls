public with sharing class InfoControllerService {
    
    @AuraEnabled(cacheable=true)
    public static list<Account> getActiveAccounts() {
        return [SELECT Id, Name, Industry, NumberOfEmployees, AnnualRevenue FROM Account WHERE Active__c = 'yes' ORDER BY Name ASC ];
    }

    @AuraEnabled(cacheable=true)
    public static list<Contact> getRelatedcontacts (Id accId) {
        return [SELECT id, Name, Phone, Title, Email FROM Contact WHERE AccountId =: accId];
    }
    
}

