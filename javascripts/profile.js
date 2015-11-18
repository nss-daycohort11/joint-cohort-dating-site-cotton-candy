define(function(require) {
  var q = require("q");
  var _$_ = require("dependencies");
  var newProfile = require("hbs!../templates/signUpProfile")

  function createNewProfile(newUser, oldUsers) {
    $('.modal-title').html("<h2>Fill Out Your Profile</h2>");
    $("#modal-login-btn").hide();
    $('.modal-body').html(newProfile());
    $('#myModal').modal('show');

  }
return createNewProfile;

});