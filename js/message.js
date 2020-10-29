'use strict';

(function () {
  const isEscapeEvent = window.util.isEscapeEvent;
  const isMouseLeftButtonEvent = window.util.isMouseLeftButtonEvent;
  const main = document.querySelector(`main`);

  const successPopup = document.querySelector(`#success`).content.querySelector(`.success`);
  const errorPopup = document.querySelector(`#error`).content.querySelector(`.error`);
  const errorPopupButton = errorPopup.querySelector(`.error__button`);

  const onEscapeKeydown = (evt) => {
    if (isEscapeEvent(evt)) {
      hideLoadSuccess();
      hideLoadError();
    }
  };

  const onLoad = () => {
    window.mapinit.deactivate();
    main.appendChild(successPopup);

    document.addEventListener(`keydown`, onEscapeKeydown);

    successPopup.addEventListener(`click`, onSuccessPopupClick);
  };

  const hideLoadSuccess = () => {
    successPopup.remove();

    document.removeEventListener(`keydown`, onEscapeKeydown);
    document.removeEventListener(`click`, onErrorPopupClick);
  };

  const onError = () => {
    main.appendChild(errorPopup);

    document.addEventListener(`keydown`, onEscapeKeydown);
    errorPopup.addEventListener(`click`, onErrorPopupClick);
    errorPopupButton.addEventListener(`click`, onErrorPopupButtonClick);
  };

  const hideLoadError = () => {
    errorPopup.remove();

    document.removeEventListener(`keydown`, onEscapeKeydown);
    document.removeEventListener(`click`, onErrorPopupClick);
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


  window.message = {
    onLoad: onLoad,
    onError: onError
  };

})();
