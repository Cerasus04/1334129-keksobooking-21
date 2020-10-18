'use strict';

(function () {
  const closePopup = window.cards.closePopup;
  const createCard = window.cards.createCard;
  const mapPins = window.cards.mapPins;
  const cards = window.datacard.cards;

  const PIN = {
    WIDTH: 65,
    HEIGHT: 65,
    MARKER_HEIGHT: 22
  };

  const renderPin = (obj) => {
    const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
    const pin = pinTemplate.cloneNode(true);
    const imgEl = pin.querySelector(`img`);
    pin.style.left = `${obj.location.x - PIN.WIDTH / 2}px`;
    pin.style.top = `${obj.location.y - (PIN.HEIGHT + PIN.MARKER_HEIGHT)}px`;
    imgEl.src = obj.author.avatar;
    imgEl.alt = obj.offer.title;

    pin.addEventListener(`click`, function (evt) {
      setPinActiveClass((evt.target.tagName === `IMG`) ? evt.target.parentElement : evt.target);
      closePopup();
      createCard(obj);
    });

    return pin;
  };

  const setPinActiveClass = (button) => {
    let activePin = mapPins.querySelector(`.map__pin--active`);

    if (activePin) {
      activePin.classList.remove(`map__pin--active`);
    }

    button.classList.add(`map__pin--active`);
  };

  const createPins = () => {
    const fragment = document.createDocumentFragment();
    for (let pin of cards) {
      fragment.appendChild(renderPin(pin));
    }
    mapPins.appendChild(fragment);
  };

  window.datapin = {
    PIN,
    createPins
  };

})();
