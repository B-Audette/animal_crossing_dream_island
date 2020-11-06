// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
  $("#searchbtn").click((function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    let searchedVillager = {
      name: $("#vi").val().trim()
    }

    $.ajax("/api/villagers", {
      type: "GET",
      data: searchedVillager
    }).then(
      function (err, res) {
        if (err) {
          console.log(err);
        }
        // Reload the page to get the updated list
        console.log(res);
        // location.reload();
      });
  }))
})

$(function () {
  $(".change-dreamy").on("click", function (event) {
    let id = $(this).data("id");
    let newDreamy = $(this).data("newdreamy");

    let newDreamyState = {
      dreamy: newDreamy
    };

    // Send the PUT request.
    $.ajax("/api/villagers/" + id, {
      type: "PUT",
      data: newDreamyState
    }).then(
      function () {
        console.log("changed dreamy to", newDreamy);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".create-form").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    let newVillager = {
      villager_name: $("#vi").val().trim(),
      dreamy: 0
    };

    // Send the POST request.
    $.ajax("/api/villagers", {
      type: "POST",
      data: newVillager
    }).then(
      function () {
        console.log("created new villager");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });


  $(".delete-villager").on("click", function (event) {
    let id = $(this).data("id");

    // Send the DELETE request.
    $.ajax("/api/villagers/" + id, {
      type: "DELETE"
    }).then(
      function () {
        console.log("deleted villager", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
});
