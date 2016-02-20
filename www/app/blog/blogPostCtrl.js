(function () {
  'use strict';

  angular
    .module('blog')
    .controller('blogPostCtrl', blogPostCtrl);

  blogPostCtrl.$inject = ['coffeeCompassApi','$stateParams'];

  /* @ngInject */
  function blogPostCtrl(coffeeCompassApi,$stateParams) {
    /* jshint validthis: true */
    var vm = this;

    vm.activate = activate;
    vm.title = 'blogPostCtrl';
    vm.postId = $stateParams.id;
    vm.blogPost = [];

    vm.loadPost = function (id) {
      coffeeCompassApi.getBlogPostById(false, id).then(function (data) {
        vm.BlogPost = data;
      }).finally(function () {
        $scope.$broadcast('scroll.refreshComplete');
      });
    }

    activate();

    ////////////////


    function activate() {
      vm.loadPost(vm.postId);
    }

  }
})();
