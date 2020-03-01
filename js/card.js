'use strict';

(function () {
  // var TITLES = ['заголовок1', 'заголовок2', 'заголовок3', 'заголовок4', 'заголовок5', 'заголовок6', 'заголовок7', 'заголовок8'];
  // var PRICES = ['1000', '2000', '3000', '4000', '5000', '6000', '7000', '8000'];
  // var TYPES = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
  // var ROOMS = ['1', '2', '3', '4'];
  // var GUESTS = ['1', '2', '3', '4'];
  // var TIMES = ['12:00', '13:00', '14:00'];
  // var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  // var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  // var getRandomElement = function (elements) {
  //   return Math.floor(Math.random() * elements.length);
  // };

  // // Функции создания фич
  // var emptyFeatureList = function (list) {
  //   list.innerHTML = '';
  // };

  // var createFeatureMarkup = function (feature) {
  //   var li = document.createElement('li');
  //   li.classList.add('popup__feature');
  //   li.classList.add('popup__feature--' + feature);

  //   return li;
  // };

  // var createFeaturesMarkup = function () {
  //   var length = window.util.getIntervalNumber(0, FEATURES.length);
  //   var features = [];

  //   for (var j = 0; j < length; j++) {
  //     features.push(createFeatureMarkup(FEATURES[j]));
  //   }
  //   return features;
  // };

  // // Создание карточки из шаблона
  // var similarCardTemplate = document.querySelector('#card')
  // .content
  // .querySelector('.popup');

  // window.renderCard = function (avatar, description) {
  //   var cardElement = similarCardTemplate.cloneNode(true);
  //   var features = createFeaturesMarkup();

  //   cardElement.querySelector('.popup__avatar').src = avatar;
  //   cardElement.querySelector('.popup__title').textContent = TITLES[getRandomElement(TITLES)];
  //   cardElement.querySelector('.popup__text--address').textContent = window.util.getIntervalNumber(250, 1000) + ', ' + window.util.getIntervalNumber(130, 630);
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

  // Создание карточки из шаблона
  var similarCardTemplate = document.querySelector('#card').content;

  window.renderCard = function (card, avatar) {
    var cardElement = similarCardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__avatar').src = avatar;
    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price;
    cardElement.querySelector('.popup__type').textContent = card.offer.type;
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    cardElement.querySelector('.popup__features').textContent = card.offer.features;
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    cardElement.querySelector('.popup__photo').src = card.offer.photos;

    return cardElement;
  };
})();
