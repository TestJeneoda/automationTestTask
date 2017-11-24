const EC = protractor.ExpectedConditions;

export class HomePage {
    constructor() {
        this.pageUrl = 'https://www.thomascook.com/';
        this.closePromoBtn = () => element(by.className('e108742-close'));
        this.cookieWarning = () =>  element(by.id('accept-cookies'));
    }

    async open() {
        let openPage = await browser.get(this.pageUrl);
        let currectUrl = await browser.getCurrentUrl();
        return currectUrl === this.pageUrl;
    }

    async waitToBeVisible(element, milliseconds = 5000) {
        let visibility = await browser.wait(EC.visibilityOf(element, milliseconds));
        return visibility;
    }

    async closePromo() {
        let promoBtn = this.waitToBeVisible(await this.closePromoBtn());

        if (await promoBtn) {
            await this.closePromoBtn().click();
            return true;
        }
        return true;
    }

    async acceptCookies() {
        let cookies = this.waitToBeVisible(await this.cookieWarning());

        if (await cookies) {
            await await this.cookieWarning().click();
            return true;
        }
        return true;
        
    }

    async selectDropdownOption(element, option) {
        if (typeof option === 'number') {
            let options = element.all(by.tagName('option'));
            await options.then((options) => options[option].click());
        } else {
            await element.element(by.css('option[selected="selected"] + option + option')).click();
        }
        return true;
    }

}

export default new HomePage();

