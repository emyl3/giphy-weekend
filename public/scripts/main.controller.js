angular.module('giphyApp')
       .controller('MainController', MainController);

function MainController(gif) {
  var mCtrl = this;

  mCtrl.results = [];
  mCtrl.image = '';

  //gets a random image
  mCtrl.getRandomImage = function () {
    mCtrl.image = '';
    mCtrl.sectionOneStatus = 'show';
    mCtrl.sectionTwoStatus = 'hide';

    gif.randomImageRequest().then(function (url) {
      mCtrl.image = url;
    });
  };

  mCtrl.getSearchImage = function (search) {
    var searchString = '';

    //clears previous results
    mCtrl.results = [];
    mCtrl.image = '';

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
        mCtrl.results = results;
        search = '';
      });

    } else {
      alert('Please enter any search term... not a blank one. :-)');
      search = '';
    }
  };
}
