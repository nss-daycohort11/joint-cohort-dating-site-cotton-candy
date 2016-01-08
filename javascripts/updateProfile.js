define(function(require) {
  var q = require("q");
  var _$_ = require("dependencies");

  // This function should return a promise
  function updateDatProfile(you, them) {
    var uidURL = you.uid;
    var updateProfileRef = new Firebase('https://carousel-of-love.firebaseio.com/Users/'+uidURL+'/');

    // Update the profile with all the values from the input fields
    updateProfileRef.set({
      "About" : $("textarea[name='profile']").val(),
      "Age" : $("input[name='age']").val(),
      "Animals" : $("input[name='animals']").val(),
      "FName" : $("input[name='fname']").val(),
      "Job" : $("input[name='job']").val(),
      "Juggle" : $("input[name='juggle']").val(),
      "LName" : $("input[name='lname']").val(),
      "Likes" : "",
      "Matches" : "",
      "Photo" : $("input[name='Photo']").val(),
      "Spaces" : $("input[name='small-space']").val(),
      "uid": uidURL
    });
    
  }
  return updateDatProfile
});