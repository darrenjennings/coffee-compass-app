(function () {
  'use strict';

  angular
    .module('blog')
    .controller('blogCtrl', blogCtrl);

  blogCtrl.$inject = ['$scope','coffeeCompassApi'];

  /* @ngInject */
  function blogCtrl($scope,coffeeCompassApi) {
    /* jshint validthis: true */
    var vm = $scope;

    vm.activate = activate;
    vm.title = 'blogCtrl';

    vm.loadRecentPosts = function () {
      coffeeCompassApi.getRecentBlogPosts().then(function (data) {
        angular.forEach(data.posts, function (value, key) {
          var dateClean = new Date(value.date.replace(' ', 'T'));
          value.date = dateClean.setHours(dateClean.getHours() + 4);
        })
        vm.BlogPosts = data.posts;
      }).finally(function () {
        vm.$broadcast('scroll.refreshComplete');
      });
    }

    activate();

    ////////////////


    function activate() {
      vm.loadRecentPosts();
    }

  }
})();
