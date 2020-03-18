'use strict';

(function () {
  var DECIMAL = 10;
  var MUFFIN_WIDTH = 40;
  var MUFFIN_HEIGHT = 44;
  var MUFFIN_POINT_HEIGHT = 22;
  var HALF_MUFFIN = 2;
  var PIXEL = 'px';
  var pinHandler = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var minLeftBorder = -20;
  var minTopBorder = 86;
  var minBottomBorder = 586;

  var buttonCoordinateLeft = parseInt(pinHandler.style.left, DECIMAL);
  var buttonCoordinateTop = parseInt(pinHandler.style.top, DECIMAL);

  pinHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onPinMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var mapWidth = map.getBoundingClientRect().width;
      var pinWidth = pinHandler.offsetWidth;
      var newX = pinHandler.offsetLeft - shift.x;
      var newY = pinHandler.offsetTop - shift.y;

      if (newX > minLeftBorder && newX <= (mapWidth - pinWidth)) {
        pinHandler.style.left = newX + PIXEL;
      }

      if (newY > minTopBorder && newY < minBottomBorder) {
        pinHandler.style.top = newY + PIXEL;
      }

      window.getCoords(newX, newY, MUFFIN_POINT_HEIGHT);
    };

    var onPinUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onPinMove);
      document.removeEventListener('mouseup', onPinUp);

      if (!dragged) {
        window.getCoords(buttonCoordinateLeft, buttonCoordinateTop, MUFFIN_POINT_HEIGHT);
      }
    };

    document.addEventListener('mousemove', onPinMove);
    document.addEventListener('mouseup', onPinUp);
  });

  window.getCoords = function (x, y, pointer) {
    var coordX = x + (MUFFIN_WIDTH / HALF_MUFFIN);
    var coordY = y + (MUFFIN_HEIGHT / HALF_MUFFIN) + pointer;

    var addressInput = document.querySelector('#address');
    addressInput.value = coordX + ', ' + coordY;
  };
})();
