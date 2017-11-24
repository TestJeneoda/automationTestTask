import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {defineSupportCode} from 'cucumber';

chai.use(chaiAsPromised);
const expect = chai.expect;

import HomePage from '../pages/homePage';
import SearchWidget from '../pages/searchWidget';
import SearchResultPage from '../pages/searchResultPage';
import HotelPage from '../pages/hotelPage';

const trip = {
  from: 'Any London',
  to: 'Turkey',
  duration: null,
  departureInDays: 201,
  rooms: null,
  guests: {
    adults: 2,
    children: 1,
    infant: 1
  }
}

defineSupportCode(({Given, When, Then, setDefaultTimeout}) => {
  setDefaultTimeout(200 * 1000);
  Given("I am a customer on the Homepage", async () => {
    let homePageIsOpened = await HomePage.open();
    return expect(homePageIsOpened).to.be.equal(true);
  });

  When("I have the following search preferences", async () => {
    await HomePage.closePromo();
    
    try {
      await SearchWidget.getSearchForm();
      await HomePage.acceptCookies();
    } catch(e) {
      await HomePage.closePromo();
    }

    return trip;
  });

  When("From: Any London To: Turkey, Any", async () => {
    return await SearchWidget.selectDirections(trip);
  });

  When("Days to Departure: > 200 days", async () => {
    return await SearchWidget.selectDaysToDeparture(trip);
  });

  When("Duration: I don't mind", async () => {
    if (!trip.duration) {
      return true; // consider other methods if duration is defined
    }
  });

  When("Room 1: 2 Adults, 1 Child, 1 Infant", async () => {
    return await SearchWidget.selectGuests(trip);
  });

  When("I search using the above preferences", async () => {
    return await SearchWidget.submitBtn().click();
  });

  Then("The search results page displays results", async () => {
    expect(SearchResultPage.resultHeader().getText()).to.eventually.include('holidays found');
    await SearchResultPage.firstOfferDetailsBtn().click();
    await HotelPage.wishList().click();
    await HotelPage.backToSearch().click();
    return expect(SearchResultPage.wishListCounter().getText()).to.eventually.include('1');
  });
});
