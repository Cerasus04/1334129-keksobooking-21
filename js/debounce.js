'use strict';

(function () {
  const DEBOUNCE_INTERVAL = 500;

  window.debounce = (cb) => {
    let lastTimeout = null;

    return (...args) => {
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(() => {
        cb(...args);
      }, DEBOUNCE_INTERVAL);
    };
  };
})();
