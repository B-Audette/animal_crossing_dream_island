$(document).ready(function() {
    // Getting references to our form and inputs
    var loginForm = $("form.login");
    var islandNameInput = $("input#islandName-input");
    var dodoInput = $("input#dodo-input");
  
    // When the form is submitted, we validate there's an island name and dodo code entered
    loginForm.on("submit", function(event) {
      event.preventDefault();
      var userData = {
        islandName: islandNameInput.val().trim(),
        dodo: dodoInput.val().trim()
      };
  
      if (!userData.islandName || !userData.dodo) {
        return;
      }
  
      // If we have an island name and dodo code we run the loginUser function and clear the form
      loginUser(userData.islandName, userData.dodo);
      islandNameInput.val("");
      dodoInput.val("");
    });
  
    // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
    function loginUser(islandName, dodo) {
      $.post("/api/login", {
        islandName: islandName,
        dodo: dodo
      })
        .then(function() {
          window.location.replace("/members");
          // If there's an error, log the error
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  });
  