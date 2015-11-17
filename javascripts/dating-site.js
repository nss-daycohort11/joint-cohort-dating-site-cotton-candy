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
  ["dependencies", "firebase", "auth", "profile", "hbs!../templates/login", "updateProfile", "potentials"], 
  function(_$_, firebase, auth, profile, login, updateProfile, potentials) {
      var ref = new Firebase("https://carousel-of-love.firebaseio.com/");
      var authData = ref.getAuth();
      var profileExists = false;
      ref.onAuth(function(authThing){
        if (authThing) {
          console.log('authThing', authThing)
          console.log("You are Authenticated", authThing);
          ref.once("value", function(snapshot) {
            var song = snapshot.child("Users").val();

            userlist = Object.keys(song).map( function( key ){
            var y = song[ key ];
            y.key = key;
            return y;
            });
            
            for (var i =0; i < userlist.length; i++){
              if (authThing.uid === userlist[i].key) {
                console.log("Yay!");
                profileExists = true;
                // Populate their profile from the data found
              }

              console.log("song", userlist[i].key);
            }
              if (profileExists !== true) {
                profile(authThing, userlist);
                // if nothing found load create profile page and create a user with that uid
              } else {
                potentials(userlist);
              }
          });

        }

      });

      $("#signout").click(function(){
        ref.unauth();
        console.log("You logged out!");
      });

      $(document).on("click", "#submit-profile", function(){
        console.log("Almsot ready to submit");
        updateProfile(authData, userlist);
      });

      $(document).on("click", "#facebookButton", function(){
        
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

      $(document).on("click", "#twitterButton", function(){

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
          $('.modal-title').html("<h2>Why Don't You Log In?</h2>");
          $("#modal-profile-btn").hide();
          $('.modal-body').html(login());
          $('#myModal').modal('show');
          console.log("hello? is it modal you're looking for?");
        });
      } else {
        console.log("You're already logged in", authData.facebook.displayName);
        console.log("Your UID is:", authData.uid);

      }
    });



