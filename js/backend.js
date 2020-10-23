'use strict';

(function () {
  const URL_GET = `https://21.javascript.pages.academy/keksobooking/data`;
  const URL_POST = `https://21.javascript.pages.academy/keksobooking`;
  const TIMEOUT = 1000;
  const StatusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
  };

  const getXhrData = function (onLoad, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      let error;
      switch (xhr.status) {
        case StatusCode.OK:
          onLoad(xhr.response);
          break;
        case StatusCode.BAD_REQUEST:
          break;
        case StatusCode.NOT_FOUND:
          error = `страница не найдена`;
          break;
        case StatusCode.SERVER_ERROR:
          error = `ошибка сервера`;
          break;

        default:
          error = `статус ответа: : ` + xhr.status + ` ` + xhr.statusText;
      }
      if (error) {
        onError(error);
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

  const save = (data, onLoad, onError) => {
    const xhr = getXhrData(onLoad, onError);

    xhr.open(`POST`, URL_POST);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };

})();
