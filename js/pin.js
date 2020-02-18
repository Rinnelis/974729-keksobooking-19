'use strict';

(function () {
  var CARD_COUNT = 8;
  var DESCRIPTIONS = ['описание1', 'описание2', 'описание3', 'описание4', 'описание5', 'описание6', 'описание7', 'описание8'];
  var BUTTON_TAG_NAME = 'button';
  var LEFT_MOUSE_BUTTON = 1;

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

    pinElement.style = 'left: ' + (window.util.getIntervalNumber(350, 600) + pinXTransfer) + 'px; top: ' + (window.util.getIntervalNumber(350, 600) + pinУTransfer) + 'px;';
    pinElement.querySelector('img').src = avatar;
    pinElement.querySelector('img').alt = description;
    return pinElement;
  };

  var pins = [];

  // Создание и заполнение фрагмента
  var fragment = document.createDocumentFragment();
  window.fragment = fragment;

  for (var i = 1; i <= CARD_COUNT; i++) {
    var advertDescription = DESCRIPTIONS[i - 1];
    var image = makeAvatar(i);

    var pin = renderPin(image, advertDescription);
    pins.push(pin);

    fragment.appendChild(pin);
  }

  // Добавляет объявления на карту
  var filtersContainer = document.querySelector('.map__filters-container');

  pins.forEach(function (tag) {
    tag.addEventListener('click', function (evt) {
      var target = evt.target;

      if (target.tagName.toLowerCase() === BUTTON_TAG_NAME) {
        target = target.children[0];
      }

      var pinAvatar = target.src;
      var pinDescription = target.alt;

      var card = window.renderCard(pinAvatar, pinDescription);
      var extraCard = document.querySelector('.popup');

      var onPopupEscPress = function (keyEvt) {
        window.util.isEscEvent(keyEvt, closePopup(card));
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
})();
