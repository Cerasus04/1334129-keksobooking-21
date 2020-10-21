'use strict';

(function () {
  const mapPins = window.data.mapPins;

  const pinMain = mapPins.querySelector(`.map__pin--main`);
  const addForm = document.querySelector(`.ad-form`);
  const roomsNumber = addForm.querySelector(`#room_number`);
  const selectType = addForm.querySelector(`#type`);
  const guestsNumber = addForm.querySelector(`#capacity`);
  const optionsCapacity = guestsNumber.querySelectorAll(`option`);
  const selectCheckIn = addForm.querySelector(`#timein`);
  const selectCheckOut = addForm.querySelector(`#timeout`);
  const inputPrice = addForm.querySelector(`#price`);
  const mapTypeToPrice = {
    bungalow: 0,
    flat: 1000,
    house: 5000,
    palace: 10000,
  };

  const MAP_VALUE_MATCHING = {
    1: [`1`],
    2: [`1`, `2`],
    3: [`1`, `2`, `3`],
    100: [`0`]
  };

  const validateRooms = () => {
    optionsCapacity.forEach(function (option) {
      const isShow = !(MAP_VALUE_MATCHING[roomsNumber.value].indexOf(option.value) >= 0);
      option.selected = MAP_VALUE_MATCHING[roomsNumber.value][0] === option.value;
      option.disabled = isShow;
      option.hidden = isShow;
    });
  };

  validateRooms();

  const changeCheckIn = (checkIn) => {
    selectCheckIn.value = checkIn;
  };
  const changeCheckOut = (checkOut) => {
    selectCheckOut.value = checkOut;
  };

  const setMinPrice = (minPrice) => {
    inputPrice.min = minPrice;
    inputPrice.placeholder = minPrice;
  };

  selectCheckIn.addEventListener(`change`, () => {
    changeCheckOut(selectCheckIn.value);
  });
  selectCheckOut.addEventListener(`change`, () => {
    changeCheckIn(selectCheckOut.value);
  });
  roomsNumber.addEventListener(`change`, function () {
    validateRooms();
  });

  selectType.addEventListener(`change`, () => {
    setMinPrice(mapTypeToPrice[selectType.value]);
  });

  window.form = {
    addForm: addForm,
    pinMain: pinMain
  };

})();
