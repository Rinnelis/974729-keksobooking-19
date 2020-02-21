'use strict';

(function () {
  var pinHandler = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var minLeftBorder = 0;
  var minTopBorder = 108;
  var minBottomBorder = 608;

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
        pinHandler.style.left = newX + 'px';
      }

      if (newY > minTopBorder && newY < minBottomBorder) {
        pinHandler.style.top = newY + 'px';
      }

      window.pin = {
        x: newX,
        y: newY
      };
    };

    var onPinUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onPinMove);
      document.removeEventListener('mouseup', onPinUp);
      pinHandler.addEventListener('click', window.activateMap);

      // if (dragged) {

      // }
    };

    document.addEventListener('mousemove', onPinMove);
    document.addEventListener('mouseup', onPinUp);
  });
})();
