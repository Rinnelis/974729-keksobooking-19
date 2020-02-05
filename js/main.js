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
// var makeAvatar = function (number) {
//   var image = 'img/avatars/user0' + number + '.png';
//   return image;
// };

for (var k = 1; k <= CARD_COUNT; k++) {
  var advertDescription = DESCRIPTIONS[k - 1];
  var image = 'img/avatars/user0' + k + '.png';
}

// Создание карточки из шаблона
var similarCardTemplate = document.querySelector('#card')
    .content
    .querySelector('.popup');

var renderCard = function (avatar, description) {
  var cardElement = similarCardTemplate.cloneNode(true);
  var features = createFeaturesMarkup();

  cardElement.querySelector('.popup__avatar').src = image;
  cardElement.querySelector('.popup__title').textContent = TITLES[getRandomElement(TITLES)];
  cardElement.querySelector('.popup__text--address').textContent = getIntervalNumber(350, 600) + ', ' + getIntervalNumber(350, 600);
  cardElement.querySelector('.popup__text--price').textContent = PRICES[getRandomElement(PRICES)] + ' ₽/ночь';
  cardElement.querySelector('.popup__type').textContent = TYPES[getRandomElement(TYPES)];
  cardElement.querySelector('.popup__text--capacity').textContent = ROOMS[getRandomElement(ROOMS)] + ' комнаты для ' + GUESTS[getRandomElement(GUESTS)] + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + TIMES[getRandomElement(TIMES)] + ', выезд до ' + TIMES[getRandomElement(TIMES)];

  var featuresList = cardElement.querySelector('.popup__features');
  emptyFeatureList(featuresList);

  for (var i = 0; i < features.length; i++) {
    featuresList.appendChild(features[i]);
  }

  cardElement.querySelector('.popup__description').textContent = advertDescription;
  cardElement.querySelector('.popup__photo').src = PHOTOS[getRandomElement(PHOTOS)];

  return cardElement;
};

// Создание и заполнение фрагмента
var fragment = document.createDocumentFragment();

for (var i = 1; i <= CARD_COUNT; i++) {
  fragment.appendChild(renderCard(image, advertDescription));
}

var advert = document.querySelector('.map__pins');
advert.appendChild(fragment);

// Отрисовка на карте
var map = document.querySelector('.map');
map.classList.remove('map--faded');

// Создание элемента указателя по шаблону
var pinTemplate = document.querySelector('#pin').content;

var renderPin = function () {
  var pinElement = pinTemplate.cloneNode(true);
  var pinXTransfer = 10; // случайное число
  var pinУTransfer = 20; // случайное число

  pinElement.style = 'left: ' + getIntervalNumber(350, 600) + pinXTransfer + 'px; top: ' + getIntervalNumber(350, 600) + pinУTransfer;
  pinElement.src = image;
  pinElement.textContent = advertDescription;

  return pinElement;
};
