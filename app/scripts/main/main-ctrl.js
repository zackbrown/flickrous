'use strict';

angular.module('flickr-client')
  .controller('MainCtrl', function ($scope, $famous, flickr) {
    var Transitionable = $famous['famous/transitions/Transitionable'];
    var Timer = $famous['famous/utilities/Timer'];
    var EventHandler = $famous['famous/core/EventHandler'];



    var Timer = $famous['famous/utilities/Timer'];

    $scope.colors = ["#b58900","#cb4b16","#dc322f","#6c71c4","#268bd2"];


    var SPEED = [.03, -.03, .01];
    //var _rotate = [Math.PI / 4,0,0];
    var _rotate = [0,0,0];
    Timer.every(function(){
      _rotate[0] += SPEED[0];
      _rotate[1] += SPEED[1];
      _rotate[2] += SPEED[2];
    });

    $scope.getRotate = function(){
      return _rotate;
    }


    $scope.scrollHandler = new EventHandler();

    $scope.loading = false;
    $scope.loadPhotos = function(searchTerm){
      $scope.loading = true;
      var promise = flickr.getPhotoList(searchTerm);
      promise.success(function(data){
        console.log('data', data)
        $scope.photos = _.map(data.photos.photo, flickr.getPhotoUrl);
      });
    };

    $scope.loadPhotos('cute kitten');

    $scope.photos = [{promise: {success: angular.noop, error: angular.noop}}];
  });
