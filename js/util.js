'use strict';

const MOUSE_LEFT_BUTTON = 0;

const Keys = {
  ESC: `Escape`,
  ENTER: `Enter`,
  NUMPAD_ENTER: `NumpadEnter`
};

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

