'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var PICTURE_WIDTH = 70;
  var PICTURE_HEIGHT = 70;

  var avatarChooser = document.querySelector('.ad-form-header__input');
  var avatarPicture = document.querySelector('.ad-form-header__preview img');
  var apartmentPhotoChooser = document.querySelector('.ad-form__input');
  var apartmentPicture = document.querySelector('.ad-form__photo');

  avatarChooser.addEventListener('change', function (evt) {
    var file = evt.target.files[0];
    uploadPicture(file, avatarPicture);
  });

  apartmentPhotoChooser.addEventListener('change', function (evt) {
    var img = document.createElement('img');
    img.width = PICTURE_WIDTH;
    img.height = PICTURE_HEIGHT;

    var file = evt.target.files[0];
    uploadPicture(file, img);
    apartmentPicture.appendChild(img);
  });

  var uploadPicture = function (file, preview) {
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };
})();
