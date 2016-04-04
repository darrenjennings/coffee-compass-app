(function () {
  'use strict';

  angular
    .module('app.common')
    .service('coffeeCompassApi', coffeeCompassApi);

  coffeeCompassApi.$inject = ['$timeout', '$http', '$q', '$ionicLoading', 'CacheFactory'];

  /* @ngInject */
  function coffeeCompassApi($timeout, $http, $q, $ionicLoading, CacheFactory) {

    var url = "http://www.thecoffeecompass.com/";

    if (!CacheFactory.get("postsCache")) {
      console.log("Post cache doesn't exist. Initializing...")
      CacheFactory("postsCache", {
        storageMode: "localStorage",
        maxAge: 1 * 1000 * 60 * 60, // one hour
        deleteOnExpire: "aggressive"
      });
    }
    if (!CacheFactory.get("postDataCache")) {
      console.log("Post cache doesn't exist. Initializing...")
      CacheFactory("postDataCache", {
        storageMode: "localStorage",
        maxAge: 1 * 1000 * 60 * 60, // one hour
        deleteOnExpire: "aggressive"
      });
    }

    var postsCache = CacheFactory.get("postsCache");
    var postDataCache = CacheFactory.get("postDataCache");


    postsCache.setOptions({
      onExpire: function (key, value) {
        getRecentBlogPosts()
          .then(function () {
            console.log("Blog Posts Cache was automatically refreshed", new Date());
          }, function () {
            console.log("Error getting data. Putting expired item back in the cache", new Date());
            postsCache.put(key, value);
          });
      }
    });

    postDataCache.setOptions({
      onExpire: function (key, value) {
        getLeagueData()
          .then(function () {
            console.log("Post Data Cache was automatically refreshed", new Date());
          }, function () {
            console.log("Error getting data. Putting expired item back in the cache", new date());
            postDataCache.put(key, value);
          });
      }
    });

    var service = {
      getRecentBlogPosts: getRecentBlogPosts,
      getBlogPostById: getBlogPostById,
      getPostsWithGeoLocationData: getPostsWithGeoLocationData

    };

    return service;

    ////////////////

    function getRecentBlogPosts(forceRefresh) {
      if (typeof forceRefresh === "undefined") {
        forceRefresh = false;
      }

      var deferred = $q.defer();

      var cacheKey = "postsCache";
      var postsData = null;

      if (!forceRefresh) {
        postsData = postsCache.get(cacheKey);
      }
      ;

      if (postsData) {
        console.log("Found data inside cache", postsData);
        deferred.resolve(postsData);
      } else {
        console.log("Refreshing data via HTTP");
        $ionicLoading.show({template: "Loading ..."});
        $http.get(url + "?json=get_recent_posts?callback")
          //$http.get(url + "api/get_posts?count=-1")
          .success(function (data) {
            angular.forEach(data.posts, function (value, key) {
              var dateClean = new Date(value.date.replace(' ', 'T'));
              value.date = dateClean.setHours(dateClean.getHours() + 4);
              if (value.attachments.length === 0) {
                value.attachments.push({
                  url: 'img/icon.png'
                })
              }
            });
            console.log("putting into cache...");
            postsCache.put(cacheKey, data);
            console.log("put into cache complete.");
            $ionicLoading.hide();
            deferred.resolve(data);
          })
          .error(function () {
            console.log("Error while making HTTP call.");
            $ionicLoading.hide();
            deferred.reject();
          }).finally(function () {
            $ionicLoading.hide();
          });
      }
      return deferred.promise;
    }

    function getBlogPostById(forceRefresh, id) {
      if (typeof forceRefresh === "undefined") {
        forceRefresh = false;
      }

      var deferred = $q.defer(),
        cacheKey = "postData-" + id,
        postData = null;

      if (!forceRefresh) {
        postData = postDataCache.get(cacheKey);
      }

      if (postData) {
        console.log("Found data inside cache", postData);
        deferred.resolve(postData);
      } else {
        console.log("Refreshing data via HTTP");
        $ionicLoading.show({template: "Loading ..."});
        $http.get(url + "api/get_post?id=" + id)
          .success(function (data) {
            var value = data.post;
            var dateClean = new Date(value.date.replace(' ', 'T'));
            value.date = dateClean.setHours(dateClean.getHours() + 4);
            if (value.attachments.length === 0) {
              value.attachments.push({
                url: 'img/icon.png'
              })
            }
            console.log("putting into cache...");
            postsCache.put(cacheKey, value);
            console.log("put into cache complete.");
            $ionicLoading.hide();
            deferred.resolve(value);
          })
          .error(function () {
            console.log("Error while making HTTP call.");
            $ionicLoading.hide();
            deferred.reject();
          }).finally(function () {
            $ionicLoading.hide();
          });
      }
      return deferred.promise;
    }

    function getPostsWithGeoLocationData() {
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
      $http.get(url + "api/geolocation/get_geo_data/")
        .success(function (data) {
          //self.leaguesCache.put(cacheKey);
          $ionicLoading.hide();
          deferred.resolve(data);
        })
        .error(function () {
          console.log("Error while making HTTP call.");
          $ionicLoading.hide();
          deferred.reject();
        });
      return deferred.promise;
    }

    function getCoffeShopPosts() {
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
      $http.get(url + "api/core/get_category_posts/?slug=coffee-shops&count=-1")
        .success(function (data) {
          //self.leaguesCache.put(cacheKey);
          $ionicLoading.hide();
          deferred.resolve(data);
        })
        .error(function () {
          console.log("Error while making HTTP call.");
          $ionicLoading.hide();
          deferred.reject();
        });
      return deferred.promise;
    }

  }

})();
