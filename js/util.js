'use strict';

(function () {
  const Keys = {
    ESC: `Escape`,
    ENTER: `Enter`,
    NUMPUD_ENTER: `NumpudEnter`
  };

  const MOUSE_LEFT_BUTTON = 0;

  const isEnterEvent = function (evt) {
    return evt.code === Keys.ENTER
      || evt.code === Keys.NUMPAD_ENTER;
  };

  const isMouseLeftButtonEvent = function (evt) {
    return evt.button === MOUSE_LEFT_BUTTON;
  };

  const isEscapeEvent = function (evt) {
    return evt.code === Keys.ESCAPE;
  };

  window.util = {
    isEnterEvent: isEnterEvent,
    isEscapeEvent: isEscapeEvent,
    isMouseLeftButtonEvent: isMouseLeftButtonEvent
  };
})();
