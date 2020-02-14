'use strict';

var CARD_COUNT = 8;
var TITLES = ['заголовок1', 'заголовок2', 'заголовок3', 'заголовок4', 'заголовок5', 'заголовок6', 'заголовок7', 'заголовок8'];
var PRICES = ['1000', '2000', '3000', '4000', '5000', '6000', '7000', '8000'];
var TYPES = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
var ROOMS = ['1', '2', '3', '4'];
var GUESTS = ['1', '2', '3', '4'];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTIONS = ['описание1', 'описание2', 'описание3', 'описание4', 'описание5', 'описание6', 'описание7', 'описание8'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var MUFFIN_WIDTH = 40;
var MUFFIN_HEIGHT = 44;
var MUFFIN_POINT_HEIGHT = 22;

// var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';
var LEFT_MOUSE_BUTTON = 1;

var MinPrice = {
  BUNGALO: 0,
  FLAT: 1000,
  HOUSE: 5000,
  PALACE: 10000
};

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
var timeIN = form.querySelector('#timein');
var timeOut = form.querySelector('#timeout');

var buttonCoordinateLeft = parseInt(mapPinMain.style.left, 10);
var buttonCoordinateTop = parseInt(mapPinMain.style.top, 10);


// Функции создания рандомных элементов
function getIntervalNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var getRandomElement = function (elements) {
  return Math.floor(Math.random() * elements.length);
};

// Функции создания фич
var emptyFeatureList = function (list) {
  list.innerHTML = '';
};

var createFeatureMarkup = function (feature) {
  var li = document.createElement('li');
  li.classList.add('popup__feature');
  li.classList.add('popup__feature--' + feature);

  return li;
};

var createFeaturesMarkup = function () {
  var length = getIntervalNumber(0, FEATURES.length);
  var features = [];

  for (var j = 0; j < length; j++) {
    features.push(createFeatureMarkup(FEATURES[j]));
  }
  return features;
};

// Создание аватара
var makeAvatar = function (number) {
  var image = 'img/avatars/user0' + number + '.png';
  return image;
};

// Создание элемента указателя по шаблону
var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

var renderPin = function (avatar, description) {
  var pinElement = pinTemplate.cloneNode(true);
  var pinXTransfer = 10; // случайное число
  var pinУTransfer = 20; // случайное число

  pinElement.style = 'left: ' + (getIntervalNumber(350, 600) + pinXTransfer) + 'px; top: ' + (getIntervalNumber(350, 600) + pinУTransfer) + 'px;';
  pinElement.querySelector('img').src = avatar;
  pinElement.querySelector('img').alt = description;
  return pinElement;
};

// Создание карточки из шаблона
// var similarCardTemplate = document.querySelector('#card')
//     .content
//     .querySelector('.popup');

// var renderCard = function (avatar, description) {
//   var cardElement = similarCardTemplate.cloneNode(true);
//   var features = createFeaturesMarkup();

//   cardElement.querySelector('.popup__avatar').src = avatar;
//   cardElement.querySelector('.popup__title').textContent = TITLES[getRandomElement(TITLES)];
//   cardElement.querySelector('.popup__text--address').textContent = getIntervalNumber(350, 600) + ', ' + getIntervalNumber(350, 600);
//   cardElement.querySelector('.popup__text--price').textContent = PRICES[getRandomElement(PRICES)] + ' ₽/ночь';
//   cardElement.querySelector('.popup__type').textContent = TYPES[getRandomElement(TYPES)];
//   cardElement.querySelector('.popup__text--capacity').textContent = ROOMS[getRandomElement(ROOMS)] + ' комнаты для ' + GUESTS[getRandomElement(GUESTS)] + ' гостей';
//   cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + TIMES[getRandomElement(TIMES)] + ', выезд до ' + TIMES[getRandomElement(TIMES)];

//   var featuresList = cardElement.querySelector('.popup__features');
//   emptyFeatureList(featuresList);

//   for (var i = 0; i < features.length; i++) {
//     featuresList.appendChild(features[i]);
//   }

//   cardElement.querySelector('.popup__description').textContent = description;
//   cardElement.querySelector('.popup__photo').src = PHOTOS[getRandomElement(PHOTOS)];

//   return cardElement;
// };

// var cards = [];

// Создание и заполнение фрагмента
var fragment = document.createDocumentFragment();
for (var i = 1; i <= CARD_COUNT; i++) {
  var advertDescription = DESCRIPTIONS[i - 1];
  var image = makeAvatar(i);
  // var card = renderCard(image, advertDescription); <== отменяет отрисовку карточки !!!
  // cards.push(card);
  fragment.appendChild(renderPin(image, advertDescription));
}

// Добавляет объявления на карту
// var filtersContainer = document.querySelector('.map__filters-container');
// filtersContainer.before(cards[0]);


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
  if (evt.key === ENTER_KEY) {
    activateMap();
  }
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


priceInput.addEventListener('invalid', function () {
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

titleInput.addEventListener('invalid', function () {
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


