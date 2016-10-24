angular.module('giphyApp')
       .controller('MainController', MainController);

function MainController(fav, gif) {
  var mCtrl = this;
  mCtrl.favoriteResult = [];
  mCtrl.favoriteCount = '';
  mCtrl.results = [];
  mCtrl.comment = '';
  mCtrl.image = [];
  mCtrl.statusOne = 'show';
  mCtrl.statusTwo = 'hide';

  // updates favorite count
  fav.getFav().then(function (response) {
    mCtrl.favoriteCount = '';
    mCtrl.favoriteCount = response.length;
    mCtrl.favoriteResult = response;
  });

  // gets a random image on page load
  gif.randomImageRequest().then(function (url) {
    mCtrl.image.push(angular.copy(url));
  });

  //gets a random image on click
  mCtrl.getRandomImage = function () {
    mCtrl.image = [];
    mCtrl.results = [];

    gif.randomImageRequest().then(function (url) {
      mCtrl.image.push(angular.copy(url));
    });

  };

  mCtrl.showForm = function () {
    mCtrl.statusOne = 'hide';
    mCtrl.statusTwo = 'show';
  }

  mCtrl.hideForm = function () {
    mCtrl.statusTwo = 'hide';
    mCtrl.statusOne = 'show';
  };

  mCtrl.reload = function()
  {
   location.reload();
 };

  mCtrl.postFav = function (entry) {
    fav.postFav(entry).then(mCtrl.reload()).then(function (response) {
      mCtrl.comment = '';
      alert('The gif has been added to your favorites!');
    });
  };

  mCtrl.getSearchImage = function (search) {
    var searchString = '';

    //clears previous results
    mCtrl.results = [];
    mCtrl.image = [];

    //sets search value and clears form data

    mCtrl.statusOne = 'hide';
    mCtrl.statusThree = 'show';

    //determines if search has spaces, one word, or is blank
    if (search) {
      if (/\s/.test(search)) {
        searchString = search.split(' ').join('+');
      } else {
        searchString = search;
      }

      gif.searchQuery(searchString).then(function (results) {
        mCtrl.results = angular.copy(results);
        search = '';
      });

    } else {
      alert('Please enter any search term... not a blank one. :-)');
      search = '';
    }
  };
}
