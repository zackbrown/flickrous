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

    console.log('easing', Easing)

    var CUBE_SCROLL_SPEED = .005;


    GenericSync.register({
      "mouse" : MouseSync,
      "touch" : TouchSync,
      "scroll": ScrollSync
    });

    $scope.colors = ["#b58900","#cb4b16","#dc322f","#6c71c4","#268bd2"];


    var cubeSync = new GenericSync(["mouse", "touch"], {direction: [GenericSync.DIRECTION_X, GenericSync.DIRECTION_Y]});

    cubeSync.on('update', function(data){
      console.log('update', data)
      var newRotate = _rotate.get();
      newRotate[0] += data.delta[1] * CUBE_SCROLL_SPEED;
      newRotate[1] += data.delta[0] * CUBE_SCROLL_SPEED;
      _rotate.set.call(_rotate, newRotate);
    });

    cubeSync.on('end', function(data){
      //handle snapping to nearest facet
      //since there are 4 faces, we want to snap to y-rotations of 0, π/2, π, 3π/2
      var rotate = _rotate.get().slice(0);

      //ideal rotate values
      var idealX = 0;
      //snap to four faces
      var idealY = Math.PI * Math.round(2 * rotate[1] / Math.PI) / 2;

      rotate[0] = idealX;
      rotate[1] = idealY;

      _rotate.set(rotate, {duration: 500, curve: Easing.outBounce});
    })


    $scope.cubeHandler = new EventHandler();
    $scope.cubeHandler.pipe(cubeSync);


    $scope.handlers = [$scope.cubeHandler, $scope.scrollHandler];

    var _rotate = new Transitionable([0,0,0]);
    $scope.getRotate = function(){
      if(_rotate.get()[1] != 0) console.log(_rotate.get())
      return _rotate.get();
    }


  });
