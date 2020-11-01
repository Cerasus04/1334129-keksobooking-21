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

const validationField = (obj) => {
  const isData = obj.data.every((value) => {
    return value;
  });

  if (isData) {
    obj.cb();
  } else {
    obj.field.classList.add(`hidden`);
  }
};

const createFragmentObj = (obj) => {
  const fragmentFeatures = document.createDocumentFragment();
  for (let i = 0; i < obj.length; i++) {
    const li = document.createElement(`li`);
    li.classList.add(`popup__feature`);
    const classAdded = `popup__feature--${obj[i]}`;
    li.classList.add(classAdded);
    fragmentFeatures.appendChild(li);
  }
  return fragmentFeatures;
};

const createFragmentPhotos = (pins) => {
  const fragmentPhotos = document.createDocumentFragment();
  for (let i = 0; i < pins.length; i++) {
    const img = document.createElement(`img`);
    img.src = pins[i];
    img.width = IMG.WIDTH;
    img.height = IMG.HEIGHT;
    img.classList.add(`popup__photo`);
    fragmentPhotos.appendChild(img);
  }
  return fragmentPhotos;
};

const createCard = (obj) => {
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
  const cardItem = cardTemplate.cloneNode(true);
  const roomNum = obj.offer.rooms;
  const guestNum = obj.offer.guests;
  map.insertBefore(cardItem, mapPins);

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

  validationField({
    field: cardTitle,
    data: [obj.offer.title],
    cb() {
      cardTitle.textContent = obj.offer.title;
    }
  });

  validationField({
    field: cardAddress,
    data: [obj.offer.address],
    cb() {
      cardAddress.innerHTML = obj.offer.address;
    }
  });

  validationField({
    field: cardPrice,
    data: [obj.offer.price],
    cb() {
      cardPrice.innerHTML = `${obj.offer.price} &#x20bd/ночь`;
    }
  });

  validationField({
    field: cardCapacity,
    data: [roomNum, roomNum],
    cb() {
      cardCapacity.textContent = `${roomNum}${numDecline(roomNum, [` комната `, ` комнаты `, ` комнат `])} для ${guestNum}${numDecline(guestNum, [` гостя `, ` гостей `, ` гостей `])}`;
    }
  });

  validationField({
    field: cardTime,
    data: [obj.offer.checkin, obj.offer.checkout],
    cb() {
      cardTime.textContent = `Заезд после ${obj.offer.checkin}, выезд до ${obj.offer.checkout}`;
    }
  });

  validationField({
    field: cardDescription,
    data: [obj.offer.description],
    cb() {
      cardDescription.textContent = obj.offer.description;
    }
  });

  validationField({
    field: cardAvatar,
    data: [obj.author.avatar],
    cb() {
      cardAvatar.src = obj.author.avatar;
    }
  });

  validationField({
    field: cardType,
    data: [obj.offer.type],
    cb() {
      cardType.textContent = TypeRental[obj.offer.type];
    }
  });

  validationField({
    field: cardFeatures,
    data: [obj.offer.features],
    cb() {
      cardFeatures.innerHTML = ``;
      cardFeatures.appendChild(createFragmentObj(obj.offer.features));
    }
  });

  validationField({
    field: cardPhotos,
    data: [obj.offer.photos],
    cb() {
      cardPhotos.innerHTML = ``;
      cardPhotos.appendChild(createFragmentPhotos(obj.offer.photos));
    }
  });

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

  document.removeEventListener(`keydown`, onCloseButtonKeyDown);
};

window.data = {
  map: map,
  mapFilters: mapFilters,
  mapPins: mapPins,
  createCard: createCard,
  closePopup: closePopup
};
