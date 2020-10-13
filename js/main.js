'use strict';

const TITLES = [`Комната в комуналке`, `Комната в общежитии`, `Квартира с косметическим ремонтом`, `Евро аппартаменты`, `Квартира с мебелью`, `Дом со всей техникой и мебелью`, `Дом с участком`, `Нежилое помещение`];
const TYPES = [`palace`, `flat`, `house`, `bungalow`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const TIMES = [`12:00`, `13:00`, `14:00`];
const ROOMS = [1, 2, 3, 4];
const MIN_GUESTS = 1;
const MAX_GUESTS = 5;
const AMOUNT = 8;
const PIN = {
  WIDTH: 40,
  HEIGHT: 40,
  MARKER_HEIGHT: 22
};

const mapTypeToPrice = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

const PRICES = {
  MIN: 2500,
  MAX: 10000
};
const LOCATIONS = {
  X_MIN: 0,
  X_MAX: 1050,
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
const Keys = {
  ESC: `Escape`,
  ENTER: `Enter`
};

const map = document.querySelector(`.map`);
const mapPins = map.querySelector(`.map__pins`);
const addForm = document.querySelector(`.ad-form`);
const mapFilters = map.querySelector(`.map__filters`);
const pinMain = mapPins.querySelector(`.map__pin--main`);
const addressInput = addForm.querySelector(`#address`);
const roomsNumber = addForm.querySelector(`#room_number`);
const guestsNumber = addForm.querySelector(`#capacity`);
const optionsCapacity = guestsNumber.querySelectorAll(`option`);
const buttonReset = addForm.querySelector(`.ad-form__reset`);
const selectType = addForm.querySelector(`#type`);
const formFieldsets = document.querySelectorAll(`fieldset, select`);

const getRandomIndex = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const getRandomRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getShuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const x = array[i];
    array[i] = array[j];
    array[j] = x;
  }
  return array;
};

const numDecline = (number, words) => { // числительные
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

const cards = [];

const getCards = () => {
  for (let i = 0; i < AMOUNT; i++) {
    cards.push({
      author: {
        avatar: `img/avatars/user0${(i + 1)}.png`,
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
        features: getShuffleArray(FEATURES).slice(0, getRandomRange(1, FEATURES.length)),
        description: `строка с описанием`,
        photos: getShuffleArray(PHOTOS).slice(0, getRandomRange(1, PHOTOS.length))
      },
      location: {
        x: getRandomRange(LOCATIONS.X_MIN, LOCATIONS.X_MAX),
        y: getRandomRange(LOCATIONS.Y_MIN, LOCATIONS.Y_MAX)
      }
    });
  }
};

getCards();

const closePopup = () => {
  let popup = map.querySelector(`.popup`);

  if (popup) {
    popup.remove();
  }

  document.removeEventListener(`keydown`, onCloseButtonKeyDown);
};

const setPinActiveClass = (button) => {
  let activePin = map.querySelector(`.map__pin--active`);

  if (activePin) {
    activePin.classList.remove(`map__pin--active`);
  }

  button.classList.add(`map__pin--active`);
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

const createPins = () => {
  const fragment = document.createDocumentFragment();
  for (let pin of cards) {
    fragment.appendChild(renderPin(pin));
  }
  mapPins.appendChild(fragment);
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

const onCloseButtonKeyDown = (evt) => {
  if (evt.key === Keys.ESC) {
    evt.preventDefault();
    closePopup();
  }
};

const onCloseButtonClick = (evt) => {
  if (evt.button === 0) {
    closePopup();
  }
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

const setDisableState = () => {
  formFieldsets.forEach((item) => {
    item.disabled = !item.disabled;
  });
};

setDisableState();

const initialaze = () => {
  map.classList.remove(`map--faded`);
  addForm.classList.remove(`ad-form--disabled`);

  getAddress();
  createPins();
  setDisableState();
};

const onMainPinMouseDown = (evt) => {
  if (evt.button === 0) {
    initialaze();

    pinMain.removeEventListener(`mousedown`, onMainPinMouseDown);
  }
};

const onMainPinKeysDown = (evt) => {
  if (evt.key === Keys.ENTER) {
    initialaze();

    pinMain.removeEventListener(`keydown`, onMainPinKeysDown);
  }
};

pinMain.addEventListener(`mousedown`, onMainPinMouseDown);
pinMain.addEventListener(`keydown`, onMainPinKeysDown);

// Заполнение поля адреса

const getAddress = () => {
  let x = parseInt(pinMain.style.left, 10);
  let y = parseInt(pinMain.style.top, 10);

  if (!map.classList.contains(`map--faded`)) {
    x = `${Math.floor(x + PIN.WIDTH / 2)}`;
    y = `${Math.floor(y + (PIN.HEIGHT + PIN.MARKER_HEIGHT))}`;
  } else {
    x = `${Math.floor(x + PIN.WIDTH / 2)}`;
    y = `${Math.floor(y + PIN.HEIGHT / 2)}`;
  }
  addressInput.value = (`${x}, ${y}`);
};

getAddress();

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

// Сбрасываем дефолтное поведение reset

buttonReset.addEventListener(`click`, function (evt) {
  evt.preventDefault();
  addForm.reset();
  getAddress();
});

// Зависимость времени заезда от время выезда

const selectCheckIn = addForm.querySelector(`#timein`);
const selectCheckOut = addForm.querySelector(`#timeout`);

const changeCheckIn = (checkIn) => {
  selectCheckIn.value = checkIn;
};
const changeCheckOut = (checkOut) => {
  selectCheckOut.value = checkOut;
};
selectCheckIn.addEventListener(`change`, () => {
  changeCheckOut(selectCheckIn.value);
});
selectCheckOut.addEventListener(`change`, () => {
  changeCheckIn(selectCheckOut.value);
});

// Зависимость, цена за ночь от типа жилья.

const inputPrice = addForm.querySelector(`#price`);

const setMinPrice = (minPrice) => {
  inputPrice.min = minPrice;
  inputPrice.placeholder = minPrice;
};

selectType.addEventListener(`change`, () => {
  setMinPrice(mapTypeToPrice[selectType.value]);
});
