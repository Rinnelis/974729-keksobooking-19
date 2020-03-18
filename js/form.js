'use strict';

(function () {
  var ZERO_GUESTS = '0';
  var HUNDRED_ROOMS = '100';
  var DEFAULT_IMAGE = 'img/muffin-grey.svg';
  var NONE = 'none';

  var form = document.querySelector('.ad-form');
  var filtersForm = document.querySelector('.map__filters');
  var timeIN = form.querySelector('#timein');
  var timeOut = form.querySelector('#timeout');
  var resetButton = form.querySelector('.ad-form__reset');
  var map = document.querySelector('.map');
  var avatarPicture = document.querySelector('.ad-form-header__preview img');
  var apartmentPicture = document.querySelector('.ad-form__photo');
  var disabledFormClass = 'ad-form--disabled';
  var checkClass = 'check';
  var hiddenClass = 'hidden';

  var MinPrice = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

  // Очистка формы
  resetButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    avatarPicture.src = DEFAULT_IMAGE;
    apartmentPicture.innerHTML = '';
    form.reset();
    filtersForm.reset();
    window.map.reset();
    form.classList.add(disabledFormClass);
  });

  form.addEventListener('invalid', function () {
    form.classList.add(checkClass);
  }, true);

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
    if (roomNumber.value === HUNDRED_ROOMS && roomCapacity.value !== ZERO_GUESTS) {
      roomCapacity.setCustomValidity('Это количество комнат не предназначено для гостей');
    } else if (roomNumber.value !== HUNDRED_ROOMS && roomCapacity.value === ZERO_GUESTS) {
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
      titleInput.style.border = NONE;
      titleInput.setCustomValidity('');
    }
  });

  // Показ сообщения об успешной подаче объявления
  var successTemplate = document.querySelector('#success').content.querySelector('.success');

  var renderPopup = function (template) {
    var popup = template.cloneNode(true);

    var closePopup = function () {
      popup.classList.add(hiddenClass);
      document.removeEventListener('keydown', closeMessage);
    };

    var closeMessage = function (keyEvt) {
      if (window.util.isEscEvent(keyEvt)) {
        closePopup();
      }
    };

    document.addEventListener('keydown', closeMessage);
    document.addEventListener('click', function () {
      closePopup();
    });
    return popup;
  };

  // Показ сообщения об ошибке при размещении объявления
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var renderSuccessMessage = function () {
    return renderPopup(successTemplate);
  };

  var renderErrorMessage = function () {
    return renderPopup(errorTemplate);
  };

  // Отправка данных формы на сервер
  var submitButton = form.querySelector('.ad-form__submit');
  var sendingMessage = 'Публикуем...';
  var defaultMessage = 'Опубликовать';

  form.addEventListener('submit', function (evt) {
    submitButton.textContent = sendingMessage;
    submitButton.disabled = true;

    var onSuccessfulSend = function () {
      avatarPicture.src = DEFAULT_IMAGE;
      apartmentPicture.innerHTML = '';
      form.reset();
      filtersForm.reset();
      window.map.reset();
      map.before(renderSuccessMessage());
      form.classList.add(disabledFormClass);
      submitButton.textContent = defaultMessage;
      getRoomValidation();
      roomType.addEventListener('change', getTypeValidation);
      roomNumber.addEventListener('change', getRoomValidation);
      roomCapacity.addEventListener('change', getRoomValidation);
      window.backend.load(window.handlers.success, window.handlers.error);
    };

    var onErrorSend = function () {
      submitButton.textContent = defaultMessage;
      submitButton.disabled = false;
      map.before(renderErrorMessage());
    };

    window.backend.save(new FormData(form), onSuccessfulSend, onErrorSend);
    evt.preventDefault();
  });
})();
