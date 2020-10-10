'use strict';

const TITLES = [`Комната в комуналке`, `Комната в общежитии`, `Квартира с косметическим ремонтом`, `Евро аппартаменты`, `Квартира с мебелью`, `Дом со всей техникой и мебелью`, `Дом с участком`, `Нежилое помещение`];
const TYPES = [`palace`, `flat`, `house`, `bungalow`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
// const TIMES = [`12:00`, `13:00`, `14:00`];
// const ROOMS = [1, 2, 3, 4];
// const MIN_GUESTS = 1;
// const MAX_GUESTS = 5;
// const AMOUNT = 8;
const PIN = {
  WIDTH: 40,
  HEIGHT: 40,
  MARKER_HEIGHT: 22
};
const MAP_PIN_SIZE = 65;
// const PRICES = {
//   MIN: 2500,
//   MAX: 10000
// };
// const LOCATIONS = {
//   X_MIN: 0,
//   X_MAX: 1050,
//   Y_MIN: 130,
//   Y_MAX: 630
// };
// const typeRental = {
//   'flat': `Квартира`,
//   'bungalow': `Бунгало`,
//   'house': `Дом`,
//   'palace': `Дворец`
// };

// const IMG = {
//   WIDTH: 70,
//   HEIGHT: 70
// };

const map = document.querySelector(`.map`);
const mapPins = map.querySelector(`.map__pins`);
const addForm = document.querySelector(`.ad-form`);
const addFormFieldsets = addForm.querySelectorAll(`fieldset`);
const mapFilters = map.querySelector(`.map__filters`);
const pinMain = mapPins.querySelector(`.map__pin--main`);
const addressInput = addForm.querySelector(`#address`);
const roomsNumber = addForm.querySelector(`#room_number`);
const guestsNumber = addForm.querySelector(`#capacity`);
const optionsCapacity = guestsNumber.querySelectorAll(`option`);
const inputTitle = addForm.querySelector(`#title`);
const buttonReset = addForm.querySelector(`.ad-form__reset`);

// const getRandomIndex = (arr) => {
//   return arr[Math.floor(Math.random() * arr.length)];
// };

// const getRandomRange = (min, max) => {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// };

// const getShuffleArray = (array) => {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     const x = array[i];
//     array[i] = array[j];
//     array[j] = x;
//   }
//   return array;
// };

// const cards = [];

// const getCards = () => {
//   for (let i = 0; i < AMOUNT; i++) {
//     cards.push({
//       author: {
//         avatar: `img/avatars/user0${(i + 1)}.png`,
//       },
//       offer: {
//         title: TITLES[getRandomRange(0, TITLES.length - 1)],
//         address: `${getRandomRange(LOCATIONS.X_MIN, LOCATIONS.X_MAX)}, ${getRandomRange(LOCATIONS.Y_MIN, LOCATIONS.Y_MAX)}`,
//         price: getRandomRange(PRICES.MIN, PRICES.MAX),
//         type: getRandomIndex(TYPES),
//         rooms: getRandomIndex(ROOMS),
//         guests: getRandomRange(MIN_GUESTS, MAX_GUESTS),
//         checkin: getRandomIndex(TIMES),
//         checkout: getRandomIndex(TIMES),
//         features: getShuffleArray(FEATURES).slice(0, getRandomRange(1, FEATURES.length)),
//         description: `строка с описанием`,
//         photos: getShuffleArray(PHOTOS).slice(0, getRandomRange(1, PHOTOS.length))
//       },
//       location: {
//         x: getRandomRange(LOCATIONS.X_MIN, LOCATIONS.X_MAX),
//         y: getRandomRange(LOCATIONS.Y_MIN, LOCATIONS.Y_MAX)
//       }
//     });
//   }
//   return cards;
// };

// const renderPin = (obj) => {
//   const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
//   const pin = pinTemplate.cloneNode(true);
//   const imgEl = pin.querySelector(`img`);
//   pin.style.left = `${obj.location.x - PIN.WIDTH / 2}px`;
//   pin.style.top = `${obj.location.y - (PIN.HEIGHT + PIN.MARKER_HEIGHT)}px`;
//   imgEl.src = obj.author.avatar;
//   imgEl.alt = obj.offer.title;
//   return pin;
// };

// const createPins = (pins) => {
//   const fragment = document.createDocumentFragment();
//   for (let pin of pins) {
//     fragment.appendChild(renderPin(pin));
//   }
//   mapPins.appendChild(fragment);
// };

// createPins(getCards());

// const createFragmentObj = (obj) => {
//   const fragmentFeatures = document.createDocumentFragment();
//   for (let i = 0; i < obj.length; i++) {
//     const li = document.createElement(`li`);
//     li.classList.add(`popup__feature`);
//     const classAdded = `popup__feature--${obj[i]}`;
//     li.classList.add(classAdded);
//     fragmentFeatures.appendChild(li);
//   }
//   return fragmentFeatures;
// };

// const createFragmentPhotos = (pins) => {
//   const fragmentPhotos = document.createDocumentFragment();
//   for (let i = 0; i < pins.length; i++) {
//     const img = document.createElement(`img`);
//     img.src = pins[i];
//     img.width = IMG.WIDTH;
//     img.height = IMG.HEIGHT;
//     img.classList.add(`popup__photo`);
//     fragmentPhotos.appendChild(img);
//   }
//   return fragmentPhotos;
// };

// const mapFilters = map.querySelector(`.map__filters-container`);

// const createCard = (obj) => {
//   const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
//   const cardItem = cardTemplate.cloneNode(true);
//   const roomNum = obj.offer.rooms;
//   const guestNum = obj.offer.guests;
//   const guestPhrase = ` гостей `;
//   const roomPhrase = ` комнаты `;
//   map.insertBefore(cardItem, mapPins);

//   cardItem.querySelector(`.popup__title`).textContent = obj.offer.title;
//   cardItem.querySelector(`.popup__text--address`).textContent = obj.offer.address;
//   cardItem.querySelector(`.popup__text--price`).innerHTML = `${obj.offer.price} &#x20bd/ночь`;
//   cardItem.querySelector(`.popup__type`).textContent = typeRental[obj.offer.type];
//   cardItem.querySelector(`.popup__text--capacity`).textContent = `${roomNum}${roomPhrase} для ${guestNum}${guestPhrase}`;
//   cardItem.querySelector(`.popup__text--time`).textContent = `Заезд после ${obj.offer.checkin} выезд после ${obj.offer.checkout}`;
//   cardItem.querySelector(`.popup__description`).textContent = obj.offer.description;
//   cardItem.querySelector(`.popup__avatar`).src = obj.author.avatar;

//   const cardFeatures = cardItem.querySelector(`.popup__features`);
//   cardFeatures.innerHTML = ``;
//   cardFeatures.appendChild(createFragmentObj(obj.offer.features));

//   const cardPhotos = cardItem.querySelector(`.popup__photos`);
//   cardPhotos.innerHTML = ``;
//   cardPhotos.appendChild(createFragmentPhotos(obj.offer.photos));

//   mapFilters.insertBefore(cardItem, null);
// };

// createCard(cards[0]);

const toggleState = (element, isActive) => {
  if (isActive) {
    element.removeAttribute(`disabled`);
  } else {
    element.setAttribute(`disabled`, true);
  }
};

// Заполнение поля адреса

const getAddress = (isActive) => {
  let X = parseInt(pinMain.style.left, 10);
  let Y = parseInt(pinMain.style.top, 10);

  if (isActive) {
    X = `${Math.floor(X - PIN.WIDTH / 2)}`;
    Y = `${Math.floor(Y - (PIN.HEIGHT + PIN.MARKER_HEIGHT))}`;
  } else {
    X = `${Math.floor(X + MAP_PIN_SIZE / 2)}`;
    Y = `${Math.floor(Y + MAP_PIN_SIZE / 2)}`;
  }
  addressInput.value = (`${X}, ${Y}`);
};

getAddress();

const pageState = (isActive) => {
  if (isActive) {
    map.classList.remove(`map--faded`);
    addForm.classList.remove(`ad-form--disabled`);
  } else {
    map.classList.add(`map--faded`);
    addForm.classList.add(`ad-form--disabled`);
    getAddress();
  }

  for (let i = 0; i < addFormFieldsets.length; i++) {
    toggleState(addFormFieldsets[i], isActive);
  }

  for (let i = 0; i < mapFilters.children.length; i++) {
    toggleState(mapFilters.children[i], isActive);
  }
};

pageState(false);

pinMain.addEventListener(`mousedown`, (evt) => {
  if (evt.button === 0) {
    pageState(true);
    getAddress(true);
  }
});

pinMain.addEventListener(`keydown`, (evt) => {
  if (evt.keyCode === 13) {
    pageState(true);
  }
});

// Проверка соответствия одного объекта ко второму

const MAP_VALUE_MATCHING = {
  1: [`1`],
  2: [`1`, `2`],
  3: [`1`, `2`, `3`],
  100: [`0`]
};

const validateRooms = () => {
  optionsCapacity.forEach(function (option) {
    const isShow = !(MAP_VALUE_MATCHING[roomsNumber.value].indexOf(option.value) >= 0);
    option.selected = MAP_VALUE_MATCHING[roomsNumber.value][0] === option.value;
    option.disabled = isShow;
    option.hidden = isShow;
  });
};

validateRooms();

roomsNumber.addEventListener(`change`, function () {
  validateRooms();
});

// Проверка заполнения заголовка

inputTitle.addEventListener(`input`, () => {
  if (inputTitle.value.length < inputTitle.minLength) {
    inputTitle.setCustomValidity(`Введите не менее 30 символов, осталось ${inputTitle.minLength - inputTitle.value.length} символов`);
  } else if (inputTitle.value.length === inputTitle.maxLength) {
    inputTitle.setCustomValidity(`Максимальное колличество символов 100`);
  } else {
    inputTitle.setCustomValidity(``);
  }
  inputTitle.reportValidity();
});

// Сбрасываем дефолтное поведение reset

buttonReset.addEventListener(`click`, function (evt) {
  evt.preventDefault();
  addForm.reset();
  getAddress(true);
});
