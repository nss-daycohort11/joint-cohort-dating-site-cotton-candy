define(function(require) {
  var q = require("q");
  var _$_ = require("dependencies");
  var allProfile = require("hbs!../templates/profileAll")

  function populateDom(all) {
    console.log("BRACE YOURSELF, CARNIES ARE COMING!");
    $("#carousel").html(allProfile(all));
  }
 
return populateDom;

});