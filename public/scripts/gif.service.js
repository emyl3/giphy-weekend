angular.module('giphyApp')
       .service('gif', GifAPIService);

function GifAPIService($http) {
  const API = 'http://api.giphy.com/v1/gifs';
  const API_KEY = 'dc6zaTOxFJmzC';

  this.randomImageRequest = function () {
    return $http.get(API + '/random', {
      params: {
        api_key: API_KEY,
        rating: 'y',
      },
    }).then(function (response) {
        return response.data.data.image_url;
      });
  };

  this.searchQuery = function (searchString) {
    return $http.get(API + '/search', {
      params: {
        api_key: API_KEY,
        rating: 'y',
        q: searchString,
      },
    }).then(function (response) {
        var arrayOfResponse = response.data.data;
        var result = [];

        arrayOfResponse.forEach(function (element) {
          var value = element.images.downsized.url;
          result.push(value);
        });

        return result;
      });
  };
}
