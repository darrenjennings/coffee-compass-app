(function () {
  'use strict';

  angular
    .module('blog')
    .controller('blogCtrl', blogCtrl);

  blogCtrl.$inject = ['$scope','coffeeCompassApi'];

  /* @ngInject */
  function blogCtrl($scope, coffeeCompassApi) {
    /* jshint validthis: true */
    var vm = this;

    vm.activate = activate;
    vm.title = 'blogCtrl';

    vm.loadRecentPosts = function (forceRefresh) {
      coffeeCompassApi.getRecentBlogPosts(forceRefresh).then(function (data) {
        vm.BlogPosts = data.posts;
      }).finally(function() {
        $scope.$broadcast('scroll.refreshComplete');
      });
    }

    vm.getIconByCategory = function(post){
      if(_.includes(post.categories,'coffee-shops')){
        return '';
      } else {
        return '';
      }
    }

    activate();

    ////////////////


    function activate() {
      vm.loadRecentPosts(false);
    }

  }
})();
