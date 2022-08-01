import { LightningElement, api, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getRelatedcontacts from '@salesforce/apex/InfoControllerService.getRelatedcontacts';
import { NavigationMixin } from 'lightning/navigation';


//contact fields to get: Name, Title, Phone, y Email.
const COLS = [
    { label: 'Name', fieldName: 'Name', type: 'text', cellAttributes: { iconName: 'standard:avatar' } },
    { label: 'Title', fieldName: 'Title', type: 'text' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'Email', fieldName: 'Email', type: 'email' },
    {
        type: 'button', typeAttributes: {
            label: 'Edit',
            name: 'Edit',
            title: 'Edit',
            disabled: false,
            value: 'Edit'
        }, cellAttributes: { alignment: 'center' }

    },



]

export default class ContactsRender extends NavigationMixin(LightningElement) {

    columns = COLS;

    contacts;
    error;
    rendering = false
    contactId = '';
    @api account;



    @api
    callApex(event) {

        getRelatedcontacts({ accId: event.detail.row.Id })
            .then((contacts) => {
                this.contacts = contacts;
                this.error = undefined;
                this.rendering = true;



            })
            .catch((error) => { //error handling
                this.error = error;
                this.contacts = undefined;
                //show error message on page
                const toast = new ShowToastEvent({
                    title: 'An error was ocurred',
                    message: error,
                    variant: 'error'
                });
                this.dispatchEvent(toast);
                console.log(error)
            });
    }

    handleButtonCloseClick() { //handle close of contacts window
        this.rendering = false
    }

    navigateNext(event) {

        //contact Id info to contactId prop
        this.contactId = event.detail.row.Id

        //Navigate to salesforce standard edit page
        this[NavigationMixin.Navigate]({
            type: "standard__recordPage",
            attributes: {
                recordId: this.contactId,
                objectApiName: "Contact",
                actionName: "edit"
            }
        });
    }
}


