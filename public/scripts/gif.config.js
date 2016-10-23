angular.module('giphyApp')
       .config(function ($routeProvider, $locationProvider) {
        $routeProvider.when('/gifs', {
          templateUrl: 'views/gifs.html',
          controller: 'MainController as mCtrl',
        }).when('/favorite', {
          templateUrl: 'views/favorites.html',
          controller: 'MainController as mCtrl',
        });

        $locationProvider.html5Mode(true);
      });
