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
  const inputTitle = addForm.querySelector(`#title`);
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
    let errorMessage = ``;
    const valueLength = inputTitle.value.length;
    if (valueLength < Setting.title.minLength || valueLength > Setting.title.maxLength) {
      errorMessage = `Минимальная длина заголовка объявления - ${Setting.title.minLength} символов, максимальная -  ${Setting.title.maxLength}`;
    }
  };

  const validatePrice = () => {
    let errorMessage = ``;

    if (inputPrice.value < inputPrice.min || inputPrice.value > inputPrice.max) {
      errorMessage = `Стоимость проживания должна быть не менее ${inputPrice.min}`;
    }
    inputPrice.setCustomValidity(errorMessage);
  };

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

    inputTitle.addEventListener(`invalid`, validateTitle);
    inputPrice.addEventListener(`invalid`, validatePrice);

    window.backend.save(new FormData(addForm), onLoad, onError);
    submitButton.removeEventListener(`click`, onSubmitButtonClick);
  };

  const onResetButtonClick = (evt) => {
    evt.preventDefault();

    window.mapinit.deactivate();
    resetButton.removeEventListener(`click`, onResetButtonClick);
  };

  inputTitle.addEventListener(`input`, validateTitle);
  inputPrice.addEventListener(`input`, validatePrice);
  submitButton.addEventListener(`click`, onSubmitButtonClick);
  resetButton.addEventListener(`click`, onResetButtonClick);

  window.form = {
    addForm: addForm,
    pinMain: pinMain
  };

})();
