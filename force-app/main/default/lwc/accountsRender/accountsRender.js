import { LightningElement } from 'lwc';
import getActiveAccounts from '@salesforce/apex/InfoControllerService.getActiveAccounts';


// Accounts fields to get Name, Industry, Employees, y Annual Revenue.
const columns = [
    { label: 'Name', fieldName: 'Name', type: 'string', cellAttributes: { iconName: 'standard:account_info' } },
    { label: 'Industry', fieldName: 'Industry', cellAttributes: { alignment: 'right' } },
    { label: 'Employees', fieldName: 'NumberOfEmployees', cellAttributes: { alignment: 'right' } },
    { label: 'Anual Revenue', fieldName: 'AnnualRevenue', type: 'currency' },
    {
        type: 'button', typeAttributes: {
            label: 'View related Contacts',
            name: 'View related Contacts',
            title: 'View related Contacts',
            disabled: false,
            value: 'View'
        }, cellAttributes: { alignment: 'center' },

    }


];

export default class AccountsRender extends LightningElement {


    cols = columns;
    accounts;
    error;

    //get from apex method active accounts
    connectedCallback() {
        getActiveAccounts()
            .then((accounts) => {
                this.accounts = accounts;
                this.error = undefined;
            })
            .catch((error) => {
                this.accounts = undefined;
                this.error = error;
                const toast = new ShowToastEvent({
                    title: 'An error was ocurred',
                    message: error,
                    variant: 'error'
                });
                this.dispatchEvent(toast);
                console.log(error)
            });
    }


    handleRowAction(e) {

        //event comunication parent to to <c-contacts-render> component
        this.template.querySelector('c-contacts-render').callApex(e);
        this.template.querySelector('c-contacts-render').account = e.detail.row;

        //scroll effect to related contacts
        const contactsComponent = this.template.querySelector('[data-id="contactsDiv"]')
        setTimeout(() => contactsComponent.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" }), 500)

    }


}


