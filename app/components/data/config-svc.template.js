'use strict';

angular.module('flickr-client')
  .factory('config', function () {
    
    //TODO:  add your API key and rename this file
    //       to config-svc.js
    var API_KEY = "YOUR_API_KEY_HERE"

    return {
      getAPIKey: function(){
        return API_KEY;
      }
    };
  });
