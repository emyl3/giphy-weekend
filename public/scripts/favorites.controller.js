angular.module('giphyApp')
       .controller('FavoritesController', FavoritesController);

function FavoritesController(fav) {
  fCtrl.favoriteResult = {};

  fav.getFav().then(function (response) {
    fCtrl.favoriteResult = response.data;
    console.log('fctrl result', response.data);
  });
}
