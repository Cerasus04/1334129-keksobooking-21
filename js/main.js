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
const PIN = { AMOUNT: 8, WIDTH: 40, HEIGHT: 40 };
const PRICES = { MIN: 2500, MAX: 10000 };
const LOCATIONS = { X_MIN: 0, X_MAX: 980, Y_MIN: 130, Y_MAX: 630 };

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
    (string === undefined) ? randomArr.push(arr[getRandomNumber(arr.length)]) : randomArr.push(string + arr[getRandomNumber(arr.length)]);
  }

  return Array.from(new Set(randomArr));
};

const getCards = function (quantity) {
  const cards = [];
  for (let i = 0; i < quantity; i++) {
    cards.push(
      {
        author: {
          avatar: `img/avatars/user0${i + 1}.png`,
        },
        offer: {
          title: TITLES[i],
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
      }
    );
  }
  return cards;
};

const renderPin = function (obj) {
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const pin = pinTemplate.cloneNode(true);
  pin.style.left = `${obj.location.x + PIN.WIDTH / 2}px`;
  pin.style.top = `${obj.location.y + PIN.HEIGHT}px`;
  pin.querySelector(`img`).src = obj.author.avatar;
  pin.querySelector(`img`).alt = obj.offer.title;
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

createPins(getCards(PIN.AMOUNT));
