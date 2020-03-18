'use strict';

(function () {
  // Создание и заполнение фрагмента
  var onSuccess = function (adverts) {
    window.adverts = adverts.filter(function (advert) {
      return 'offer' in advert;
    });
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(onSuccess, onError);

  window.handlers = {
    success: onSuccess,
    error: onError
  };
})();
