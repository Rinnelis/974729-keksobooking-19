'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var timeIN = form.querySelector('#timein');
  var timeOut = form.querySelector('#timeout');
  var resetButton = form.querySelector('.ad-form__reset');
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');

  var MinPrice = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

  // Очистка формы
  resetButton.addEventListener('click', function () {
    form.reset();
  });

  // Связь времени чек-ина и чек-аута
  timeIN.addEventListener('change', function (evt) {
    timeOut.value = evt.target.value;
  });

  timeOut.addEventListener('change', function (evt) {
    timeIN.value = evt.target.value;
  });

  // Связь количества комнат и количества гостей
  var roomNumber = document.querySelector('#room_number');
  var roomCapacity = document.querySelector('#capacity');

  var getRoomValidation = function () {
    if (roomNumber.value === '100' && roomCapacity.value !== '0') {
      roomCapacity.setCustomValidity('Это количество комнат не предназначено для гостей');
    } else if (roomNumber.value !== '100' && roomCapacity.value === '0') {
      roomCapacity.setCustomValidity('Пожалуйста, укажите количество гостей');
    } else if (roomNumber.value < roomCapacity.value) {
      roomCapacity.setCustomValidity('Количество гостей должно быть не более ' + roomNumber.value);
    } else {
      roomCapacity.setCustomValidity('');
    }
  };

  getRoomValidation();

  roomNumber.addEventListener('change', getRoomValidation);
  roomCapacity.addEventListener('change', getRoomValidation);

  // Валидация цены за ночь в зависимости от типа жилья
  var priceInput = form.querySelector('#price');
  var roomType = form.querySelector('#type');

  var getTypeValidation = function () {
    var minDefaultValue = MinPrice[roomType.value.toUpperCase()];
    priceInput.min = minDefaultValue;
    priceInput.placeholder = minDefaultValue;
  };

  getTypeValidation();

  roomType.addEventListener('change', getTypeValidation);

  priceInput.addEventListener('change', function () {
    if (priceInput.validity.valueMissing) {
      priceInput.setCustomValidity('Обязательное поле');
    } else if (priceInput.validity.typeMismatch) {
      priceInput.setCustomValidity('В это поле можно вводить только цифры');
    } else if (priceInput.validity.rangeOverflow) {
      priceInput.setCustomValidity('Цена не должна превышать 1 000 000');
    } else {
      priceInput.setCustomValidity('');
    }
  });

  // Валидация заголовка объявления
  var titleInput = form.querySelector('#title');

  titleInput.addEventListener('change', function () {
    if (titleInput.validity.tooShort) {
      titleInput.setCustomValidity('Заголовок объявления должен состоять минимум из 30 символов');
    } else if (titleInput.validity.tooLong) {
      titleInput.setCustomValidity('Заголовок объявления не должен превышать 100 символов');
    } else if (titleInput.validity.valueMissing) {
      titleInput.setCustomValidity('Обязательное поле');
    } else {
      titleInput.setCustomValidity('');
    }
  });

  // Показ сообщения об успешной подаче объявления
  var successTemplate = document.querySelector('#success').content.querySelector('.success');

  var renderSuccessMessage = function () {
    var successMessage = successTemplate.cloneNode(true);
    var fragment = document.createDocumentFragment();
    var success = fragment.appendChild(successMessage);

    var closeMessage = function (keyEvt) {
      if (window.util.isEscEvent(keyEvt)) {
        success.classList.add('hidden');
      }
    };

    document.addEventListener('keydown', closeMessage);
    document.addEventListener('click', function () {
      success.classList.add('hidden');
    });
    return success;
  };

  // Показ сообщения об ошибке при размещении объявления
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var renderErrorMessage = function () {
    var errorMessage = errorTemplate.cloneNode(true);
    var fragment = document.createDocumentFragment();
    var error = fragment.appendChild(errorMessage);
    var errorButton = errorTemplate.querySelector('.error__button');

    errorButton.addEventListener('click', function () {
      error.classList.add('hidden');
    });

    var closeMessage = function (keyEvt) {
      if (window.util.isEscEvent(keyEvt)) {
        error.classList.add('hidden');
      }
    };

    document.addEventListener('keydown', closeMessage);
    document.addEventListener('click', function () {
      error.classList.add('hidden');
    });
    return error;
  };

  // Отправка данных формы на сервер
  form.addEventListener('submit', function (evt) {
    var submitButton = form.querySelector('.ad-form__submit');
    submitButton.textContent = 'Публикуем...';
    submitButton.disabled = true;

    var successfulSend = function () {
      mainPin.style.left = 570 + 'px';
      mainPin.style.top = 375 + 'px';
      var pins = map.querySelectorAll('.map__pin:not(.map__pin--main)');

      pins.forEach(function (pin) {
        pin.remove();
      });

      map.before(renderSuccessMessage());
      map.classList.add('map--faded');
      form.reset();
      form.classList.add('ad-form--disabled');
      window.map.deactivate();
      submitButton.textContent = 'Опубликовать';
      window.backend.load(window.pin.success, window.pin.error);
    };

    var errorSend = function () {
      submitButton.textContent = 'Опубликовать';
      submitButton.disabled = false;
      map.before(renderErrorMessage());
    };

    window.backend.save(new FormData(form), successfulSend, errorSend);
    evt.preventDefault();
  });
})();
