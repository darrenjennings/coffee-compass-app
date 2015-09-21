(function () {
  'use strict';

  angular
    .module('app.common')
    .service('coffeeCompassApi', coffeeCompassApi);

  coffeeCompassApi.$inject = ['$http','$q','$ionicLoading'];

  /* @ngInject */
  function coffeeCompassApi($http, $q, $ionicLoading) {

    var url = "http://www.thecoffeecompass.com/";
    var service = {
      getRecentBlogPosts: getRecentBlogPosts
    };

    return service;

    ////////////////

    function getRecentBlogPosts() {
      //return $http.get(url + "?json=get_recent_posts?callback")
      var deferred = $q.defer();

      //var cacheKey = "leagues";
      //var leaguesData = self.leaguesCache.get(cacheKey);

      /*if(leaguesData){
        console.log("Found data inside cache", leaguesData);
        deferred.resolve(leaguesData);
      } else {*/
        console.log("Refreshing data via HTTP");
        $ionicLoading.show({template: "Loading ..."});
        $http.get(url + "?json=get_recent_posts?callback")
          .success(function(data){
            //self.leaguesCache.put(cacheKey);
            $ionicLoading.hide();
            deferred.resolve(data);
          })
          .error(function(){
            console.log("Error while making HTTP call.");
            $ionicLoading.hide();
            deferred.reject();
          });
      return deferred.promise;
    }
  }

})();
