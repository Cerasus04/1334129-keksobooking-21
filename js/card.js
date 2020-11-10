'use strict';

const IMG = {
  WIDTH: 45,
  HEIGHT: 40
};

const isEscapeEvent = window.util.isEscapeEvent;
const isMouseLeftButtonEvent = window.util.isMouseLeftButtonEvent;

const map = document.querySelector(`.map`);
const mapFilters = map.querySelector(`.map__filters`);
const mapPins = map.querySelector(`.map__pins`);
const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

const TypeRental = {
  'flat': `Квартира`,
  'bungalow': `Бунгало`,
  'house': `Дом`,
  'palace': `Дворец`
};

const numDecline = (number, words) => {
  number = Math.abs(number) % 100;

  if (number > 10 && number < 20) {
    return words[2];
  } else if (number % 10 > 1 && number % 10 < 5) {
    return words[1];
  } else if (number % 10 === 1) {
    return words[0];
  }
  return words[2];
};


const createFragmentObj = (featuresCard) => {
  const fragmentFeatures = document.createDocumentFragment();
  featuresCard.forEach((feature) => {
    const li = document.createElement(`li`);
    li.classList.add(`popup__feature`);
    const classAdded = `popup__feature--${feature}`;
    li.classList.add(classAdded);
    fragmentFeatures.appendChild(li);
  });

  return fragmentFeatures;

};

const createFragmentPhotos = (photoSources) => {
  const fragmentPhotos = document.createDocumentFragment();
  photoSources.forEach((pins) => {
    const img = document.createElement(`img`);
    img.src = pins;
    img.width = IMG.WIDTH;
    img.height = IMG.HEIGHT;
    img.classList.add(`popup__photo`);
    fragmentPhotos.appendChild(img);
  });

  return fragmentPhotos;

};

const hideElement = (element) => {
  element.classList.add(`hidden`);
};

const createCard = (obj) => {
  const cardItem = cardTemplate.cloneNode(true);
  const roomNum = obj.offer.rooms;
  const guestNum = obj.offer.guests;

  const cardTitle = cardItem.querySelector(`.popup__title`);
  const cardAddress = cardItem.querySelector(`.popup__text--address`);
  const cardPrice = cardItem.querySelector(`.popup__text--price`);
  const cardCapacity = cardItem.querySelector(`.popup__text--capacity`);
  const cardTime = cardItem.querySelector(`.popup__text--time`);
  const cardFeatures = cardItem.querySelector(`.popup__features`);
  const cardDescription = cardItem.querySelector(`.popup__description`);
  const cardAvatar = cardItem.querySelector(`.popup__avatar`);
  const cardType = cardItem.querySelector(`.popup__type`);
  const cardPhotos = cardItem.querySelector(`.popup__photos`);

  if (obj.offer.title) {
    cardTitle.textContent = obj.offer.title;
  } else {
    hideElement(cardTitle);
  }

  if (obj.offer.price) {
    cardPrice.textContent = `${obj.offer.price} ₽/ночь`;
  } else {
    hideElement(cardPrice);
  }

  if (obj.offer.address) {
    cardAddress.textContent = obj.offer.address;
  } else {
    hideElement(cardAddress);
  }

  if (obj.offer.type) {
    cardType.textContent = TypeRental[obj.offer.type];
  } else {
    hideElement(cardType);
  }

  if (obj.offer.rooms || obj.offer.guests) {
    cardCapacity.textContent = `${roomNum}${numDecline(roomNum, [` комната `, ` комнаты `, ` комнат `])} для ${guestNum}${numDecline(guestNum, [` гостя `, ` гостей `, ` гостей `])}`;
  } else {
    hideElement(cardCapacity);
  }

  if (obj.offer.checkin || obj.offer.checkout) {
    cardTime.textContent = `Заезд после ${obj.offer.checkin} выезд после ${obj.offer.checkout}`;
  } else {
    hideElement(cardTime);
  }

  if (obj.offer.description) {
    cardDescription.textContent = obj.offer.description;
  } else {
    hideElement(cardDescription);
  }

  if (obj.author.avatar) {
    cardAvatar.src = obj.author.avatar;
  } else {
    hideElement(cardAvatar);
  }

  if (obj.offer.features) {
    cardFeatures.textContent = ``;
    cardFeatures.appendChild(createFragmentObj(obj.offer.features));
  } else {
    hideElement(cardFeatures);
  }

  if (obj.offer.photos) {
    cardPhotos.textContent = ``;
    cardPhotos.appendChild(createFragmentPhotos(obj.offer.photos));
  } else {
    hideElement(cardPhotos);
  }

  map.insertBefore(cardItem, mapPins);
  mapFilters.insertBefore(cardItem, null);

  const closeButton = cardItem.querySelector(`.popup__close`);

  closeButton.addEventListener(`click`, onCloseButtonClick);
  document.addEventListener(`keydown`, onCloseButtonKeyDown);
};

const onCloseButtonKeyDown = (evt) => {
  if (isEscapeEvent(evt)) {
    closePopup();
  }
};

const onCloseButtonClick = (evt) => {
  if (isMouseLeftButtonEvent(evt)) {
    closePopup();
  }
};

const closePopup = () => {
  const popup = map.querySelector(`.popup`);

  if (popup) {
    popup.remove();
  }

  let pins = mapPins.querySelectorAll(`.map__pin`);

  pins.forEach((item) => {
    item.classList.remove(`map__pin--active`);
  });

  document.removeEventListener(`keydown`, onCloseButtonKeyDown);
};

window.card = {
  map,
  mapFilters,
  mapPins,
  create: createCard,
  closePopup
};
