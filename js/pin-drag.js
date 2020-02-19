'use strict';

(function () {

  var MUFFIN_WIDTH = 40;
  var MUFFIN_HEIGHT = 44;
  var MUFFIN_POINT_HEIGHT = 22;

  var pinHandler = document.querySelector('.map__pin--main');

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

      pinHandler.style.top = (pinHandler.offsetTop - shift.y) + 'px';
      pinHandler.style.left = (pinHandler.offsetLeft - shift.x) + 'px';

      window.pinX = pinHandler.offsetLeft + (MUFFIN_WIDTH / 2);
      window.pinY = pinHandler.offsetTop + (MUFFIN_HEIGHT / 2);

      if (window.pinX > 1150) {
        window.pinX = 1150;
      } else if (window.pinX < 1) {
        window.pinX = 0;
      }

      if (window.pinY > 609) {
        window.pinY = 608;
      } else if (window.pinY < 109) {
        window.pinY = 108;
      }
    };

    var onPinUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onPinMove);
      document.removeEventListener('mouseup', onPinUp);
      pinHandler.addEventListener('click', window.activateMap);

      if (!dragged) {
        var onClickPrevent = function (clickEvt) {
          clickEvt.preventDefault();
          pinHandler.removeEventListener('click', onClickPrevent);
        };
        pinHandler.addEventListener('click', onClickPrevent);

        window.pinX = pinHandler.offsetLeft + (MUFFIN_WIDTH / 2);
        window.pinY = pinHandler.offsetTop + (MUFFIN_HEIGHT / 2) + MUFFIN_POINT_HEIGHT;
      }
    };

    document.addEventListener('mousemove', onPinMove);
    document.addEventListener('mouseup', onPinUp);
  });
})();
