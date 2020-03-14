'use strict';

(function () {
  var MUFFIN_WIDTH = 40;
  var MUFFIN_HEIGHT = 44;

  // Создание и заполнение фрагмента
  var successHandler = function (cards) {
    // window.serverData = cards;
    window.render(cards);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);

  var getPinCoords = function (x, y, pointer) {
    var coordX = x + (MUFFIN_WIDTH / 2);
    var coordY = y + (MUFFIN_HEIGHT / 2) + pointer;

    var addressInput = document.querySelector('#address');
    addressInput.value = coordX + ', ' + coordY;
  };

  window.pin = {
    getCoords: getPinCoords,
    success: successHandler,
    error: errorHandler
  };
})();
