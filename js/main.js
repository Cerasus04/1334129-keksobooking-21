'use strict';

const TITLES = [`Комната в комуналке`, `Комната в общежитии`, `Квартира с косметическим ремонтом`, `Евро аппартаменты`, `Квартира с мебелью`, `Дом со всей техникой и мебелью`, `Дом с участком`, `Нежилое помещение`];
const TYPES = [`palace`, `flat`, `house`, `bungalow`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS_LINK = `http://o0.github.io/assets/images/tokyo/`;
const PHOTOS = [`hotel1.jpg`, `hotel2.jpg`, `hotel3.jpg`];
const TIMES = [`12:00`, `13:00`, `14:00`];
const ROOMS = [1, 2, 3, 4];
const MIN_GUESTS = 1;
const MAX_GUESTS = 5;
const AMOUNT = 8;
const PIN = {
  WIDTH: 40,
  HEIGHT: 40
};
const PRICES = {
  MIN: 2500,
  MAX: 10000
};
const LOCATIONS = {
  X_MIN: 0,
  X_MAX: 980,
  Y_MIN: 130,
  Y_MAX: 630
};
const typeRental = {
  'flat': `Квартира`,
  'bungalow': `Бунгало`,
  'house': `Дом`,
  'palace': `Дворец`
};

const IMG = {
  WIDTH: 70,
  HEIGHT: 70
};
const map = document.querySelector(`.map`);
map.classList.remove(`map--faded`);

const getRandomNumber = function (number) {
  return Math.floor(Math.random() * number);
};

const getRandomIndex = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

const getRandomRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomArr = function (arr, number, string) {
  const randomArr = [];
  for (let i = 0; i < number; i++) {
    if (string === undefined) {
      randomArr.push(arr[getRandomNumber(arr.length)]);
    } else {
      randomArr.push(string + arr[getRandomNumber(arr.length)]);
    }
  }
  return randomArr;
}; //изменить на функцию Фишера–Йейтса

const getCards = function () {
  const cards = [];
  for (let i = 0; i < AMOUNT; i++) {
    cards.push({
      author: {
        avatar: `img/avatars/user0${getRandomRange(1, AMOUNT)}.png`,
      },
      offer: {
        title: TITLES[getRandomRange(0, TITLES.length - 1)],
        address: `${getRandomRange(LOCATIONS.X_MIN, LOCATIONS.X_MAX)}, ${getRandomRange(LOCATIONS.Y_MIN, LOCATIONS.Y_MAX)}`,
        price: getRandomRange(PRICES.MIN, PRICES.MAX),
        type: getRandomIndex(TYPES),
        rooms: getRandomIndex(ROOMS),
        guests: getRandomRange(MIN_GUESTS, MAX_GUESTS),
        checkin: getRandomIndex(TIMES),
        checkout: getRandomIndex(TIMES),
        features: getRandomArr(FEATURES, getRandomNumber(FEATURES.length)),
        description: `строка с описанием`,
        photos: getRandomArr(PHOTOS, getRandomNumber(PHOTOS.length), PHOTOS_LINK)
      },
      location: {
        x: getRandomRange(LOCATIONS.X_MIN, LOCATIONS.X_MAX),
        y: getRandomRange(LOCATIONS.Y_MIN, LOCATIONS.Y_MAX)
      }
    });
  }
  return cards;
};

const renderPin = function (obj) {
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const pin = pinTemplate.cloneNode(true);
  const imgEl = pin.querySelector(`img`);
  pin.style.left = `${obj.location.x + PIN.WIDTH / 2}px`;
  pin.style.top = `${obj.location.y + PIN.HEIGHT}px`;
  imgEl.src = obj.author.avatar;
  imgEl.alt = obj.offer.title;
  return pin;
};

const createPins = function (pins) {
  const fragment = document.createDocumentFragment();
  const mapPins = map.querySelector(`.map__pins`);
  for (let pin of pins) {
    fragment.appendChild(renderPin(pin));
  }
  mapPins.appendChild(fragment);
};

createPins(getCards(AMOUNT));

const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
const mapPins = map.querySelector(`.map__pins`);

const createFragmentObj = function (obj) {
  const fragmentFeatures = document.createDocumentFragment();
  for (let i = 0; i < obj.length; i++) {
    const li = document.createElement(`li`);
    li.classList.add(`popup__feature`);
    const classAdded = `popup__feature--${obj[i]}`;
    li.classList.add(classAdded);
    fragmentFeatures.appendChild(li);
  }
  return fragmentFeatures;
}; //не должны повторяться картинки

const createFragmentPhotos = function (pins) {
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
}; //не должны повторяться фотографии


const createCard = function (obj) {
  const cardItem = cardTemplate.cloneNode(true);
  const roomNum = obj.offer.rooms;
  const guestNum = obj.offer.guests;
  const guestPhrase = guestNum === 1 ? ` гостя ` : ` гостей `;
  const roomPhrase = roomNum === 1 ? ` комната ` : ` комнаты `;
  map.insertBefore(cardItem, mapPins);

  cardItem.querySelector(`.popup__title`).textContent = obj.offer.title;
  cardItem.querySelector(`.popup__text--address`).textContent = obj.offer.address;
  cardItem.querySelector(`.popup__text--price`).innerHTML = `${obj.offer.price} &#x20bd/ночь`;
  cardItem.querySelector(`.popup__type`).textContent = typeRental[obj.offer.type];
  cardItem.querySelector(`.popup__text--capacity`).textContent = `${roomNum}${roomPhrase} для ${guestNum}${guestPhrase}`;
  cardItem.querySelector(`.popup__text--time`).textContent = `Заезд после ${obj.offer.checkin} выезд после ${obj.offer.checkout}`;
  const fragmentCard = document.createDocumentFragment();
  const cardFeatures = cardItem.querySelector(`.popup__features`);
  cardFeatures.innerHTML = ``;
  cardFeatures.appendChild(createFragmentObj(obj.offer.features));
  cardItem.querySelector(`.popup__description`).textContent = obj.offer.description;
  const cardPhotos = cardItem.querySelector(`.popup__photos`);
  cardPhotos.innerHTML = ``;
  cardPhotos.appendChild(createFragmentPhotos(obj.offer.photos));
  cardItem.querySelector(`.popup__avatar`).src = obj.author.avatar;
  fragmentCard.appendChild(cardItem);
  map.appendChild(fragmentCard);
};

const cards = getCards();

createCard(cards[0]);
