'use strict';

const SIZE_PIN = {
  WIDTH: 65,
  HEIGHT: 65,
  MARKER_HEIGHT: 10
};

const closePopup = window.card.closePopup;
const createCard = window.card.create;
const mapPins = window.card.mapPins;
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

const makePin = (data) => {
  const pin = pinTemplate.cloneNode(true);
  const imgEl = pin.querySelector(`img`);
  pin.style.left = `${data.location.x - SIZE_PIN.WIDTH / 2}px`;
  pin.style.top = `${data.location.y - (SIZE_PIN.HEIGHT + SIZE_PIN.MARKER_HEIGHT)}px`;
  imgEl.src = data.author.avatar;
  imgEl.alt = data.offer.title;

  pin.addEventListener(`click`, (evt) => {
    setPinActiveClass((evt.target.tagName === `IMG`) ? evt.target.parentElement : evt.target);
    closePopup();
    createCard(data);
  });

  return pin;
};

const renderPins = (offers) => {
  const fragment = document.createDocumentFragment();

  offers.forEach((item) => {
    fragment.appendChild(makePin(item));
  });

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
  SIZE_PIN,
  renderPins,
  removePins
};
