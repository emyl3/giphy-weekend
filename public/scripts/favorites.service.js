angular.module('giphyApp')
       .service('fav', FavoriteService);

function FavoriteService($http) {
  this.getFav = function () {
    return $http.get('/database')
    .then(function (response) {
        return response.data;
      });
  };

  this.postFav = function (data) {
    return $http.post('/database', data);
  };

}
