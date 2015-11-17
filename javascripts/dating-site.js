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
  ["dependencies", "firebase", "auth"], 
  function(_$_, firebase, auth) {
      
      $("#facebookButton").on("click", function() {
        var ref = new Firebase("https://carousel-of-love.firebaseio.com/");
        var authData = ref.getAuth();

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
        var ref = new Firebase("https://carousel-of-love.firebaseio.com/");
        var authData = ref.getAuth();

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
      $(document).ready(function(){
          $('#myModal').modal('show');
          console.log("hello? is it modal you're looking for?");
        });
    
  // END OF REQUIRE
  });



