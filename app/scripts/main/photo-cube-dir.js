/**
 * @ngdoc directive
 * @name faCuboid
 * @module famous.angular
 * @restrict EA
 * @description
 * This directive is used to create reusable cuboid (rectangular prism) shapes
 * with arbitrary content
 * The order of the faces is [Front, Top, Right, Bottom, Left, Back]
 * Order can be managed/enforced with `fa-index`
 */

angular.module('flickr-client')
  .directive('photoCube', ["$famous", "$famousDecorator", function ($famous, $famousDecorator) {
    return {
      templateUrl: 'partials/photo-cube.html',
      scope: true,
      restrict: 'EA',
      compile: function(tElement, tAttrs, transclude){
        var Modifier = $famous['famous/core/Modifier'];
        var Surface = $famous['famous/core/Surface'];
        var RenderNode = $famous['famous/core/RenderNode'];
        var Transform = $famous['famous/core/Transform'];

        return {
          pre: function(scope, element, attrs){
            $famousDecorator.ensureIsolate(scope);

          },
          post: function(scope, element, attrs){

            console.log('compiling')
            scope.photo = scope.$eval(attrs.photo);
            var _img = new Image();
            _img.src = scope.photo;
            scope.loading = true;

            _img.onload = function(){
              scope.loading = false;
              if(!scope.$$phase) scope.$apply()
            }
          }
        };
      }
    };
  }]);
