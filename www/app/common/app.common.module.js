(function () {
  'use strict';

  angular
    .module('app.common', [
      'ngCordova'
    ]).config(['uiGmapGoogleMapApiProvider', function (uiGmapGoogleMapApiProvider) {
      uiGmapGoogleMapApiProvider.configure({
        //key: '', TODO: Add key to track usage
        v: '3.20' //defaults to latest 3.X anyhow});
      });
    }]);
})();
