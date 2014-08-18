'use strict';

angular.module('flickr-client')
  .controller('PhotoCubeCtrl', function ($scope, $famous, flickr) {
    var Transitionable = $famous['famous/transitions/Transitionable'];
    var Easing = $famous['famous/transitions/Easing'];
    var Timer = $famous['famous/utilities/Timer'];
    var EventHandler = $famous['famous/core/EventHandler'];
    var GenericSync = $famous['famous/inputs/GenericSync'];
    var MouseSync   = $famous["famous/inputs/MouseSync"];
    var TouchSync   = $famous["famous/inputs/TouchSync"];
    var ScrollSync   = $famous["famous/inputs/ScrollSync"];


    var CUBE_SCROLL_SPEED = .005;
    var DOUBLE_TAP_THRESHOLD = 300;


    GenericSync.register({
      "mouse" : MouseSync,
      "touch" : TouchSync,
      "scroll": ScrollSync
    });

    var TRANSITIONS = {
      SCALE: {
        duration: 333,
        curve: Easing.outQuint
      },
      ROTATE: {
        duration: 500,
        curve: Easing.outBounce
      }
    }

    $scope.faces = [
      {type: "photo"},
      {type: "photo"},
      {type: "title"},
      {type: "photo"},
      {type: "title"},
      {type: "photo"},
    ];

    $scope.handleDoubleTap = function(){

    };


    var cubeSync = new GenericSync(["mouse", "touch", "scroll"], {direction: [GenericSync.DIRECTION_X, GenericSync.DIRECTION_Y]});


    var _lastSyncStartTime = new Date();
    cubeSync.on('start', function(){
      var currentTime = new Date();

      if(currentTime - _lastSyncStartTime < DOUBLE_TAP_THRESHOLD){ $scope.handleDoubleTap(); }
      _lastSyncStartTime = currentTime;

      //shrink cube
      _scale.halt();
      _scale.set([.8, .8, .8], TRANSITIONS.SCALE)
    });

    cubeSync.on('update', function(data){
      var newRotate = _rotate.get();
      newRotate[0] -= data.delta[1] * CUBE_SCROLL_SPEED;
      newRotate[1] += data.delta[0] * CUBE_SCROLL_SPEED;

      _rotate.set.call(_rotate, newRotate);
    });

    cubeSync.on('end', function(data){
      //handle snapping to nearest facet
      var rotate = _rotate.get().slice(0);

      //ideal rotate values
      var idealX = 0;
      //since there are 4 faces, we want to snap to y-rotations of 0, π/2, π, 3π/2
      var idealY = Math.PI * Math.round(2 * rotate[1] / Math.PI) / 2;

      rotate[0] = idealX;
      rotate[1] = idealY;


      _rotate.set(rotate, TRANSITIONS.ROTATE);
      _scale.halt();
      //grow cube back
      _scale.set([1, 1, 1], TRANSITIONS.SCALE)
    })


    $scope.cubeHandler = new EventHandler();
    $scope.cubeHandler.pipe(cubeSync);


    $scope.handlers = [$scope.cubeHandler, $scope.scrollHandler];

    var _rotate = new Transitionable([0,0,0]);
    $scope.getRotate = function(){
      return _rotate.get();
    };

    var _scale = new Transitionable([1,1,1]);
    $scope.getScale = function(){
      return _scale.get();
    }


  });
