$(document).ready(function () {
  // Getting references to our form and input
  var signUpBtn = $("#signupBtn");
  var islandNameInput = $("input#islandName-input");
  var dodoInput = $("input#dodo-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpBtn.on("click", function (event) {
    event.preventDefault();
    var userData = {
      islandName: islandNameInput.val().trim(),
      dodo: dodoInput.val().trim()
    };

    if (!userData.islandName || !userData.dodo) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.islandName, userData.dodo);
    islandNameInput.val("");
    dodoInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(islandName, dodo) {
    $.post("/api/signup", {
      islandName: islandName,
      dodo: dodo
    })
      .then(function (data) {
        window.location.replace("/home");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
