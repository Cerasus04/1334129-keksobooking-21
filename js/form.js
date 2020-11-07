'use strict';

const MAP_VALUE_MATCHING = {
  1: [`1`],
  2: [`1`, `2`],
  3: [`1`, `2`, `3`],
  100: [`0`]
};

const MapTypeToPrice = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

const mapPins = window.card.mapPins;
const onLoad = window.message.onLoad;
const onError = window.message.onError;

const pinMain = mapPins.querySelector(`.map__pin--main`);
const addForm = window.load.addForm;
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
  setMinPrice(MapTypeToPrice[selectType.value]);
});

const onSubmitButtonClick = (evt) => {
  if (inputPrice.checkValidity() && inputTitle.checkValidity()) {
    window.backend.save(new FormData(addForm), onLoad, onError);
  }
  evt.preventDefault();
  submitButton.removeEventListener(`submit`, onSubmitButtonClick);
};

const onResetButtonClick = (evt) => {
  evt.preventDefault();

  window.mapinit.setPageDeactivateState();
};

addForm.addEventListener(`submit`, onSubmitButtonClick);
resetButton.addEventListener(`click`, onResetButtonClick);

window.form = {
  pinMain
};

