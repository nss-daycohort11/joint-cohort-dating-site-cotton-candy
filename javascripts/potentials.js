define(function(require) {
  var q = require("q");
  var _$_ = require("dependencies");
  var allProfile = require("hbs!../templates/profileAll")

  //This should iterate over all the users...
  function populateDom(all, you) {
    console.log("BRACE YOURSELF, CARNIES ARE COMING!");

    for (var i =0; i < all.length; i++){
              if (you === all[i].key) {
              	var index = i;
              }
          }

    // ...and display everyone except for the logged in user.
    var minusMe = all.splice(index, 1);
    console.log("This is the list of all users:", minusMe);
    $("#carousel").html(allProfile(all));
  }
 
return populateDom;

});