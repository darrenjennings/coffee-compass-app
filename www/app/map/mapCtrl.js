(function () {
  'use strict';

  angular
    .module('map')
    .controller('mapCtrl', mapCtrl);

  mapCtrl.$inject = ['$scope', '$ionicPlatform', '$ionicLoading', '$stateParams', '$cordovaGeolocation', '$ionicPopup', 'coffeeCompassApi'];

  /* @ngInject */
  function mapCtrl($scope, ionic, $ionicLoading, $stateParams, $cordovaGeolocation, $ionicPopup, coffeeCompassApi) {
    /* jshint validthis: true */
    var vm = this;

    vm.title = 'mapCtrl';

    var options = {timeout: 10000, enableHighAccuracy: true};

    vm.centerOnMe = function () {
      if (!vm.map) {
        return;
      }

      $ionicLoading.show({
        content: 'Getting current location...',
        showBackdrop: true
      });

      $cordovaGeolocation.getCurrentPosition(options).then(function (pos) {
        vm.map.center.latitude = pos.coords.latitude;
        vm.map.center.longitude = pos.coords.longitude;
        var location = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        vm.map.setCenter(location);
        vm.map.setZoom(12);
      }, function (error) {
        var alertPopup = $ionicPopup.alert({
          title: 'Sorry!',
          template: 'We won\'t be able to locate you unless you give us permission. Go into your app settings to grant access.',
          buttons: [
            {text: 'Sounds good!'}
          ]
        });
        $ionicLoading.hide();
        alertPopup.then(function (res) {
          console.log('Permission');
        });
      }).finally(function () {
        $ionicLoading.hide();
        $scope.$broadcast('scroll.refreshComplete');

      });
    };

    activate();
    ////////////////

    function activate() {

      $scope.$on('mapInitialized', function (event, map) {

        vm.map = map;
        //vm.centerOnMe();
        map.setCenter(new google.maps.LatLng(38.254577, -85.758400));
        map.setZoom(4);
        coffeeCompassApi.getPostsWithGeoLocationData().then(function (data) {
          //vm.markers = data;
          var markers = [];
          angular.forEach(data, function (value, key) {
            if (value.ID) {
              markers.push(new google.maps.Marker({
                "title": value.ID.toString(),
                "longitude": value.longitude,
                "id": value.ID,
                "show": false,
                "map": vm.map,
                "icon": 'http://www.thecoffeecompass.com/wp-content/uploads/compass_placemark-e1349062629635.png'
              }));
              var latlng = new google.maps.LatLng(value.latitude, value.longitude);

              markers[key].addListener('click', function (event, p) {
                vm.map.setZoom(12);
                if (vm.infowindow) {
                  vm.infowindow.close();
                }
                vm.infowindow = new google.maps.InfoWindow({
                  content: "<div id='iw-container'><div class='iw-title'><a class='button' href='#/blog'>"+value.post_title+"</a></div></div>"
                });
                removeInfoWindowCSS(vm.infowindow);
                markers[key].info = vm.infowindow;
                map.panTo(event.latLng);
                vm.infowindow.open(markers[key].get('map'), markers[key]);
              });

              markers[key].setPosition(latlng);
              markers[key].setMap(vm.map);
            }

          });
        });
      });
    }

    function removeInfoWindowCSS(infowindow) {
      google.maps.event.addListener(infowindow, 'domready', function () {

        // Reference to the DIV which receives the contents of the infowindow using jQuery
        var iwOuter = $('.gm-style-iw');

        /* The DIV we want to change is above the .gm-style-iw DIV.
         * So, we use jQuery and create a iwBackground variable,
         * and took advantage of the existing reference to .gm-style-iw for the previous DIV with .prev().
         */
        var iwBackground = iwOuter.prev();

        // Remove the background shadow DIV
        iwBackground.children(':nth-child(2)').css({'display': 'none'});

        // Remove the white background DIV
        iwBackground.children(':nth-child(4)').css({'display': 'none'});

        iwBackground.children(':nth-child(3)').find('div').children().css({'opacity':'.8','background-color':'white','box-shadow': 'rgba(0,0, 0, 1) 0px 0px 0px', 'z-index' : '1'});
        // Taking advantage of the already established reference to
// div .gm-style-iw with iwOuter variable.
// You must set a new variable iwCloseBtn.
// Using the .next() method of JQuery you reference the following div to .gm-style-iw.
// Is this div that groups the close button elements.
        var iwCloseBtn = iwOuter.next();

        // Apply the desired effect to the close button
        iwCloseBtn.css({
          opacity: '0', // by default the close button has an opacity of 0.7
          right: '12px', top: '6px', // button repositioning
          border: '7px solid #000000', // increasing button border and new color
          'border-radius': '10px' // circular effect
        });

      // The API automatically applies 0.7 opacity to the button after the mouseout event.
      // This function reverses this event to the desired value.
        iwCloseBtn.mouseout(function () {
          $(this).css({opacity: '1'});
        });
      });
    }
  }
})();
