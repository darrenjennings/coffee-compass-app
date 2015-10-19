// Ionic Starter App

angular.module('theCoffeeCompass', ['ionic', 'angular-cache', 'app.common',
  'blog',
  'map'])

  .run(function ($ionicPlatform, CacheFactory) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }


    });
  })

  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    $ionicConfigProvider.tabs.position('bottom'); // other values: top

    $stateProvider

      // setup an abstract state for the tabs directive
      .state('app', {
        abstract: true,
        url: "/app",
        templateUrl: "app/menu-layout.html"
      })
      .state('app.blog', {
        url: '/blog',
        views: {
          "mainContent": {
            templateUrl: 'app/blog/blog.tpl.html',
            controller: 'blogCtrl'
          }
        },
        cache: false
      })
      .state('app.blog-post', {
        url: "/blog/:id",
        views: {
          'mainContent': {
            templateUrl: "app/blog/blogPost.tpl.html",
            controller: 'blogPostCtrl'
          }
        }
      })
      .state('app.map', {
        url: '/map',
        views: {
          "mainContent": {
            templateUrl: 'app/map/map.tpl.html',
            controller: 'mapCtrl'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/blog');
    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
      window.open = cordova.InAppBrowser.open;
    }
  });
