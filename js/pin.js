'use strict';

(function () {
  const closePopup = window.data.closePopup;
  const createCard = window.data.createCard;
  const mapPins = window.data.mapPins;

  const SIZE_PIN = {
    WIDTH: 65,
    HEIGHT: 65,
    MARKER_HEIGHT: 22
  };

  const makePin = (item) => {
    const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
    const pin = pinTemplate.cloneNode(true);
    const imgEl = pin.querySelector(`img`);
    if (item.hasOwnProperty(`offer`)) {
      pin.style.left = `${item.location.x - SIZE_PIN.WIDTH / 2}px`;
      pin.style.top = `${item.location.y - (SIZE_PIN.HEIGHT + SIZE_PIN.MARKER_HEIGHT)}px`;
      imgEl.src = item.author.avatar;
      imgEl.alt = item.offer.title;
    }

    pin.addEventListener(`click`, function (evt) {
      setPinActiveClass((evt.target.tagName === `IMG`) ? evt.target.parentElement : evt.target);
      closePopup();
      createCard(item);
    });

    return pin;

  };

  const renderPins = (offers) => {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < offers.length; i++) {
      fragment.appendChild(makePin(offers[i]));
    }
    mapPins.appendChild(fragment);
  };

  const removePins = () => {
    const pins = mapPins.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    pins.forEach((item) => {
      item.remove();
    });
  };

  const setPinActiveClass = (button) => {
    let activePin = mapPins.querySelector(`.map__pin--active`);

    if (activePin) {
      activePin.classList.remove(`map__pin--active`);
    }

    button.classList.add(`map__pin--active`);
  };

  window.pin = {
    SIZE_PIN: SIZE_PIN,
    renderPins: renderPins,
    removePins: removePins
  };

})();
