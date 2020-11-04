'use strict';

const AMOUNT = 5;
const SIZE_PIN = window.pin.SIZE_PIN;

const isEnterEvent = window.util.isEnterEvent;
const isMouseLeftButtonEvent = window.util.isMouseLeftButtonEvent;
const renderPins = window.pin.renderPins;
const map = window.card.map;
const closePopup = window.card.closePopup;
const addForm = window.load.addForm;
const pinMain = window.form.pinMain;
const removePins = window.pin.removePins;
const load = window.backend.load;
const setDisabledImg = window.load.setDisabledImg;
const setEnabledImg = window.load.setEnabledImg;
const mapFilters = window.card.mapFilters;

const main = document.querySelector(`main`);
const addressInput = addForm.querySelector(`#address`);
const formFieldsets = document.querySelectorAll(`fieldset, select`);

const defaultMainPin = {
  x: pinMain.style.left,
  y: pinMain.style.top
};

let pins = [];

const getAddress = () => {
  let x = parseInt(pinMain.style.left, 10);
  let y = parseInt(pinMain.style.top, 10);

  if (!map.classList.contains(`map--faded`)) {
    x = `${Math.floor(x + SIZE_PIN.WIDTH / 2)}`;
    y = `${Math.floor(y + (SIZE_PIN.HEIGHT + SIZE_PIN.MARKER_HEIGHT))}`;
  } else {
    x = `${Math.floor(x + SIZE_PIN.WIDTH / 2)}`;
    y = `${Math.floor(y + SIZE_PIN.HEIGHT / 2)}`;
  }
  addressInput.value = (`${x}, ${y}`);
};

getAddress();

const setFormDisableState = () => {
  formFieldsets.forEach((item) => {
    item.disabled = !item.disabled;
  });
};
setFormDisableState();

const onLoad = (data) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].offer) {
      pins.push(data[i]);
    }
  }
  renderPins(pins.slice(0, AMOUNT));
};

const onError = (errorMessage) => {
  const fragment = document.createDocumentFragment();
  const error = document.createElement(`div`);
  fragment.appendChild(error);
  error.style = `z-index: 1000; margin: 0 auto; text-align: center; background-color: rgba(3, 28, 45, 0.5);`;
  error.style.position = `absolute`;
  error.style.width = `100%`;
  error.style.height = `50px`;
  error.style.left = 0;
  error.style.right = 0;
  error.style.fontSize = `24px`;

  error.textContent = `Не удалось загрузить данные: ${errorMessage}. Попробуйте перезагрузить страницу`;
  main.prepend(fragment);
};

const setPageInitializationState = () => {
  map.classList.remove(`map--faded`);
  addForm.classList.remove(`ad-form--disabled`);

  getAddress();
  setFormDisableState();
  setEnabledImg();
  load(onLoad, onError);
};

const setMainPinDefault = () => {
  pinMain.style.left = defaultMainPin.x;
  pinMain.style.top = defaultMainPin.y;
};

const setPageDeactivateState = () => {
  map.classList.add(`map--faded`);
  addForm.classList.add(`ad-form--disabled`);

  mapFilters.reset();
  addForm.reset();
  setMainPinDefault();
  getAddress();
  setFormDisableState();
  removePins();
  closePopup();
  setDisabledImg();
  pinMain.addEventListener(`mousedown`, onMainPinMouseDown);
};

const onMainPinMouseDown = (evt) => {
  if (isMouseLeftButtonEvent(evt)) {
    setPageInitializationState();

    pinMain.removeEventListener(`mousedown`, onMainPinMouseDown);
  }
};

const onMainPinKeysDown = (evt) => {
  if (isEnterEvent(evt)) {
    setPageInitializationState();

    pinMain.removeEventListener(`keydown`, onMainPinKeysDown);
  }
};

pinMain.addEventListener(`mousedown`, onMainPinMouseDown);
pinMain.addEventListener(`keydown`, onMainPinKeysDown);

window.mapinit = {
  AMOUNT,
  onLoad,
  pins: () => {
    return pins;
  },
  setPageInitializationState,
  setPageDeactivateState,
  getAddress
};

