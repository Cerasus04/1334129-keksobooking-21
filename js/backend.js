'use strict';

(function () {
  const URL_GET = `https://21.javascript.pages.academy/keksobooking/data`;
  const URL_POST = `https://21.javascript.pages.academy/keksobooking`;
  const TIMEOUT = 1000;

  const getXhrData = function (onLoad, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      let error;
      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          break;
        case 400:
          onLoad(xhr.response);
          break;
        case 404:
          error = `Страница не найдена`;
          break;
        case 500:
          error = `Ошибка сервера`;
          break;

        default:
          error = `Cтатус ответа: : ` + xhr.status + ` ` + xhr.statusText;
      }
    });

    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });

    xhr.timeout = TIMEOUT;
    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    return xhr;
  };

  const load = (onLoad, onError) => {
    const xhr = getXhrData(onLoad, onError);

    xhr.open(`GET`, URL_GET);
    xhr.send();
  };

  const upload = (data, onLoad, onError) => {
    const xhr = getXhrData(onLoad, onError);

    xhr.open(`POST`, URL_POST);
    xhr.send(data);
  };

  window.backend = {
    load,
    upload
  };

})();
