'use strict';

(function () {
  var similarCardTemplate = document.querySelector('#card').content.querySelector('.popup');

  var createFeatureMarkup = function (feature) {
    var li = document.createElement('li');
    li.classList.add('popup__feature');
    li.classList.add('popup__feature--' + feature);
    return li;
  };

  var emptyFeatureList = function (list) {
    list.innerHTML = '';
  };

  window.renderCard = function (card) {
    var cardElement = similarCardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__avatar').src = card.author.avatar;
    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').textContent = card.offer.type;
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    cardElement.querySelector('.popup__photo').src = card.offer.photos;

    var featuresList = cardElement.querySelector('.popup__features');
    emptyFeatureList(featuresList);
    var features = card.offer.features;

    features.forEach(function (feature) {
      var featureMarkup = createFeatureMarkup(feature);
      featuresList.appendChild(featureMarkup);
    });

    return cardElement;
  };
})();
