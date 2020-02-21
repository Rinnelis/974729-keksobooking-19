'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  window.util = {
    getIntervalNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    isEscEvent: function (evt) {
      return evt.key === ESC_KEY;
    },

    isEnterEvent: function (evt) {
      return evt.key === ENTER_KEY;
    }
  };
})();
