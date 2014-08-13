'use strict';

angular.module('flickr-client')
  .controller('MainCtrl', function ($scope, $famous, flickr) {
    var Transitionable = $famous['famous/transitions/Transitionable'];
    var Timer = $famous['famous/utilities/Timer'];
    var EventHandler = $famous['famous/core/EventHandler'];

    $scope.scrollHandler = new EventHandler();

    $scope.cubeEnter = function(photo, $done){
      console.log('enter!');
      $done();
    };

    $scope.cubeLeave = function(photo, $done){
      console.log('leave!');
      $done();
    };

    $scope.loading = false;
    $scope.loadPhotos = function(searchTerm){
      $scope.loading = true;
      var promise = flickr.getPhotoSearchList(searchTerm);
      promise.success(function(data){
        $scope.loading = false;
        $scope.photos = _.map(data.photos.photo, function(photo){
          return _.extend(photo, {url: flickr.getPhotoUrl(photo)});
        });
      });
      promise.error(function(){
        console.log("API ERROR!", arguments);
      })
    };

    $scope.loadPhotos('french bulldog');

    $scope.photos = [];
  });
