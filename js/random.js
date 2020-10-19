'use strict';

(function () {
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

  window.random = {
    getRandomIndex: getRandomIndex,
    getRandomRange: getRandomRange,
    getShuffleArray: getShuffleArray,
    numDecline: numDecline
  };

})();
