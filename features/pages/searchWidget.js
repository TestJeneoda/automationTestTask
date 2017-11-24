import { HomePage } from './homePage';

export class SearchWidget extends HomePage {
    constructor() {
        super();
        this.searchForm = () => element(by.className('SearchbarForm'));
        this.fromBtn = () => element(by.id('SearchbarForm-toggleAirportsTooltip'));
        this.toBtn = () => element(by.id('SearchbarForm-toggleDestinationsTooltip'));
        this.closeFromBtn = () => element(by.id('iconClose-airports'));
        this.closeToBtn = () => element(by.id('iconClose-destinations'));
        this.when = () => element(by.css('label[for="when"]'));
        this.yearPicker = () => element(by.className('ui-datepicker-year'));
        this.availableDates = () => element(by.css('td[data-handler="selectDay"]'));
        this.guests = () => element(by.className('PaxWidget-container'));
        this.childrenCont = () => element(by.className('PaxWidgetPopup-childrenCounter'));
        this.closeChildrenBtn = () => element(by.className('PaxWidgetPopup-closeBtn'));
        this.submitBtn = () =>  element(by.id('SearchbarForm-submitBtn'));
    }

    async waitToBeVisible(element, milliseconds) {
        return super.waitToBeVisible(element, milliseconds);
    }

    async getSearchForm() {
        let form = await this.waitToBeVisible(await this.searchForm());
        let btnFrom = await this.waitToBeVisible(await this.fromBtn());
        let btnTo = await this.waitToBeVisible(await this.toBtn()); 
        
        if (form && btnFrom && btnTo) {
            return true;
        }
        throw new Error('Form still is not visible');
    }

    async selectDirections({from, to}) {
        await this.fromBtn().click();
        let fromDirection = element(by.css(`label[title="${from}"]`));
        await fromDirection.click();
        await this.closeFromBtn().click();
        await this.toBtn().click();
        let toDirection = element(by.css(`label[title="${to}"]`));
        await toDirection.click();
        return await this.closeToBtn().click();
    }

    // the method is expected to be extended by using the passed agruments
    async selectDaysToDeparture({departureInDays}) {
        await this.when().click();
        await this.yearPicker().click();
        await this.selectDropdownOption(await this.yearPicker());
        let anyDay = await this.availableDates().element(by.className('ui-state-default'));
        return await anyDay.click();
    }

    // the method is expected to be extended by using the passed agruments
    async selectGuests({guests}) {
        await this.guests().click();
        
        let addChilren = await this.childrenCont().element(by.className('PaxWidgetPopup-counterInc'));
        await addChilren.click();
        await addChilren.click();

        let childrenCount = element.all(by.className('FormChildAge')).each(async (item, i) => {
            await item.element(by.tagName('select')).click();
            await this.selectDropdownOption(item, i+1);
        });

        return await this.closeChildrenBtn().click();
    }

    // todo    
    setGuests({adults, children, infant}) {
        this.setAdults(arguments);
        this.setChildren(arguments);
        this.setInfants(arguments);
    }

    setInfants(params) {
        /// todo  
    }

    setChildren(params) {
        /// todo
    }

    setAdults(params) {
        /// todo
    };

    selectDropdownOption(element, option) {
        return super.selectDropdownOption(element, option);
    }

}

export default new SearchWidget();
