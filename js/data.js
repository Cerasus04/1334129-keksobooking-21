'use strict';

(function () {
  const isEscapeEvent = window.util.isEscapeEvent;
  const isMouseLeftButtonEvent = window.util.isMouseLeftButtonEvent;
  const map = document.querySelector(`.map`);
  const mapFilters = map.querySelector(`.map__filters`);
  const mapPins = map.querySelector(`.map__pins`);
  const IMG = {
    WIDTH: 45,
    HEIGHT: 40
  };
  const typeRental = {
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

    cardItem.querySelector(`.popup__title`).textContent = obj.offer.title;
    cardItem.querySelector(`.popup__text--address`).textContent = obj.offer.address;
    cardItem.querySelector(`.popup__text--price`).innerHTML = `${obj.offer.price} &#x20bd/ночь`;
    cardItem.querySelector(`.popup__type`).textContent = typeRental[obj.offer.type];
    cardItem.querySelector(`.popup__text--capacity`).textContent = `${roomNum}${numDecline(roomNum, [` комната `, ` комнаты `, ` комнат `])} для ${guestNum}${numDecline(guestNum, [` гостя `, ` гостей `, ` гостей `])}`;
    cardItem.querySelector(`.popup__text--time`).textContent = `Заезд после ${obj.offer.checkin} выезд после ${obj.offer.checkout}`;
    cardItem.querySelector(`.popup__description`).textContent = obj.offer.description;
    cardItem.querySelector(`.popup__avatar`).src = obj.author.avatar;

    const cardFeatures = cardItem.querySelector(`.popup__features`);
    cardFeatures.innerHTML = ``;
    cardFeatures.appendChild(createFragmentObj(obj.offer.features));

    const cardPhotos = cardItem.querySelector(`.popup__photos`);
    cardPhotos.innerHTML = ``;
    cardPhotos.appendChild(createFragmentPhotos(obj.offer.photos));

    mapFilters.insertBefore(cardItem, null);

    let closeButton = cardItem.querySelector(`.popup__close`);

    closeButton.addEventListener(`click`, onCloseButtonClick);
    document.addEventListener(`keydown`, onCloseButtonKeyDown);
  };

  const closePopup = () => {
    let popup = map.querySelector(`.popup`);

    if (popup) {
      popup.remove();
    }

    document.removeEventListener(`keydown`, onCloseButtonKeyDown);
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

  window.data = {
    map: map,
    mapFilters: mapFilters,
    mapPins: mapPins,
    createCard: createCard,
    closePopup: closePopup
  };
})();
