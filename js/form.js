'use strict';

(function () {
  const mapPins = window.data.mapPins;
  const onLoad = window.message.onLoad;
  const onError = window.message.onError;

  const pinMain = mapPins.querySelector(`.map__pin--main`);
  const addForm = document.querySelector(`.ad-form`);
  const roomsNumber = addForm.querySelector(`#room_number`);
  const selectType = addForm.querySelector(`#type`);
  const guestsNumber = addForm.querySelector(`#capacity`);
  const optionsCapacity = guestsNumber.querySelectorAll(`option`);
  const selectCheckIn = addForm.querySelector(`#timein`);
  const selectCheckOut = addForm.querySelector(`#timeout`);
  const title = addForm.querySelector(`#title`);
  const inputPrice = addForm.querySelector(`#price`);
  const submitButton = addForm.querySelector(`.ad-form__submit`);
  const resetButton = addForm.querySelector(`.ad-form__reset`);

  const Setting = {
    title: {
      minLength: 30,
      maxLength: 100
    },
    price: {
      maxValue: 1000000
    }
  };

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

  const validateTitle = () => {
    if (title.value.length < Setting.title.minLength || title.value.length > Setting.title.maxLength) {
      title.reportValidity();
    }
  };

  title.addEventListener(`input`, validateTitle);

  const validatePrice = () => {
    if (inputPrice.value > Setting.price.maxValue) {
      inputPrice.reportValidity();
    }
  };

  inputPrice.addEventListener(`input`, validatePrice);

  const validateRooms = () => {
    optionsCapacity.forEach((option) => {
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
  roomsNumber.addEventListener(`change`, () => {
    validateRooms();
  });

  selectType.addEventListener(`change`, () => {
    setMinPrice(mapTypeToPrice[selectType.value]);
  });

  const onSubmitButtonClick = (evt) => {
    evt.preventDefault();

    window.backend.save(new FormData(addForm), onLoad, onError);
  };

  const onResetButtonClick = (evt) => {
    evt.preventDefault();
    window.mapinit.deactivate();
  };

  submitButton.addEventListener(`click`, onSubmitButtonClick);
  resetButton.addEventListener(`click`, onResetButtonClick);

  window.form = {
    addForm: addForm,
    pinMain: pinMain
  };

})();
