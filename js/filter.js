'use strict';

(function () {
  const filtersForm = document.querySelector(`.map__filters`);
  const housingType = filtersForm.querySelector(`#housing-type`);
  const mapPins = window.data.mapPins;
  const AMOUNT = window.mapinit.AMOUNT;
  const closePopup = window.data.closePopup;
  const renderPins = window.pin.renderPins;
  const ANY_HOUSING = `any`;
  const pins = window.mapinit.pins;
  const removePins = window.pin.removePins;

  const onLoad = (data) => {
    pins = data;
    updatePins(data);
  };

  const updatePins = (data) => {
    removePins();
    mapPins.append(renderPins(data.slice(0, AMOUNT)));
  };

  const setFiltersType = () => {
    let newPins = [];
    pins.forEach((itemAd) => {
      for (let i = 0; i < pins.length; i++) {
        if (housingType.value === ANY_HOUSING
          || itemAd.offer.type === housingType.value) {
          newPins.push(itemAd);
        }
      }
    });
    closePopup();
    updatePins(newPins);

    // housingType.removeEventListener(`change`, setFiltersType);
  };

  housingType.addEventListener(`change`, setFiltersType);

  window.filter = {
    onLoad: onLoad
  };
})();
