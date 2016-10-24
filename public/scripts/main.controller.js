angular.module('giphyApp')
       .controller('MainController', MainController);

function MainController(fav, gif) {
  var mCtrl = this;
  mCtrl.favoriteResult = [];
  mCtrl.favoriteCount = '';
  mCtrl.results = [];
  mCtrl.comment = '';
  mCtrl.image = [];
  mCtrl.status = {};

  // updates favorite count
  fav.getFav().then(function (response) {
    mCtrl.favoriteCount = response.length;
    mCtrl.favoriteResult = response;
    console.log(response);
  });

  // gets a random image on page load
  gif.randomImageRequest().then(function (url) {
    mCtrl.image.push(angular.copy(url));
  });

  //gets a random image on click
  mCtrl.getRandomImage = function () {
    mCtrl.status.one = 'show';
    mCtrl.status.three = 'hide';

    gif.randomImageRequest().then(function (url) {
      mCtrl.image.push(angular.copy(url));
    });
  };

  mCtrl.showForm = function () {
    mCtrl.status.two = 'show';
  }

  mCtrl.hideForm = function () {
    mCtrl.status.two = 'hide';
  }


mCtrl.postFav = function (entry) {
  console.log('entry', entry);
  fav.postFav(entry).then(function (response) {
  console.log('response from POST', response);
  mCtrl.comment = '';
});
}


  mCtrl.getSearchImage = function (search) {
    var searchString = '';

    //clears previous results
    mCtrl.results = [];

    //sets search value and clears form data

    mCtrl.sectionOneStatus = 'hide';
    mCtrl.sectionTwoStatus = 'show';

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
