'use strict';

(function () {
  var filtersForm = document.querySelector('.map__filters');

  var FilterStates = {
    'housing-type': 'any',
    'housing-price': 'any',
    'housing-rooms': 'any',
    'housing-guests': 'any',
    'featuresList': []
  };

  var Prices = {
    MIDDLE: 10000,
    HIGH: 50000
  };

  var PriceComparer = {
    low: function (price) {
      return price < Prices.MIDDLE;
    },
    middle: function (price) {
      return price >= Prices.MIDDLE && price < Prices.HIGH;
    },
    high: function (price) {
      return price >= Prices.HIGH;
    }
  };

  var filterRooms = function (filterValue, advert) {
    switch (filterValue) {
      case '1':
        return advert.offer.rooms === 1;
      case '2':
        return advert.offer.rooms === 2;
      case '3':
      default:
        return advert.offer.rooms === 3;
    }
  };

  var filterGuests = function (filterValue, advert) {
    switch (filterValue) {
      case '0':
        return advert.offer.guests === 0;
      case '1':
        return advert.offer.guests === 1;
      case '2':
      default:
        return advert.offer.guests === 2;
    }
  };

  var arrayContainsArray = function (superset, subset) {
    return subset.every(function (value) {
      return (superset.indexOf(value) >= 0);
    });
  };

  var filterOffers = function () {
    var filteredByType = window.adverts.filter(function (ad) {
      if (FilterStates['housing-type'] === 'any') {
        return true;
      }
      return ad.offer.type === FilterStates['housing-type'];
    });

    var filteredByPrice = filteredByType.filter(function (ad) {
      if (FilterStates['housing-price'] === 'any') {
        return true;
      }
      return PriceComparer[FilterStates['housing-price']](ad.offer.price);
    });

    var filteredByRoom = filteredByPrice.filter(function (ad) {
      if (FilterStates['housing-rooms'] === 'any') {
        return true;
      }
      return filterRooms(FilterStates['housing-rooms'], ad);
    });

    var filteredByGuest = filteredByRoom.filter(function (ad) {
      if (FilterStates['housing-guests'] === 'any') {
        return true;
      }
      return filterGuests(FilterStates['housing-guests'], ad);
    });

    var filteredByFeature = filteredByGuest.filter(function (ad) {
      if (FilterStates['featuresList'] === []) {
        return true;
      }
      return arrayContainsArray(ad.offer.features, FilterStates['featuresList']);
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
      if (FilterStates.featuresList.includes(value)) {
        FilterStates.featuresList = FilterStates.featuresList.filter(function (feature) {
          return !(feature === value);
        });
      } else {
        FilterStates.featuresList.push(value);
      }
      window.debounce(window.render(filterOffers()));
      return;
    }

    FilterStates[name] = value;
    window.debounce(window.render(filterOffers()));
  });
})();
