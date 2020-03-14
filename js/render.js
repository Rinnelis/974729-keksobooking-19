'use strict';

(function () {
  var PINS_MAX_AMOUNT = 5;
  var LEFT_MOUSE_BUTTON = 1;

  // Создание элемента указателя по шаблону
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var allPins = [];
  var filtersContainer = document.querySelector('.map__filters-container');

  var renderPin = function (card) {
    var pinElement = pinTemplate.cloneNode(true);
    var pinXTransfer = 25; // половина ширины метки
    var pinУTransfer = 35; // половина высоты метки, включая острый конец

    pinElement.style = 'left: ' + (card.location.x - pinXTransfer) + 'px; top: ' + (card.location.y - pinУTransfer) + 'px;';
    pinElement.querySelector('img').src = card.author.avatar;
    allPins.push(pinElement);
    return pinElement;
  };

  var pinFragment = document.createDocumentFragment();
  window.pinFragment = pinFragment;

  window.render = function (pins) {
    var pinsAmount = pins.length > PINS_MAX_AMOUNT ? PINS_MAX_AMOUNT : pins.length;
    for (var i = 0; i < pinsAmount; i++) {
      pinFragment.appendChild(renderPin(pins[i]));
    }
  };

  allPins.forEach(function (pin) {
    pin.addEventListener('click', function () {
      var card = document.querySelector('.popup');

      var activePins = document.querySelectorAll('.map__pin--active');
      activePins.forEach(function (active) {
        active.classList.remove('map__pin--active');
      });

      pin.classList.add('map__pin--active');

      var onPopupEscPress = function (keyEvt) {
        if (window.util.isEscEvent(keyEvt)) {
          closePopup(card);
        }
      };

      var closePopup = function (cardElement) {
        cardElement.remove();
        document.removeEventListener('keydown', onPopupEscPress);
      };

      if (card) {
        closePopup(card);
      }

      var popupCloseButton = card.querySelector('.popup__close');

      popupCloseButton.addEventListener('mousedown', function () {
        if (event.which === LEFT_MOUSE_BUTTON) {
          closePopup(card);
        }
      });

      document.addEventListener('keydown', onPopupEscPress);

    //   filtersContainer.before(window.renderCard());
    });
  });
})();
