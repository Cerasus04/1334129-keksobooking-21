'use strict';

(function () {
  const isEnterEvent = window.util.isEnterEvent;
  const isMouseLeftButtonEvent = window.util.isMouseLeftButtonEvent;
  const getAddress = window.form.getAddress;
  const createPins = window.data.createPins;
  const formFieldsets = document.querySelectorAll(`fieldset, select`);
  const map = document.querySelector(`.map`);
  const addForm = document.querySelector(`.ad-form`);
  const mapPins = map.querySelector(`.map__pins`);
  const pinMain = mapPins.querySelector(`.map__pin--main`);

  const PIN = {
    WIDTH: 65,
    HEIGHT: 65,
    MARKER_HEIGHT: 22
  };

  const PIN_X_GAP = PIN.WIDTH / 2;
  const PIN_Y_GAP = PIN.HEIGHT + PIN.MARKER_HEIGHT;

  const restrictionCoords = {
    minX: 1,
    maxX: map.offsetWidth,
    minY: 130,
    maxY: 630
  };

  const setDisableState = () => {
    formFieldsets.forEach((item) => {
      item.disabled = !item.disabled;
    });
  };

  const initialaze = () => {
    map.classList.remove(`map--faded`);
    addForm.classList.remove(`ad-form--disabled`);

    createPins();
    setDisableState();
  };

  // const getActivateState = () => {
  //   return map.classList.contains(`map--faded`);
  // };

  const correctCoordinates = (x, y) => {
    if (x < restrictionCoords.minX) {
      x = restrictionCoords.minX;
    } else if (x > restrictionCoords.maxX) {
      x = restrictionCoords.maxX - PIN_X_GAP;
    }

    if (y < restrictionCoords.minY) {
      y = restrictionCoords.minY;
    } else if (y > restrictionCoords.maxY) {
      y = restrictionCoords.maxY - PIN_Y_GAP;
    }

    pinMain.style.top = x + `px`;
    pinMain.style.left = y + `px`;
  };

  const onPinMouseDown = (evt) => {
    evt.preventDefault();
    if (isMouseLeftButtonEvent(evt)) {
      initialaze();
    }

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onMouseMove = (moveEvent) => {
      moveEvent.preventDefault();

      const shift = {
        x: startCoords.x - moveEvent.clientX,
        y: startCoords.y - moveEvent.clientY
      };

      startCoords = {
        x: moveEvent.clientX,
        y: moveEvent.clientY
      };

      let x = parseInt(pinMain.style.left, 10);
      let y = parseInt(pinMain.style.top, 10);

      pinMain.style.left = (x - shift.x) + `px`;
      pinMain.style.top = (y - shift.y) + `px`;

      correctCoordinates(x, y);

      // if (getActivateState()) {
      //   initialaze();
      // }
      getAddress();
    };

    const onMouseUp = (upEvent) => {
      upEvent.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  };

  const onMainPinKeysDown = (evt) => {
    if (isEnterEvent(evt)) {
      initialaze();

      pinMain.removeEventListener(`keydown`, onMainPinKeysDown);
    }
  };
  pinMain.addEventListener(`keydown`, onMainPinKeysDown);
  pinMain.addEventListener(`mousedown`, onPinMouseDown);


})();
