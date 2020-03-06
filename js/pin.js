'use strict';

(function () {
  var MUFFIN_WIDTH = 40;
  var MUFFIN_HEIGHT = 44;
  var LEFT_MOUSE_BUTTON = 1;

  // Создание элемента указателя по шаблону
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPin = function (card) {
    var pinElement = pinTemplate.cloneNode(true);
    var pinXTransfer = 25; // половина ширины метки
    var pinУTransfer = 35; // половина высоты метки, включая острый конец

    pinElement.style = 'left: ' + (card.location.x - pinXTransfer) + 'px; top: ' + (card.location.y - pinУTransfer) + 'px;';
    pinElement.querySelector('img').src = card.author.avatar;
    return pinElement;
  };

  var pins = [];
  var filtersContainer = document.querySelector('.map__filters-container');

  // Создание и заполнение фрагмента
  var successHandler = function (cards) {
    var pinFragment = document.createDocumentFragment();
    window.pinFragment = pinFragment;

    cards.forEach(function (cardUnit) {
      var pin = renderPin(cardUnit);
      pins.push(pin);
      var card = window.renderCard(cardUnit);

      pinFragment.appendChild(pin);

      pin.addEventListener('click', function () {
        var extraCard = document.querySelector('.popup');

        var onPopupEscPress = function (keyEvt) {
          if (window.util.isEscEvent(keyEvt)) {
            closePopup(card);
          }
        };

        var closePopup = function (cardElement) {
          cardElement.remove();
          document.removeEventListener('keydown', onPopupEscPress);
        };

        if (extraCard) {
          closePopup(extraCard);
        }

        var popupCloseButton = card.querySelector('.popup__close');

        popupCloseButton.addEventListener('mousedown', function () {
          if (event.which === LEFT_MOUSE_BUTTON) {
            closePopup(card);
          }
        });

        document.addEventListener('keydown', onPopupEscPress);

        filtersContainer.before(card);
      });
    });
  };


  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);

  window.getPinCoords = function (x, y, pointer) {
    var coordX = x + (MUFFIN_WIDTH / 2);
    var coordY = y + (MUFFIN_HEIGHT / 2) + pointer;

    var addressInput = document.querySelector('#address');
    addressInput.value = coordX + ', ' + coordY;
  };
})();
