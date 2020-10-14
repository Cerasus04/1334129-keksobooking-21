'use strict';

(function () {
  const map = document.querySelector(`.map`);
  const mapPins = map.querySelector(`.map__pins`);
  const pinMain = mapPins.querySelector(`.map__pin--main`);
  const addForm = document.querySelector(`.ad-form`);
  const addressInput = addForm.querySelector(`#address`);
  const roomsNumber = addForm.querySelector(`#room_number`);
  const selectType = addForm.querySelector(`#type`);
  const formFieldsets = document.querySelectorAll(`fieldset, select`);
  const guestsNumber = addForm.querySelector(`#capacity`);
  const optionsCapacity = guestsNumber.querySelectorAll(`option`);
  const buttonReset = addForm.querySelector(`.ad-form__reset`);
  const selectCheckIn = addForm.querySelector(`#timein`);
  const selectCheckOut = addForm.querySelector(`#timeout`);

  const PIN = {
    WIDTH: 40,
    HEIGHT: 40,
    MARKER_HEIGHT: 22
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

  const setDisableState = () => {
    formFieldsets.forEach((item) => {
      item.disabled = !item.disabled;
    });
  };

  setDisableState();

  const getAddress = () => {
    let x = parseInt(pinMain.style.left, 10);
    let y = parseInt(pinMain.style.top, 10);

    if (!map.classList.contains(`map--faded`)) {
      x = `${Math.floor(x + PIN.WIDTH / 2)}`;
      y = `${Math.floor(y + (PIN.HEIGHT + PIN.MARKER_HEIGHT))}`;
    } else {
      x = `${Math.floor(x + PIN.WIDTH / 2)}`;
      y = `${Math.floor(y + PIN.HEIGHT / 2)}`;
    }
    addressInput.value = (`${x}, ${y}`);
  };

  getAddress();

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

  const inputPrice = addForm.querySelector(`#price`);

  const setMinPrice = (minPrice) => {
    inputPrice.min = minPrice;
    inputPrice.placeholder = minPrice;
  };

  buttonReset.addEventListener(`click`, function (evt) {
    evt.preventDefault();
    addForm.reset();
    getAddress();
  });


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
    setDisableState: setDisableState,
    getAddress: getAddress
  };

})();
