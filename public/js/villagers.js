// Make sure we wait to attach our handlers until the DOM is fully loaded.

//click event outline for search field
$(function() {
    $(".search-form").on("submit", function(event) {
        event.preventDefault();
        
    })


$(function() {
    $(".change-dreamy").on("click", function(event) {
      let id = $(this).data("id");
      let newDreamy = $(this).data("newdreamy");
  
      var newDreamyState = {
        dreamy: newDreamy
      };
  
      // Send the PUT request.
      $.ajax("/api/villagers/" + id, {
        type: "PUT",
        data: newDreamyState
      }).then(
        function() {
          console.log("changed dreamy to", newDreamy);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
    $(".create-form").on("submit", function(event) {
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
        function() {
          console.log("created new villager");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
 

    $(".delete-villager").on("click", function(event) {
    let id = $(this).data("id");
    
      // Send the DELETE request.
      $.ajax("/api/villagers/" + id, {
      type: "DELETE"
      }).then(
      function() {
      console.log("deleted villager", id);
      // Reload the page to get the updated list
      location.reload();
                }
      );
    });
});
  