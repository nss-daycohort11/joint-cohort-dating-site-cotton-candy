define(function(require) {
  var q = require("q");
  var _$_ = require("dependencies");

  // This function should return a promise
  function updateDatProfile(you, them) {

    var newYou = {
      "About" : $("textarea[name='profile']").val(),
      "Age" : $("input[name='age']").val(),
      "Animals" : $("input[name='animals']").val(),
      "FName" : $("input[name='fname']").val(),
      "Job" : $("input[name='job']").val(),
      "Juggle" : $("input[name='juggle']").val(),
      "LName" : $("input[name='lname']").val(),
      "Likes" : "",
      "Matches" : "",
      "Photo" : "",
      "Spaces" : $("input[name='small-space']").val(),
      "uid": you.uid
    }

    $.ajax({
        url: "https://carousel-of-love.firebaseio.com/Users.json",
        method: "POST",
        data: JSON.stringify(newYou)
      })
    .done(function(response) {
        // Resolve the promise
        console.log("user profile posted");
      })
    .fail(function(xhr, status, error) {
        // Reject the promise
    });
  }
  return updateDatProfile
});