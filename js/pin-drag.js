'use strict';

(function () {

  var MUFFIN_WIDTH = 40;
  var MUFFIN_HEIGHT = 44;
  //   var MUFFIN_POINT_HEIGHT = 22;

  var pinHandler = document.querySelector('.map__pin--main');
  var buttonCoordinateLeft = parseInt(pinHandler.style.left, 10);
  var buttonCoordinateTop = parseInt(pinHandler.style.top, 10);

  var muffinStartX = buttonCoordinateLeft + (MUFFIN_WIDTH / 2);
  var muffinStartY = buttonCoordinateTop + (MUFFIN_HEIGHT / 2);

  pinHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: muffinStartX,
      y: muffinStartY
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
    };

    // var onPinUp = function (upEvt) {
    //   upEvt.preventDefault();

    //   document.removeEventListener('mousemove', onPinMove);
    //   document.removeEventListener('mouseup', onPinUp);

    //   if (dragged) {
    //     var onClickPrevent = function (clickEvt) {
    //       clickEvt.preventDefault();
    //       pinHandler.removeEventListener('click', onClickPrevent);
    //     };
    //     pinHandler.addEventListener('click', window.activateMap);
    //     pinHandler.addEventListener('keydown', function (keyEvt) {
    //       window.util.isEnterEvent(keyEvt, window.activateMap);
    //     });
    //   }
    // };

    document.addEventListener('mousemove', onPinMove);
    // document.addEventListener('mouseup', onPinUp);
  });
})();
