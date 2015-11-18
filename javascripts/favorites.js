define(function(require) {
  var _$_ = require("dependencies");
  var Q = require("q");

  // This function should return a promise
  var deferLike = Q.defer();

  function addLikes(likeThis, me) {
    var thisUID = me.uid;
    var faves = {};
    faves[thisUID] = likeThis;

    console.log("faves", faves);

  $.ajax({
        url: "https://carousel-of-love.firebaseio.com/Favorites.json",
        method: "POST",
        data: JSON.stringify(faves)
      }).done(function(addedLike) {
        console.log("Your added like is:", addedLike);
        deferLike.resolve(addedLike); //If call successful resolve promise with the data
      })
      .fail(function(xhr, status, error) {
        deferLike.reject(error); //Promise Rejection if call failed
      });

      return deferLike.promise;
  };

  return addLikes; //return statement for the file
});