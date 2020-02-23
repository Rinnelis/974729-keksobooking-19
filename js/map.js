'use strict';

(function () {
  var MUFFIN_WIDTH = 40;
  var MUFFIN_HEIGHT = 44;
  var MUFFIN_POINT_HEIGHT = 22;

  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins');
  var form = document.querySelector('.ad-form');
  var formInputs = form.querySelectorAll('input');
  var formSelects = form.querySelectorAll('select');
  var descriptionField = form.querySelector('#description');
  var submitButton = form.querySelector('.ad-form__submit');
  var filtersForm = document.querySelector('.map__filters');

  var buttonCoordinateLeft = parseInt(mapPinMain.style.left, 10);
  var buttonCoordinateTop = parseInt(mapPinMain.style.top, 10);

  window.getPinCoords = function (x, y, pointer) {
    var coordX = x + (MUFFIN_WIDTH / 2);
    var coordY = y + (MUFFIN_HEIGHT / 2) + pointer;

    var addressInput = document.querySelector('#address');
    addressInput.value = coordX + ', ' + coordY;
  };

  // Режим деактивации до нажатия на указатель
  var deactivateMap = function () {
    formInputs.forEach(function (input) {
      input.setAttribute('disabled', 'disabled');
    });

    formSelects.forEach(function (select) {
      select.setAttribute('disabled', 'disabled');
    });

    descriptionField.setAttribute('disabled', 'disabled');
    window.getPinCoords(buttonCoordinateLeft, buttonCoordinateTop, 0);

    filtersForm.classList.add('map__filters--disabled');
    submitButton.setAttribute('disabled', 'disabled');
  };

  deactivateMap();
  //

  // Режим активации карты
  window.activateMap = function () {
    map.classList.remove('map--faded');
    mapPins.appendChild(window.fragment);
    form.classList.remove('ad-form--disabled');
    descriptionField.removeAttribute('disabled');

    formInputs.forEach(function (input) {
      input.removeAttribute('disabled');
    });

    formSelects.forEach(function (select) {
      select.removeAttribute('disabled');
    });

    submitButton.removeAttribute('disabled');
    filtersForm.classList.remove('map__filters--disabled');
  };

  mapPinMain.addEventListener('click', function () {
    window.activateMap();
  });

  mapPinMain.addEventListener('keydown', function (keyEvt) {
    if (window.util.isEnterEvent(keyEvt)) {
      window.getPinCoords(buttonCoordinateLeft, buttonCoordinateTop, MUFFIN_POINT_HEIGHT);
    }
  });
})();
