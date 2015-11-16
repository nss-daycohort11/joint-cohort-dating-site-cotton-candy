define(function(require) {
  var q = require("q");

  // This function should return a promise
  function() {
    $.ajax({
      url: "https://carousel-of-love.firebaseio.com/Users"
    })
    .done(function(response) {
      // Resolve the promise
    }.
    fail(function(xhr, status, error) {
      // Reject the promise
    });
    }
  };
});