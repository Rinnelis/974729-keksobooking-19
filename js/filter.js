'use strict';

(function () {
  var Numbers = {
    ZERO: '0',
    ONE: '1',
    TWO: '2',
    THREE: '3'
  };

  var filtersForm = document.querySelector('.map__filters');

  var filterStates = {
    'housing-type': 'any',
    'housing-price': 'any',
    'housing-rooms': 'any',
    'housing-guests': 'any',
    'featuresList': []
  };

  var Price = {
    MIDDLE: 10000,
    HIGH: 50000
  };

  var priceComparer = {
    low: function (price) {
      return price < Price.MIDDLE;
    },
    middle: function (price) {
      return price >= Price.MIDDLE && price < Price.HIGH;
    },
    high: function (price) {
      return price >= Price.HIGH;
    }
  };

  var filterRooms = function (filterValue, advert) {
    switch (filterValue) {
      case Numbers.ONE:
        return advert.offer.rooms === Number(Numbers.ONE);
      case Numbers.TWO:
        return advert.offer.rooms === Number(Numbers.TWO);
      case Numbers.THREE:
      default:
        return advert.offer.rooms === Number(Numbers.THREE);
    }
  };

  var filterGuests = function (filterValue, advert) {
    switch (filterValue) {
      case Numbers.ZERO:
        return advert.offer.guests === Number(Numbers.ZERO);
      case Numbers.ONE:
        return advert.offer.guests === Number(Numbers.ONE);
      case Numbers.TWO:
      default:
        return advert.offer.guests === Number(Numbers.TWO);
    }
  };

  var isArrayContainsArray = function (superset, subset) {
    return subset.every(function (value) {
      return (superset.indexOf(value) >= 0);
    });
  };

  var filterOffers = function () {
    var filteredByType = window.adverts.filter(function (ad) {
      if (filterStates['housing-type'] === 'any') {
        return true;
      }
      return ad.offer.type === filterStates['housing-type'];
    });

    var filteredByPrice = filteredByType.filter(function (ad) {
      if (filterStates['housing-price'] === 'any') {
        return true;
      }
      return priceComparer[filterStates['housing-price']](ad.offer.price);
    });

    var filteredByRoom = filteredByPrice.filter(function (ad) {
      if (filterStates['housing-rooms'] === 'any') {
        return true;
      }
      return filterRooms(filterStates['housing-rooms'], ad);
    });

    var filteredByGuest = filteredByRoom.filter(function (ad) {
      if (filterStates['housing-guests'] === 'any') {
        return true;
      }
      return filterGuests(filterStates['housing-guests'], ad);
    });

    var filteredByFeature = filteredByGuest.filter(function (ad) {
      if (filterStates['featuresList'] === []) {
        return true;
      }
      return isArrayContainsArray(ad.offer.features, filterStates['featuresList']);
    });
    return filteredByFeature;
  };

  filtersForm.addEventListener('change', function (evt) {
    var name = evt.target.name;
    var value = evt.target.value;

    var popup = document.querySelector('.popup');
    if (popup) {
      popup.remove();
    }

    if (name === 'features') {
      if (filterStates.featuresList.includes(value)) {
        filterStates.featuresList = filterStates.featuresList.filter(function (feature) {
          return !(feature === value);
        });
      } else {
        filterStates.featuresList.push(value);
      }
      window.render(filterOffers());
      return;
    }

    filterStates[name] = value;
    window.render(filterOffers());
  });
})();
