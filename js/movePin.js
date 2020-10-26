'use strict';

(function () {
  const isMouseLeftButtonEvent = window.util.isMouseLeftButtonEvent;
  const getAddress = window.mapinit.getAddress;
  const initialaze = window.mapinit.initialaze;
  const map = document.querySelector(`.map`);
  const mapPins = map.querySelector(`.map__pins`);
  const pinMain = mapPins.querySelector(`.map__pin--main`);

  const SIZE_PIN = window.pin.SIZE_PIN;
  // const SIZE_PIN = window.marker.SIZE_PIN;
  const PIN_X_GAP = SIZE_PIN.WIDTH / 2;
  const PIN_Y_GAP = SIZE_PIN.HEIGHT + SIZE_PIN.MARKER_HEIGHT;

  const restrictionCoords = {
    minX: 1,
    maxX: mapPins.offsetWidth,
    minY: 130,
    maxY: 630
  };

  const correctCoordinates = (shift) => {
    let x = pinMain.offsetLeft - shift.x;
    let y = pinMain.offsetTop - shift.y;

    if (x < restrictionCoords.minX - PIN_X_GAP) {
      x = restrictionCoords.minX;
    } else if (x > restrictionCoords.maxX - PIN_X_GAP) {
      x = restrictionCoords.maxX - PIN_X_GAP;
    }

    if (y < restrictionCoords.minY - PIN_Y_GAP) {
      y = restrictionCoords.minY - PIN_Y_GAP;
    } else if (y > restrictionCoords.maxY - PIN_Y_GAP) {
      y = restrictionCoords.maxY - PIN_Y_GAP;
    }

    pinMain.style.top = y + `px`;
    pinMain.style.left = x + `px`;
  };

  const onMouseDown = function (evt) {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      const shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (isMouseLeftButtonEvent(evt) && map.classList.contains(`.map--faded`)) {
        initialaze();
      }

      correctCoordinates(shift);
      getAddress();
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();
      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  };

  pinMain.addEventListener(`mousedown`, onMouseDown);

})();
