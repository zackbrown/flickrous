'use strict';

angular.module('flickr-client')
  .controller('MainCtrl', function ($scope, $famous, flickr) {
    var Transitionable = $famous['famous/transitions/Transitionable'];
    var Timer = $famous['famous/utilities/Timer'];
    var EventHandler = $famous['famous/core/EventHandler'];

    $scope.scrollHandler = new EventHandler();



    

    $scope.loading = false;
    $scope.loadPhotos = function(searchTerm){
      $scope.loading = true;
      var promise = flickr.getPhotoSearchList(searchTerm);
      promise.success(function(data){
        $scope.loading = false;
        $scope.photos = _.map(data.photos.photo, function(photo){
          var scale = new Transitionable([1, 1, 1]);
          var rotate = new Transitionable([0, 0, 0]);
          return _.extend(photo, {
            url: flickr.getPhotoUrl(photo),
            scale: scale,
            rotate: rotate
          });
        });
      });
      promise.error(function(){
        console.log("API ERROR!", arguments);
      })
    };

    window.s = $scope;

    $scope.search = {
      term: "yo"
    }

    var _scales = {}
    $scope.cubeEnter = function(photo, $done){
      photo.rotate.set([2 * Math.PI, 2 * Math.PI, 2 * Math.PI]);
      photo.scale.set([.001, .001, .001]);
      photo.rotate.set([0, 0, 0], {duration: 1000, curve: "easeOut"});
      photo.scale.set([1, 1, 1], {duration: 1000, curve: "easeOut"}, $done);
    };

    $scope.getScale = function(i){
      if(!_scales[i]) return [1, 1, 1];
    }


    $scope.updateSearch = function(){
      $scope.loadPhotos($scope.search.term)
    }

    $scope.updateSearch();

    $scope.photos = [];
  });
