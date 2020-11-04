'use strict';

const isEscapeEvent = window.util.isEscapeEvent;
const isMouseLeftButtonEvent = window.util.isMouseLeftButtonEvent;

const main = document.querySelector(`main`);
const successPopup = document.querySelector(`#success`).content.querySelector(`.success`);
const errorPopup = document.querySelector(`#error`).content.querySelector(`.error`);
const errorPopupButton = errorPopup.querySelector(`.error__button`);

const onSuccessEscapeKeydown = (evt) => {
  if (isEscapeEvent(evt)) {
    hideLoadSuccess();
  }
};
const onErrorEscapeKeydown = (evt) => {
  if (isEscapeEvent(evt)) {
    hideLoadError();
  }
};

const onSuccessPopupClick = (evt) => {
  if (isMouseLeftButtonEvent(evt)
    && evt.target === successPopup) {
    hideLoadSuccess();
  }
};

const onErrorPopupClick = (evt) => {
  if (isMouseLeftButtonEvent(evt)
    && evt.target === errorPopup) {
    hideLoadError();
  }
};

const onErrorPopupButtonClick = (evt) => {
  if (isMouseLeftButtonEvent(evt)) {
    hideLoadError();
  }
};
const onLoad = () => {
  window.mapinit.setPageDeactivateState();
  main.appendChild(successPopup);

  document.addEventListener(`keydown`, onSuccessEscapeKeydown);

  successPopup.addEventListener(`click`, onSuccessPopupClick);
};

const hideLoadSuccess = () => {
  successPopup.remove();

  document.removeEventListener(`keydown`, onSuccessEscapeKeydown);
  document.removeEventListener(`click`, onErrorPopupClick);
};

const onError = () => {
  main.appendChild(errorPopup);

  document.addEventListener(`keydown`, onErrorEscapeKeydown);
  errorPopup.addEventListener(`click`, onErrorPopupClick);
  errorPopupButton.addEventListener(`click`, onErrorPopupButtonClick);
};

const hideLoadError = () => {
  errorPopup.remove();

  document.removeEventListener(`keydown`, onErrorEscapeKeydown);
  document.removeEventListener(`click`, onErrorPopupClick);
};

window.message = {
  onLoad,
  onError
};

