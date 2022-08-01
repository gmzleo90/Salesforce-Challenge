trigger ContactEmailNotificacion on Contact (after update) {

    //this trigger sends emails trough system notifyng that one or more contacts were modified

    List<Messaging.SingleEmailMessage> mails =  new List<Messaging.SingleEmailMessage>();

    List<String> sendTo = new List<String>();
    
    sendTo.add('mileto.sei@gmail.com');//set destiny
    
    
    for(Contact cnt : trigger.new){
        Messaging.SingleEmailMessage mail =  new Messaging.SingleEmailMessage();
        mail.setToAddresses(sendTo);
        mail.setSubject('->System Notification: '+ cnt.FirstName + ' ' + cnt.LastName + ' was modified'); //set subject
        String body = 'This is an automatic system notification. This contact was modified : ' + cnt.FirstName + ' ' + cnt.LastName +' - Contact Id: ' + cnt.Id;//set body
        mail.setHtmlBody(body);
        mails.add(mail);
    }

    Messaging.sendEmail(mails);//send emails

}