'use strict';

angular.module('flickr-client')
  .factory('flickr', function (config, $http) {
    var _getBaseUrl = function(){
      return "https://api.flickr.com/services/rest/?format=json&jsoncallback=JSON_CALLBACK&api_key="+config.getAPIKey()+"&method=";
    }

    var PER_PAGE = 50;

    return {
      //gets a list of photos, returns an object containing the string and a promise
      getPhotoSearchList: function(searchTerm){
        var url = _getBaseUrl() + "flickr.photos.search&in_gallery=true&per_page="+PER_PAGE+"&text=" + searchTerm;
        return $http.jsonp(url);
      },
      getPhotosByGalleryId: function(galleryId){
        var url = _getBaseUrl() + "flickr.galleries.getPhotos&per_page="+PER_PAGE+"&gallery_id=" + galleryId;
        return $http.jsonp(url);
      },
      //expects photo info in the API format, returns a url string and a promise loading that string (for a loading indicator)
      getPhotoUrl: function(photoInfo){
        var size = "c"; //800x800, https://www.flickr.com/services/api/misc.urls.html
        var url = "https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}_{size}.jpg"
        url = url.replace('{farm-id}', photoInfo.farm);
        url = url.replace('{server-id}', photoInfo.server);
        url = url.replace('{id}', photoInfo.id);
        url = url.replace('{secret}', photoInfo.secret);
        url = url.replace('{size}', size);
        return url;
      },
      GALLERIES: {
        ORIGAMI: "66911286-72157645827212930",
        CLOUDS: "66911286-72157645820044028",
        COWS: "66911286-72157645071513729",
        OCEAN: "66911286-72157644620926147"
      }
    };
  });
