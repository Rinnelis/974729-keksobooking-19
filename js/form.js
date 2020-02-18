'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var timeIN = form.querySelector('#timein');
  var timeOut = form.querySelector('#timeout');
  var MinPrice = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

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
    if (roomNumber.value !== roomCapacity.value) {
      if (roomNumber.value === '100' && roomCapacity.value !== '0') {
        roomCapacity.setCustomValidity('Это количество комнат не предназначено для гостей');
      } else if (roomNumber.value !== '100' && roomCapacity.value === '0') {
        roomCapacity.setCustomValidity('Пожалуйста, укажите количество гостей');
      } else if (roomNumber.value < roomCapacity.value) {
        roomCapacity.setCustomValidity('Количество гостей должно быть не более ' + roomNumber.value);
      } else {
        roomCapacity.setCustomValidity('');
      }
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
})();
