'use strict';

(function () {
  const isEnterEvent = window.util.isEnterEvent;
  const isMouseLeftButtonEvent = window.util.isMouseLeftButtonEvent;
  const getAddress = window.form.getAddress;
  const createPins = window.datapin.createPins;
  const map = window.cards.map;
  const addForm = window.form.addForm;
  const pinMain = window.form.pinMain;
  const formFieldsets = document.querySelectorAll(`fieldset, select`);

  const setDisableState = () => {
    formFieldsets.forEach((item) => {
      item.disabled = !item.disabled;
    });
  };

  const initialaze = () => {
    map.classList.remove(`map--faded`);
    addForm.classList.remove(`ad-form--disabled`);

    getAddress();
    createPins();
    setDisableState();
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
    initialaze: initialaze
  };

})();
