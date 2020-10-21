'use strict';

(function () {
  const isEnterEvent = window.util.isEnterEvent;
  const isMouseLeftButtonEvent = window.util.isMouseLeftButtonEvent;
  const SIZE_PIN = window.pin.SIZE_PIN;
  const renderPins = window.pin.renderPins;
  const map = window.data.map;
  const closePopup = window.data.closePopup;
  const addForm = window.form.addForm;
  const pinMain = window.form.pinMain;
  const removePins = window.pin.removePins;

  const addressInput = addForm.querySelector(`#address`);
  const formFieldsets = document.querySelectorAll(`fieldset, select`);
  const buttonReset = addForm.querySelector(`.ad-form__reset`);

  const AMOUNT = 5;
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
      pins.push(data[i]);
    }
    map.classList.remove(`map--faded`);
    addForm.classList.remove(`ad-form--disabled`);

    getAddress();
    renderPins(pins.slice(0, AMOUNT));
    setDisableState();
  };

  const onError = (errorMessage) => {
    const error = document.querySelector('#error');
    error.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: rgba(3, 28, 45, 0.5);';
    error.style.position = 'absolute';
    error.style.left = 0;
    error.style.right = 0;
    error.style.fontSize = '24px';

    error.textContent = `Не удалось загрузить данные: ${errorMessage}`;
    document.body.insertAdjacentElement('afterbegin', error);
  };

  const initialaze = () => {
    window.backend.load(onLoad, onError);
  };

  const deactivate = (evt) => {
    evt.preventDefault();

    map.classList.add(`map--faded`);
    addForm.classList.add(`ad-form--disabled`);
    addForm.reset();
    getAddress();
    setDisableState();
    removePins();
    closePopup();
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

  buttonReset.addEventListener(`click`, deactivate);

  window.mapinit = {
    initialaze: initialaze,
    getAddress: getAddress
  };

})();
