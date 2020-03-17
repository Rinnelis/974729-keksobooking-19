'use strict';

(function () {
  var MUFFIN_POINT_HEIGHT = 22;
  var DECIMAL = 10; // десятичная система счисления
  var MUFFIN_CENTER = 0; // в неактивном состоянии у главного маффина нет острого конца
  var MUFFIN_LEFT = 570; // координата слева
  var MUFFIN_TOP = 375; // координата сверху

  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');
  var formInputs = form.querySelectorAll('input');
  var formSelects = form.querySelectorAll('select');
  var descriptionField = form.querySelector('#description');
  var submitButton = form.querySelector('.ad-form__submit');
  var filtersForm = document.querySelector('.map__filters');
  var resetButton = form.querySelector('.ad-form__reset');
  var roomCapacity = document.querySelector('#capacity');

  var buttonCoordinateLeft = parseInt(mapPinMain.style.left, DECIMAL);
  var buttonCoordinateTop = parseInt(mapPinMain.style.top, DECIMAL);

  // Режим деактивации до нажатия на указатель
  var deactivateMap = function () {
    roomCapacity.style.border = 'none';
    formInputs.forEach(function (input) {
      input.setAttribute('disabled', 'disabled');
    });

    formSelects.forEach(function (select) {
      select.setAttribute('disabled', 'disabled');
    });

    descriptionField.setAttribute('disabled', 'disabled');
    window.getCoords(buttonCoordinateLeft, buttonCoordinateTop, MUFFIN_CENTER);

    filtersForm.classList.add('map__filters--disabled');
    submitButton.setAttribute('disabled', 'disabled');
    resetButton.setAttribute('disabled', 'disabled');
  };

  deactivateMap();
  //

  // Режим активации карты
  var activateMap = function () {
    map.classList.remove('map--faded');
    window.render(window.adverts);
    form.classList.remove('ad-form--disabled');
    descriptionField.removeAttribute('disabled');

    formInputs.forEach(function (input) {
      input.removeAttribute('disabled');
    });

    formSelects.forEach(function (select) {
      select.removeAttribute('disabled');
    });

    submitButton.removeAttribute('disabled');
    resetButton.removeAttribute('disabled');
    filtersForm.classList.remove('map__filters--disabled');
  };

  mapPinMain.addEventListener('click', function () {
    window.map.activate();
  });

  mapPinMain.addEventListener('keydown', function (keyEvt) {
    if (window.util.isEnterEvent(keyEvt)) {
      window.getCoords(buttonCoordinateLeft, buttonCoordinateTop, MUFFIN_POINT_HEIGHT);
    }
  });

  var resetMap = function () {
    mapPinMain.style.left = MUFFIN_LEFT + 'px';
    mapPinMain.style.top = MUFFIN_TOP + 'px';

    var pins = map.querySelectorAll('.map__pin:not(.map__pin--main)');

    pins.forEach(function (pin) {
      pin.remove();
    });

    var popup = map.querySelector('.popup');
    if (popup) {
      popup.remove();
    }

    map.classList.add('map--faded');
    deactivateMap();
  };

  window.map = {
    activate: activateMap,
    deactivate: deactivateMap,
    reset: resetMap
  };
})();
