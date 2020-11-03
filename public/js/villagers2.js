$(function() {
    $("#searchbtn").click((function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    let searchedVillager = {
      name: $("#vi").val().trim()
    }
  
    $.ajax("/api/villagers", {
      type: "GET",
      data: searchedVillager
    }).then(
      function(err, res) {
        if (err) {
          console.log(err);
        }
        // Reload the page to get the updated list
        console.log(res);
        // location.reload();
      });
  }))
})