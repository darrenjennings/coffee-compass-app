(function () {
  'use strict';

  angular
    .module('app.common')
    .service('coffeeCompassApi', coffeeCompassApi);

  coffeeCompassApi.$inject = ['$http'];

  /* @ngInject */
  function coffeeCompassApi($http) {

    var url = "http://www.thecoffeecompass.com/";
    var service = {
      getRecentBlogPosts: getRecentBlogPosts
    };

    return service;

    ////////////////

    function getRecentBlogPosts() {
      return $http.get(url + "?json=get_recent_posts?callback")
    }
  }

})();
