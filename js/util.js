'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  window.util = {
    isEscEvent: function (evt) {
      return evt.key === ESC_KEY;
    },

    isEnterEvent: function (evt) {
      return evt.key === ENTER_KEY;
    }
  };
})();
