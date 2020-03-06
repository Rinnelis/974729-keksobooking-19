'use strict';

(function () {
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

  // Режим деактивации до нажатия на указатель
  var deactivateMap = function () {
    formInputs.forEach(function (input) {
      input.setAttribute('disabled', 'disabled');
    });

    formSelects.forEach(function (select) {
      select.setAttribute('disabled', 'disabled');
    });

    descriptionField.setAttribute('disabled', 'disabled');
    window.pin.getCoords(buttonCoordinateLeft, buttonCoordinateTop, 0);

    filtersForm.classList.add('map__filters--disabled');
    submitButton.setAttribute('disabled', 'disabled');
  };

  deactivateMap();
  //

  // Режим активации карты
  var activateMap = function () {
    map.classList.remove('map--faded');
    mapPins.appendChild(window.pinFragment);
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
    window.map.activate();
  });

  mapPinMain.addEventListener('keydown', function (keyEvt) {
    if (window.util.isEnterEvent(keyEvt)) {
      window.pin.getCoords(buttonCoordinateLeft, buttonCoordinateTop, MUFFIN_POINT_HEIGHT);
    }
  });

  window.map = {
    activate: activateMap,
    deactivate: deactivateMap
  };
})();
