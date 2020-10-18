'use strict';

(function () {
  const getRandomRange = window.random.getRandomRange;
  const getRandomIndex = window.random.getRandomIndex;
  const getShuffleArray = window.random.getShuffleArray;

  const AMOUNT = 8;
  const TITLES = [`Комната в комуналке`, `Комната в общежитии`, `Квартира с косметическим ремонтом`, `Евро аппартаменты`, `Квартира с мебелью`, `Дом со всей техникой и мебелью`, `Дом с участком`, `Нежилое помещение`];
  const TYPES = [`palace`, `flat`, `house`, `bungalow`];
  const ROOMS = [1, 2, 3, 4];
  const MIN_GUESTS = 1;
  const MAX_GUESTS = 5;
  const TIMES = [`12:00`, `13:00`, `14:00`];
  const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

  const LOCATIONS = {
    X_MIN: 0,
    X_MAX: 1050,
    Y_MIN: 130,
    Y_MAX: 630
  };

  const PRICES = {
    MIN: 2500,
    MAX: 10000
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

  window.datacard = {
    cards: cards
  };

})();
