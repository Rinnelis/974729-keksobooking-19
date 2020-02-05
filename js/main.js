'use strict';

var CARD_COUNT = 8;
var TITLES = ['заголовок1', 'заголовок2', 'заголовок3', 'заголовок4', 'заголовок5', 'заголовок6', 'заголовок7', 'заголовок8'];
var PRICES = ['1000', '2000', '3000', '4000', '5000', '6000', '7000', '8000'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS = ['1', '2', '3', '4'];
var GUESTS = ['1', '2', '3', '4'];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTIONS = ['описание1', 'описание2', 'описание3', 'описание4', 'описание5', 'описание6', 'описание7', 'описание8'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

function getIntervalNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var getFeatures = function (feature) {
  var featuresList = similarCardTemplate.querySelector('.popup__features');
  featuresList.innerHTML = '';

  var li = document.createElement('li');
  li.classList.add('popup__feature');
  li.classList.add('popup__feature--' + feature);
  var length = getIntervalNumber(0, FEATURES.length);
  var features = [];

  for (var j = 0; j < length; j++) {
    features.push(FEATURES[j]);
  }
  return feature;
};

var makeAvatar = function (counter) {
  var avatar = 'img/avatars/user0' + counter + '.png';
  return avatar;
};

var getRandomElement = function (elements) {
  return Math.floor(Math.random() * elements.length);
};

var similarCardTemplate = document.querySelector('#card')
    .content
    .querySelector('.popup');

var renderCard = function (i) {
  var cardElement = similarCardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__avatar').src = makeAvatar(i);
  cardElement.querySelector('.popup__title').textContent = TITLES[getRandomElement(TITLES)];
  cardElement.querySelector('.popup__text--address').textContent = getIntervalNumber(350, 600) + ', ' + getIntervalNumber(350, 600);
  cardElement.querySelector('.popup__text--price').textContent = PRICES[getRandomElement(PRICES)] + ' /ночь';
  cardElement.querySelector('.popup__type').textContent = TYPES[getRandomElement(TYPES)];
  cardElement.querySelector('.popup__text--capacity').textContent = ROOMS[getRandomElement(ROOMS)] + ' комнаты для ' + GUESTS[getRandomElement(GUESTS)] + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + TIMES[getRandomElement(TIMES)] + ', выезд до ' + TIMES[getRandomElement(TIMES)];
  cardElement.querySelector('.popup__features').content = getFeatures();
  cardElement.querySelector('.popup__description').textContent = DESCRIPTIONS[getRandomElement(DESCRIPTIONS)];
  cardElement.querySelector('.popup__photo').src = PHOTOS[getRandomElement(PHOTOS)];

  return cardElement;
};

var fragment = document.createDocumentFragment();

for (var i = 1; i <= CARD_COUNT; i++) {
  fragment.appendChild(renderCard(i));
  // fragment.appendChild(getFeatures());
}

var advert = document.querySelector('.map__pins');
advert.appendChild(fragment);

var map = document.querySelector('.map');
map.classList.remove('map--faded');
