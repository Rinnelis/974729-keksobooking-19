'use strict';

(function () {
  var MUFFIN_WIDTH = 40;
  var MUFFIN_HEIGHT = 44;
  var MUFFIN_POINT_HEIGHT = 22;

  var LEFT_MOUSE_BUTTON = 1;

  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins');
  var form = document.querySelector('.ad-form');
  var formInputs = form.querySelectorAll('input');
  var formSelects = form.querySelectorAll('select');
  var descriptionField = form.querySelector('#description');
  var addressInput = form.querySelector('#address');
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
    addressInput.value = (buttonCoordinateLeft + (MUFFIN_WIDTH / 2)) + ', ' + (buttonCoordinateTop + (MUFFIN_HEIGHT / 2));

    filtersForm.classList.add('map__filters--disabled');
    submitButton.setAttribute('disabled', 'disabled');
  };

  deactivateMap();
  //

  var fragment = document.createDocumentFragment();

  // Режим активации карты
  var activateMap = function () {
    map.classList.remove('map--faded');
    mapPins.appendChild(fragment);
    form.classList.remove('ad-form--disabled');
    descriptionField.removeAttribute('disabled');

    formInputs.forEach(function (input) {
      input.removeAttribute('disabled');
    });

    formSelects.forEach(function (select) {
      select.removeAttribute('disabled');
    });

    addressInput.value = (buttonCoordinateLeft + (MUFFIN_WIDTH / 2)) + ', ' + (buttonCoordinateTop + MUFFIN_HEIGHT + MUFFIN_POINT_HEIGHT);
    submitButton.removeAttribute('disabled');
    filtersForm.classList.remove('map__filters--disabled');
  };

  // Прорисовка нажатия главного указателя
  mapPinMain.addEventListener('mousedown', function () {
    if (event.which === LEFT_MOUSE_BUTTON) {
      activateMap();
    }
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, activateMap);
  });
})();
