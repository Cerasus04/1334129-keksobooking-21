'use strict';

(function () {
  const isEnterEvent = window.util.isEnterEvent;
  const isMouseLeftButtonEvent = window.util.isMouseLeftButtonEvent;
  const getAddress = window.form.getAddress;
  const setDisableState = window.form.setDisableState;
  const createPins = window.data.createPins;

  const map = document.querySelector(`.map`);
  const addForm = document.querySelector(`.ad-form`);
  const mapPins = map.querySelector(`.map__pins`);
  const pinMain = mapPins.querySelector(`.map__pin--main`);

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

})();
