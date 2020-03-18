'use strict';

(function () {
  var LEFT_MOUSE_BUTTON = 1;
  var MIN_ADVERTS = 0;
  var MAX_ADVERTS = 5;
  var PIN_HALF_WIDTH = 25;
  var PIN_HALF_HEIGHT = 35;

  // Создание элемента указателя по шаблону
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var filtersContainer = document.querySelector('.map__filters-container');
  var mapPinsElement = document.querySelector('.map__pins');

  var renderPin = function (card) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style = 'left: ' + (card.location.x - PIN_HALF_WIDTH) + 'px; top: ' + (card.location.y - PIN_HALF_HEIGHT) + 'px;';
    pinElement.querySelector('img').src = card.author.avatar;
    return pinElement;
  };

  window.render = window.debounce(function (offers) {
    var pinFragment = document.createDocumentFragment();

    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      pin.remove();
    });

    var cutOffers = offers.slice(MIN_ADVERTS, MAX_ADVERTS);

    cutOffers.forEach(function (offer) {
      var pin = renderPin(offer);

      pin.addEventListener('click', function () {
        var closePopup = function (cardElement) {
          cardElement.remove();
          document.removeEventListener('keydown', onPopupEscPress);
        };

        var currentCard = document.querySelector('.popup');
        if (currentCard) {
          closePopup(currentCard);
        }

        var activePin = document.querySelector('.map__pin--active');
        if (activePin) {
          activePin.classList.remove('map__pin--active');
        }

        pin.classList.add('map__pin--active');

        var card = window.renderCard(offer);

        var onPopupEscPress = function (keyEvt) {
          if (window.util.isEscEvent(keyEvt)) {
            closePopup(card);
          }
        };

        var popupCloseButton = card.querySelector('.popup__close');

        popupCloseButton.addEventListener('mousedown', function () {
          if (event.which === LEFT_MOUSE_BUTTON) {
            closePopup(card);
          }
        });

        popupCloseButton.addEventListener('keydown', function (keyEvt) {
          if (window.util.isEnterEvent(keyEvt)) {
            closePopup(card);
          }
        });

        document.addEventListener('keydown', onPopupEscPress);

        filtersContainer.before(card);
      });
      pinFragment.appendChild(pin);
    });
    mapPinsElement.appendChild(pinFragment);
  });
})();
