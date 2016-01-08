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
  ["dependencies", "firebase", "auth", "profile", "hbs!../templates/login", "updateProfile", "potentials", "favorites"], 
  function(_$_, firebase, auth, profile, login, updateProfile, potentials, favorites) {
      var ref = new Firebase("https://carousel-of-love.firebaseio.com/");
      var authData = ref.getAuth();
      var profileExists = false;

      //Once the auth changes attempt to gather data based on who is logged in
      ref.onAuth(function(authThing){
        if (authThing) {
          console.log('authThing', authThing)
          console.log("You are Authenticated", authThing);
          ref.once("value", function(snapshot) {
            var song = snapshot.child("Users").val();

            //Create an array (userlist) out of the object (song)
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
                potentials(userlist, authThing.uid);
              }
          });

        }

      });

      //This logs out the user when the signout button is clicked
      $("#signout").click(function(){
        ref.unauth();
        console.log("You logged out!");
      });

      //This sends the user data to be submitted when the submit-profile button is clicked
      $(document).on("click", "#submit-profile", function(){
        console.log("Almost ready to submit");
        console.log(authData);
        updateProfile(authData, userlist);
      });

      //This sends the user data to be submitted when the like-profile button is clicked
      $(document).on("click", ".like-profile", function(){
        var faveKey = $(this).attr('uid');
        console.log("faveKey", faveKey);
        favorites(faveKey, authData);
      });

      //This will log in with Facebook on click!
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

      //This will log in with Twitter on click!
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
        console.log("Your UID is:", authData.uid);

      }
    });



