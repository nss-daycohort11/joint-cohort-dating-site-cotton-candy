define(function(require) {
  var q = require("q");
  var _$_ = require("dependencies");
  var newProfile = require("hbs!../templates/signUpProfile")

  function createNewProfile(newUser, oldUsers) {
    $('.modal-title').html("<h2>Fill Out Your Profile</h2>");
    $('.modal-body').html(newProfile());
    $("#modal-login-btn").hide();
    $('#myModal').modal('show');

  }
  // This function should return a promise
  // function() {
  //   $.ajax({
  //     url: "https://carousel-of-love.firebaseio.com/Matches",
  //     method: "POST"
  //   })
  //   .done(function(response) {
  //     // Resolve the promise
  //   }
  //   .fail(function(xhr, status, error) {
  //     // Reject the promise
  //   });
  // };
return createNewProfile;

});