import {HomePage} from './homePage';

export class HotelPage extends HomePage {
    constructor() {
        super();
        this.wishList = () => element(by.className('WishlistButton-container'));
        this.backToSearch = () => element(by.css('button[analytics-id="accom-backToSearch"]'));
    }
}

export default new HotelPage();