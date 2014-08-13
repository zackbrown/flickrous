'use strict';

angular.module('flickr-client')
  .controller('MainCtrl', function ($scope, $famous, flickr) {
    var Transitionable = $famous['famous/transitions/Transitionable'];
    var Timer = $famous['famous/utilities/Timer'];
    var EventHandler = $famous['famous/core/EventHandler'];



    var Timer = $famous['famous/utilities/Timer'];


    $scope.scrollHandler = new EventHandler();

    $scope.loading = false;
    $scope.loadPhotos = function(searchTerm){
      $scope.loading = true;
      var promise = flickr.getPhotoSearchList(searchTerm);
      promise.success(function(data){
        $scope.photos = _.map(data.photos.photo, flickr.getPhotoUrl);
      });
    };

    $scope.loadPhotos('macro');

    $scope.photos = [];
  });
