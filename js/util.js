'use strict';

(function () {
  const Keys = {
    ESC: `Escape`,
    ENTER: `Enter`,
    NUMPUD_ENTER: `NumpudEnter`
  };

  const MOUSE_LEFT_BUTTON = 0;

  const isEnterEvent = (evt) => {
    return evt.code === Keys.ENTER
      || evt.code === Keys.NUMPAD_ENTER;
  };

  const isMouseLeftButtonEvent = (evt) => {
    return evt.button === MOUSE_LEFT_BUTTON;
  };

  const isEscapeEvent = (evt) => {
    return evt.code === Keys.ESC;
  };

  window.util = {
    isEnterEvent: isEnterEvent,
    isEscapeEvent: isEscapeEvent,
    isMouseLeftButtonEvent: isMouseLeftButtonEvent
  };
})();
