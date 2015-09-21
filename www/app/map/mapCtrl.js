(function () {
  'use strict';

  angular
    .module('map')
    .controller('mapCtrl', mapCtrl);

  mapCtrl.$inject = ['$ionicPlatform','$ionicLoading','$stateParams', '$cordovaGeolocation'];

  /* @ngInject */
  function mapCtrl(ionic, $ionicLoading, $stateParams, $cordovaGeolocation) {
    /* jshint validthis: true */
    var vm = this;

    vm.activate = activate;
    vm.title = 'mapCtrl';
    vm.map = {
      center: {
        latitude: 38.254577,
        longitude: -85.758400
      },
      zoom: 13
    };

    var options = {timeout: 10000, enableHighAccuracy: true};

    vm.centerOnMe = function() {
      if(!vm.map) {
        return;
      }

      $ionicLoading.show({
        content: 'Getting current location...',
        showBackdrop: false
      });

      $cordovaGeolocation.getCurrentPosition(options).then(function(pos){
        vm.map.center.latitude = pos.coords.latitude;
        vm.map.center.longitude = pos.coords.longitude;
        //window.location = "geo:" + pos.coords.latitude + "," + pos.coords.longitude + ";u=35";
      }, function(error) {
        alert('Unable to get location: ' + error.message);
      }).finally(function(){
        $ionicLoading.hide();
      });
    };

    activate();

    ////////////////

    function activate() {
      //vm.centerOnMe();
    }
  }
})();
