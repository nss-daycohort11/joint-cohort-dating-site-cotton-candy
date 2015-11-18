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
        $("#likes").html("<p>"+data+"</p>");
        deferred.resolve(data); //If call successful resolve promise with the data
      })
      .fail(function(xhr, status, error) {
        deferred.reject(error); //Promise Rejection if call failed
      });

      return deferred.promise;
  };

  return popLike; //return statement for the file
});