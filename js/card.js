'use strict';

(function () {
  var IMG_WIDTH = 45;
  var IMG_HEIGHT = 40;
  var IMG_ALT = 'Фотография жилья';

  var ApartmentTypesMap = {
    'BUNGALO': 'Бунгало',
    'FLAT': 'Квартира',
    'HOUSE': 'Дом',
    'PALACE': 'Дворец'
  };

  var createFeatureMarkup = function (feature) {
    var li = document.createElement('li');
    li.classList.add('popup__feature');
    li.classList.add('popup__feature--' + feature);
    return li;
  };

  var emptyList = function (list) {
    list.innerHTML = '';
  };

  var createPhotoMarkup = function () {
    var img = document.createElement('img');
    img.classList.add('popup__photo');
    img.width = IMG_WIDTH;
    img.height = IMG_HEIGHT;
    img.alt = IMG_ALT;
    return img;
  };

  var similarCardTemplate = document.querySelector('#card').content.querySelector('.popup');
  window.renderCard = function (card) {
    var cardElement = similarCardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__avatar').src = card.author.avatar;
    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').textContent = ApartmentTypesMap[card.offer.type.toUpperCase()];
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = card.offer.description;

    var featuresList = cardElement.querySelector('.popup__features');
    emptyList(featuresList);
    var features = card.offer.features;

    features.forEach(function (feature) {
      var featureMarkup = createFeatureMarkup(feature);
      featuresList.appendChild(featureMarkup);
    });

    var photosList = cardElement.querySelector('.popup__photos');
    emptyList(photosList);
    var photos = card.offer.photos;

    photos.forEach(function (photo) {
      var picture = createPhotoMarkup();
      picture.src = photo;
      photosList.appendChild(picture);
    });

    return cardElement;
  };
})();
