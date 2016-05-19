(function () {
  'use strict';

  angular
    .module('app.common')
    .service('coffeeCompassApi', coffeeCompassApi);

  coffeeCompassApi.$inject = ['$timeout', '$http', '$q', '$ionicLoading', 'CacheFactory'];

  /* @ngInject */
  function coffeeCompassApi($timeout, $http, $q, $ionicLoading, CacheFactory) {

    var url = "http://www.thecoffeecompass.com/";
    var self = this;

    if (!CacheFactory.get("postsCache")) {
      CacheFactory("postsCache", {
        storageMode: "localStorage",
        maxAge: 1 * 1000 * 60 * 60, // one hour
        deleteOnExpire: "aggressive"
      });
    }
    if (!CacheFactory.get("postDataCache")) {
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
        self.getRecentBlogPosts()
          .then(function () {
            // Blog Posts Cache was automatically refreshed
          }, function () {
            postsCache.put(key, value);
          });
      }
    });

    postDataCache.setOptions({
      onExpire: function (key, value) {
        self.getLeagueData()
          .then(function () {
            // Post Data Cache was automatically refreshed
          }, function () {
            // Error getting data. Putting expired item back in the cache
            postDataCache.put(key, value);
          });
      }
    });

    return {
      getRecentBlogPosts: getRecentBlogPosts,
      getBlogPostById: getBlogPostById,
      getPostsWithGeoLocationData: getPostsWithGeoLocationData
    };

    ////////////////

    function getRecentBlogPosts(forceRefresh) {
      if (typeof forceRefresh === "undefined") {
        forceRefresh = false;
      }

      var deferred = $q.defer(),
        cacheKey = "postsCache",
        postsData = null;

      if (!forceRefresh) {
        postsData = postsCache.get(cacheKey);
      }

      if (postsData) {
        deferred.resolve(postsData);
      } else {
        $ionicLoading.show({template: "Loading ..."});
        $http.get(url + "?json=get_recent_posts?callback")
          .success(function (data) {
            angular.forEach(data.posts, function (value) {
              var dateClean = new Date(value.date.replace(' ', 'T'));
              value.date = dateClean.setHours(dateClean.getHours() + 4);
              if (value.attachments.length === 0) {
                value.attachments.push({
                  url: 'img/icon.png'
                })
              }
            });
            postsCache.put(cacheKey, data);
            $ionicLoading.hide();
            deferred.resolve(data);
          })
          .error(function () {
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
        deferred.resolve(postData);
      } else {
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
            postsCache.put(cacheKey, value);
            $ionicLoading.hide();
            deferred.resolve(value);
          })
          .error(function () {
            $ionicLoading.hide();
            deferred.reject();
          }).finally(function () {
            $ionicLoading.hide();
          });
      }
      return deferred.promise;
    }

    function getPostsWithGeoLocationData() {
      var deferred = $q.defer();

      $ionicLoading.show({template: "Loading ..."});
      $http.get(url + "api/geolocation/get_geo_data/")
        .success(function (data) {
          $ionicLoading.hide();
          deferred.resolve(data);
        })
        .error(function () {
          $ionicLoading.hide();
          deferred.reject();
        });
      return deferred.promise;
    }
  }

})();
