'use strict';

(function () {
  var LEFT_MOUSE_BUTTON = 1;

  var Adverts = {
    MIN: 0,
    MAX: 5
  };

  var PinHalf = {
    WIDTH: 25,
    HEIGHT: 35
  };

  var pinActiveClass = 'map__pin--active';

  // Создание элемента указателя по шаблону
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var filtersContainer = document.querySelector('.map__filters-container');
  var mapPinsElement = document.querySelector('.map__pins');

  var renderPin = function (card) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style = 'left: ' + (card.location.x - PinHalf.WIDTH) + 'px; top: ' + (card.location.y - PinHalf.HEIGHT) + 'px;';
    pinElement.querySelector('img').src = card.author.avatar;
    return pinElement;
  };

  window.render = window.debounce(function (offers) {
    var pinFragment = document.createDocumentFragment();

    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      pin.remove();
    });

    var cutOffers = offers.slice(Adverts.MIN, Adverts.MAX);

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
          activePin.classList.remove(pinActiveClass);
        }

        pin.classList.add(pinActiveClass);

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
