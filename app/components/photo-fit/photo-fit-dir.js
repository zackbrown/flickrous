/**
 * @ngdoc directive
 * @name photo-fit
 * @module flickr-client
 * @restrict EA
 * @description
 * This directive is used to place an image in a div of specified size,
 * setting overflow hidden and centering the image in the div, accounting
 * for landscape/portrait orientation
 */

angular.module('flickr-client')
  .directive('photoFit', function () {
    return {
      templateUrl: 'components/photo-fit/photo-fit.html',
      scope: true,
      controller: function($scope){
        $scope.dimensions = [0,0]
      },
      restrict: 'EA',
      compile: function(tElement, tAttrs, transclude){
        return {
          pre: function(scope, element, attrs){

          },
          post: function(scope, element, attrs){

            scope.url = scope.$eval(attrs.url);
            scope.dimensions = scope.$eval(attrs.dimensions);

            var _img = new Image();
            _img.src = scope.photo;
            scope.loading = true;

            var imgElem = element[0].querySelector('img');

            _img.onload = function(){
              scope.loading = false;

              var width = imgElem.width;
              var height = imgElem.height;

              var outputWidth,
                  outputHeight,
                  xOffset,
                  yOffset;

              if(width > height){
                //landscape
                outputHeight = scope.dimensions[1];
                var ratio = outputHeight / height;
                outputWidth = width * ratio;
                xOffset = -(outputWidth - scope.dimensions[0]) / 2;
              }else{
                //portrait or square
                outputWidth = scope.dimensions[0];
                xOffset = 0;
                var ratio =  outputWidth / width;
                outputHeight = height * ratio;
                yOffset = -(outputHeight - scope.dimensions[1]) / 2;
              }

              scope.xOffset = xOffset;
              scope.yOffset = yOffset;
              scope.outputHeight = outputHeight;
              scope.outputWidth = outputWidth;

              if(!scope.$$phase) scope.$apply()
            }

          }
        };
      }
    };
  });
