define(function(require) {
  var _$_ = require("dependencies");
  var Q = require("q");

  // This function should return a promise
  var deferred = Q.defer();

  function popLike() {

  $.ajax({
        url: "https://carousel-of-love.firebaseio.com/Favorites.json",
      }).done(function(data) {
        console.log("Your added like is:", data);

        likeList = Object.keys(data).map( function( key ){
            var y = data[ key ];
            y.key = key;
            return y;
            });
        console.log("data length", likeList);
        for (var i = 0 ; i < likeList.length; i++) {
          var display = likeList[i];
          console.log("DISPLAY", display);
          $("#likes").append("<p>"+display+"</p>");
        };
        deferred.resolve(data); //If call successful resolve promise with the data
      })
      .fail(function(xhr, status, error) {
        deferred.reject(error); //Promise Rejection if call failed
      });

      return deferred.promise;
  };

  return popLike; //return statement for the file
});