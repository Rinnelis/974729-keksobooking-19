'use strict';

(function () {
  var MUFFIN_POINT_HEIGHT = 22;
  var DECIMAL = 10; // десятичная система счисления
  var MUFFIN_CENTER = 0; // в неактивном состоянии у главного маффина нет острого конца
  var MUFFIN_LEFT = 570; // координата слева
  var MUFFIN_TOP = 375; // координата сверху
  var DISABLED = 'disabled';

  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');
  var formInputs = form.querySelectorAll('input');
  var formSelects = form.querySelectorAll('select');
  var descriptionField = form.querySelector('#description');
  var submitButton = form.querySelector('.ad-form__submit');
  var filtersForm = document.querySelector('.map__filters');
  var filterInputs = filtersForm.querySelectorAll('input');
  var filterSelects = filtersForm.querySelectorAll('select');
  var resetButton = form.querySelector('.ad-form__reset');
  var disabledFiltersClass = 'map__filters--disabled';
  var disabledFormClass = 'ad-form--disabled';
  var mapFadedClass = 'map--faded';

  var buttonCoordinateLeft = parseInt(mapPinMain.style.left, DECIMAL);
  var buttonCoordinateTop = parseInt(mapPinMain.style.top, DECIMAL);

  // Режим деактивации до нажатия на указатель
  var deactivateMap = function () {
    formInputs.forEach(function (input) {
      input.setAttribute(DISABLED, DISABLED);
    });

    formSelects.forEach(function (select) {
      select.setAttribute(DISABLED, DISABLED);
    });

    filterInputs.forEach(function (input) {
      input.setAttribute(DISABLED, DISABLED);
    });

    filterSelects.forEach(function (select) {
      select.setAttribute(DISABLED, DISABLED);
    });

    descriptionField.setAttribute(DISABLED, DISABLED);
    window.getCoords(buttonCoordinateLeft, buttonCoordinateTop, MUFFIN_CENTER);

    filtersForm.classList.add(disabledFiltersClass);
    submitButton.setAttribute(DISABLED, DISABLED);
    resetButton.setAttribute(DISABLED, DISABLED);
  };

  deactivateMap();
  //

  // Режим активации карты
  var activateMap = function () {
    map.classList.remove(mapFadedClass);
    window.render(window.adverts);
    form.classList.remove(disabledFormClass);
    descriptionField.removeAttribute(DISABLED);

    formInputs.forEach(function (input) {
      input.removeAttribute(DISABLED);
    });

    formSelects.forEach(function (select) {
      select.removeAttribute(DISABLED);
    });

    filterInputs.forEach(function (input) {
      input.removeAttribute(DISABLED);
    });

    filterSelects.forEach(function (select) {
      select.removeAttribute(DISABLED);
    });

    submitButton.removeAttribute(DISABLED);
    resetButton.removeAttribute(DISABLED);
    filtersForm.classList.remove(disabledFiltersClass);
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

    map.classList.add(mapFadedClass);
    deactivateMap();
  };

  window.map = {
    activate: activateMap,
    deactivate: deactivateMap,
    reset: resetMap
  };
})();
