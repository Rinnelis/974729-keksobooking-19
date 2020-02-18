'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  window.util = {
    getIntervalNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    isEscEvent: function (evt, action) {
      if (evt.key === ESC_KEY) {
        action();
      }
    },

    isEnterEvent: function (evt, action) {
      if (evt.key === ENTER_KEY) {
        action();
      }
    }
  };
})();
