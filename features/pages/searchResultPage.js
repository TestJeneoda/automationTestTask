import {HomePage} from './homePage';

export class SearchResultPage extends HomePage {
    constructor() {
        super();
        this.resultHeader = () => element(by.css('h1.SrpHeader-title'));
        this.firstOfferDetailsBtn = () => element(by.className('BtnPrimary detailsBtn'));
        this.wishListCounter = () => element(by.id('wishlist-counter'));
    }
}

export default new SearchResultPage();