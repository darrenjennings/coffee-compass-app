angular.module('starter.controllers', [])
.controller('DashCtrl', function($scope, coffeeCompassApi) {
    var vm = $scope;

    /*vm.BlogPosts = [{
      Title:"Cafe Review: Astro Coffee in Detroit",
      TitleImage:"img/test_image.jpg",
      Content: "If you’ve read anything about the city of Detroit in the last decade you probably know it fell on some pretty hard times. We’ll leave the commentary on the rise and fall of Detroit to economists and urban planners. We, on the other hand, are happy to report there are some pretty great places to get a cup of coffee in Motown. One of those places is Astro Coffee."
    }, {
        Title:"Cafe Review: Astro Coffee in Detroit",
        TitleImage:"img/test_image.jpg",
        Content: "If you’ve read anything about the city of Detroit in the last decade you probably know it fell on some pretty hard times. We’ll leave the commentary on the rise and fall of Detroit to economists and urban planners. We, on the other hand, are happy to report there are some pretty great places to get a cup of coffee in Motown. One of those places is Astro Coffee."
      }]*/
    coffeeCompassApi.getRecentBlogPosts().success(function(data){
      angular.forEach(data.posts, function(value,key){
        var dateClean = new Date(value.date.replace(' ', 'T'));
        value.date = dateClean.setHours(dateClean.getHours()+4);


      })
      vm.BlogPosts = data.posts;

    })



  })

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
