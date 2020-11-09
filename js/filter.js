'use strict';

const AMOUNT = window.mapinit.AMOUNT;
const ANY_HOUSING = `any`;
const HIGH_PRICE = 50000;
const LOW_PRICE = 10000;

const closePopup = window.card.closePopup;
const renderPins = window.pin.renderPins;
const removePins = window.pin.removePins;

const mapFilters = window.card.mapFilters;
const housingTypeFilterElement = mapFilters.querySelector(`#housing-type`);
const housingPriceFilterElement = mapFilters.querySelector(`#housing-price`);
const housingRoomsFilterElement = mapFilters.querySelector(`#housing-rooms`);
const housingGuestsFilterElement = mapFilters.querySelector(`#housing-guests`);
const housingFeatureFilterElement = mapFilters.querySelector(`#housing-features`);

const filterHousingType = (data) => housingTypeFilterElement.value === data.offer.type || housingTypeFilterElement.value === ANY_HOUSING;

const filterHousingRooms = (data) => housingRoomsFilterElement.value === data.offer.rooms.toString() || housingRoomsFilterElement.value === ANY_HOUSING;

const filterHousingGuests = (data) => housingGuestsFilterElement.value === data.offer.guests.toString() || housingGuestsFilterElement.value === ANY_HOUSING;

const filterHousingPrice = (data) => {
  return housingPriceFilterElement.value === ANY_HOUSING ||
    (housingPriceFilterElement.value === `low` && data.offer.price < LOW_PRICE) ||
    (housingPriceFilterElement.value === `middle` && (data.offer.price >= LOW_PRICE && data.offer.price <= HIGH_PRICE)) ||
    (housingPriceFilterElement.value === `high` && data.offer.price > HIGH_PRICE);
};

const filterHousingFeatures = (data) => {
  const checkListElements = Array.from(housingFeatureFilterElement.querySelectorAll(`input[type = checkbox]:checked`));
  return checkListElements.every((checkedFeature) => data.offer.features.includes(checkedFeature.value));
};

const filterData = window.debounce(() => {
  const pins = window.mapinit.pins();
  closePopup();
  removePins();

  let newPins = [];

  for (let i = 0; i < pins.length; i++) {
    if (
      filterHousingType(pins[i]) &&
      filterHousingPrice(pins[i]) &&
      filterHousingRooms(pins[i]) &&
      filterHousingGuests(pins[i]) &&
      filterHousingFeatures(pins[i])
    ) {
      newPins.push(pins[i]);
    }

    if (newPins.length === AMOUNT) {
      break;
    }
  }

  renderPins(newPins);
});

mapFilters.addEventListener(`change`, filterData);

