'use strict';

const AMOUNT = 5;

const isEnterEvent = window.util.isEnterEvent;
const isMouseLeftButtonEvent = window.util.isMouseLeftButtonEvent;
const SIZE_PIN = window.pin.SIZE_PIN;
const renderPins = window.pin.renderPins;
const map = window.data.map;
const closePopup = window.data.closePopup;
const addForm = window.form.addForm;
const pinMain = window.form.pinMain;
const removePins = window.pin.removePins;
const load = window.backend.load;

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

const setDisableState = () => {
  formFieldsets.forEach((item) => {
    item.disabled = !item.disabled;
  });
};
setDisableState();

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

const initialaze = () => {
  map.classList.remove(`map--faded`);
  addForm.classList.remove(`ad-form--disabled`);

  getAddress();
  setDisableState();
  load(onLoad, onError);
};

const setMainPinDefault = () => {
  pinMain.style.left = defaultMainPin.x;
  pinMain.style.top = defaultMainPin.y;
};

const deactivate = () => {
  map.classList.add(`map--faded`);
  addForm.classList.add(`ad-form--disabled`);

  addForm.reset();
  setMainPinDefault();
  getAddress();
  setDisableState();
  removePins();
  closePopup();
  pinMain.addEventListener(`mousedown`, onMainPinMouseDown);
};

const onMainPinMouseDown = (evt) => {
  if (isMouseLeftButtonEvent(evt)) {
    initialaze();

    pinMain.removeEventListener(`mousedown`, onMainPinMouseDown);
  }
};

const onMainPinKeysDown = (evt) => {
  if (isEnterEvent(evt)) {
    initialaze();

    pinMain.removeEventListener(`keydown`, onMainPinKeysDown);
  }
};

pinMain.addEventListener(`mousedown`, onMainPinMouseDown);
pinMain.addEventListener(`keydown`, onMainPinKeysDown);

window.mapinit = {
  AMOUNT: AMOUNT,
  onLoad: onLoad,
  pins: () => {
    return pins;
  },
  initialaze: initialaze,
  deactivate: deactivate,
  getAddress: getAddress
};

