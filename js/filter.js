'use strict';

(function () {
  var filtersForm = document.querySelector('.map__filters');
  var FilterStates = {
    'housing-type': 'any',
    'housing-price': ['any', 'low', 'middle', 'high'],
    'housing-rooms': 'any',
    'housing-guests': 'any',
    'featuresList': []
  };

  var Prices = {
    MIDDLE: 10000,
    LOW: 0,
    HIGH: 50000
  };

  var Features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var comparePrice = function (price) {
    if (price >= Prices.LOW && price < Prices.MIDDLE) {
      return FilterStates['housing-price'['low']];
    } else if (price >= Prices.MIDDLE && price < Prices.HIGH) {
      return FilterStates['housing-price'['middle']];
    } else if (price >= Prices.HIGH) {
      return FilterStates['housing-price'['high']];
    } else {
      return FilterStates['housing-price'['']];
    }
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
      return ad.offer.price === comparePrice(ad.offer.price);
    });

    var filteredByRoom = filteredByPrice.filter(function (ad) {
      if (FilterStates['housing-rooms'] === 'any') {
        return true;
      }
      return ad.offer.rooms === FilterStates['housing-rooms'];
    });

    var filteredByGuest = filteredByRoom.filter(function (ad) {
      if (FilterStates['housing-guests'] === 'any') {
        return true;
      }
      return ad.offer.guests === FilterStates['housing-guests'];
    });

    var filteredByFeature = filteredByGuest.filter(function (ad) {
      return ad.offer.features.includes(Features.some());
    });

    return filteredByFeature;
  };

  filtersForm.addEventListener('change', function (evt) {
    var name = evt.target.name;
    var value = evt.target.value;

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
    console.log(FilterStates);
  });

})();
