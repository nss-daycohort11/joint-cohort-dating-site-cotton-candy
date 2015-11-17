require.config({
  baseUrl: "./javascripts",
  paths: {
    "jquery": "../lib/bower_components/jquery/dist/jquery.min",
    "firebase": "../lib/bower_components/firebase/firebase",
    "lodash": "../lib/bower_components/lodash/lodash.min",
    "hbs": "../lib/bower_components/require-handlebars-plugin/hbs",
    "bootstrap": "../lib/bower_components/bootstrap/dist/js/bootstrap.min",
    "q": "../lib/bower_components/q/q"
  },
  shim: {
    "bootstrap": ["jquery"],
    "firebase": {
      exports: "Firebase"
    }
  }
});

require(
  ["dependencies", "firebase", "auth", "profile"], 
  function(_$_, firebase, auth, profile) {
      var ref = new Firebase("https://carousel-of-love.firebaseio.com/");
      var authData = ref.getAuth();
      ref.onAuth(function(authThing){
        console.log("You are Authenticated", authThing);
        ref.once("value", function(snapshot) {
          var song = snapshot.child("Users").val();

          userlist = Object.keys(song).map( function( key ){
          var y = song[ key ];
          y.key = key;
          return y;
          });
          for (var i =0; i < userlist.length; i++){
            if (authData.uid === userlist[i].key) {
              console.log("Yay!");
              // Populate their profile from the data found
            } else {
              console.log("You don't exist!");
              profile();
              // if nothing found load create profile page and create a user with that uid
            }
            console.log("song", userlist[i].key);
          }
        });

      });

      $("#facebookButton").on("click", function() {

        if (authData === null) {
          ref.authWithOAuthPopup("facebook", function(error, authData) {
            if (error) {
              console.log("Login Failed!", error);
            } else {
              console.log("Authenticated successfully with payload:", authData);
              auth.setUid(authData.uid);
            }
          });
        } else {
          auth.setUid(authData.uid);
        }
        console.log("authData", authData);
      });

      $("#twitterButton").on("click", function() {

        if (authData === null) {
          ref.authWithOAuthPopup("twitter", function(error, authData) {
            if (error) {
              console.log("Login Failed!", error);
            } else {
              console.log("Authenticated successfully with payload:", authData);
              auth.setUid(authData.uid);
            }
          });
        } else {
          auth.setUid(authData.uid);
        }
        console.log("authData", authData);
      });
    
      // Loads modal on page load
      if (authData === null) {
      $(document).ready(function(){
          $('#myModal').modal('show');
          console.log("hello? is it modal you're looking for?");
        });
      } else {
        console.log("You're already logged in", authData.facebook.displayName);
        console.log("Your UID is:", authData.uid);

      }
    });



