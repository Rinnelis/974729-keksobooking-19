'use strict';

(function () {
  var filtersForm = document.querySelector('.map__filters');
  var filterType = filtersForm.querySelector('#housing-type');

  filterType.addEventListener('change', function () {
    switch (filterType.value) {
      case 'palace':
        // card.offer.type;
        break;
      case 'flat':
        // card.offer.type;
        break;
      case 'house':
        // card.offer.type;
        break;
      case 'bungalo':
        // card.offer.type;
        break;
      default:
        window.backend.load(window.pin.success, window.pin.error);
        break;
    }
  });
})();
