angular.module('giphyApp')
       .controller('MainController', MainController);

function MainController(fav, gif) {
  var mCtrl = this;
  mCtrl.favoriteResult = {};
  mCtrl.results = [];
  mCtrl.comment = '';
  mCtrl.image = [];

  //gets a random image
  mCtrl.getRandomImage = function () {
    mCtrl.sectionOneStatus = 'show';
    mCtrl.sectionTwoStatus = 'hide';

    gif.randomImageRequest().then(function (url) {
      mCtrl.image.push(angular.copy(url));
    });
  };

  fav.getFav().then(function (response) {
    console.log('response from GET', response);
    mCtrl.favoriteResult = response;
  });

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
