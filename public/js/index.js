     // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/user_data").then(function(data) {
        $(".islandName").text(data.islandName);
        console.log(data.islandName)
      });

    // pulls villagers to dropdown search
    $.get("/api/all_villagers").then(function (data) {
        for (let i = 0; i < data.length; i++) {
            $("#allVillagers").append("<option value='" +
                data[i].name + "'></option>");
        }
    })
    //========pulls villlager data from submit button & writes to page elements #stats/#poster/#house
    $("#searchbtn").click((function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        $("#stats").empty();
        $("#poster").empty();
        $("#house").empty();
        let searchedVillager = $("#vi").val().trim()
        console.log(searchedVillager)
        $.get("/api/oneVillager/" + searchedVillager
        ).then(function (response) {
            console.log(response);
            $("#stats").append(`<li id="currentName">Name: ${response.name}</li>
                <br>
                <li>Species: ${response.species}</li>
                <br>
                <li>Personality: ${response.personality}</li>
                <br>
                <li>Hobby: ${response.hobby}</li>
                <br>
                <li>Colors: ${response.colors}</li>
                <br>
                <li>Catchphrase: ${response.catchphrase}</li>
                <br>
                <li>Birthday: ${response.birthday}</li>
                <br>
                <li>Favorite Song: ${response.favoriteSong}</li>`);
            $("#poster").append(`<img src="${response.photoImage}"/>`)
            $("#house").append(`<img src="${response.houseImage}"/>`)
        })
    })
    )


    // addIsland and addDreamy adds villager to our database -
    $("#addIsland").click((function (event) {
        event.preventDefault();
        let currentNameIsland = $("#currentName").text().slice(6)
        console.log(currentNameIsland)
        $.post("/api/villagers", { "name": currentNameIsland, "dreamy": false})
            .then(function (response) {
                console.log(response);
                let item = (`<li id="island-${response.id}" class="island"name="${response.name}">${response.name}<button id="${response.id}"  class="deletebtn">Delete <img class="removeIcon" src="./images/deleteIcon.png"></button></li>`)
                $("#onIsland").append(item)
            })
    })
    )
    $("#addDreamy").click((function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        let currentNameIsland = $("#currentName").text().slice(6)
        console.log(currentNameIsland)
       
        $.post("/api/villagers", { "name": currentNameIsland, "dreamy": true })
            .then(function (response) {
                console.log(response);
                console.log(response.id)
                let item = (`<li id="dreamy-${response.id}" class="dreamy"name="${response.name}">${response.name}<button id="${response.id}"  class="deletebtn">Delete <img class="removeIcon" src="./images/deleteIcon.png"></button><button id="${response.id}" name="${response.name}" class="dreamybtn">Move<img class="islandIcon" src="./images/islandIcon.png"></button></li>`)
                $("#isDreamy").append(item)
            })
    })
    )
    // set up the delete button click event
    $(document).on('click', ".deletebtn", function(event){
        event.preventDefault();
        console.log("button was clicked");
        let id = $(this).attr("id");
        console.log(id);
        $.ajax({
            method: "DELETE",
            url: "/api/villagers/" + id
          })
            .then(function() {
              console.log("deleted villager")
              $("#dreamy-"+ id).empty().remove();
              $("#island-"+ id).empty().remove();
            });
    });
    // set up the dreamy button click event to move to island
    $(document).on('click', ".dreamybtn", function(event){
        event.preventDefault();
        console.log("button was clicked to move villager to island")
        let id = $(this).attr("id");
        console.log(id);
        let name = $(this).attr("name")
        console.log(name)
        $.ajax({
            method: "PUT",
            url: "/api/villagers/" + id
          })
            .then(function(response) {
              console.log("changed dreamy villager")
              console.log(response)
            let item = (`<li id="island-${response.id}" class="island" name="${response.name}">${response.name}<button id="${response.id}"  class="deletebtn">Delete <img class="removeIcon" src="./images/deleteIcon.png"></button></li>`)
            $("#onIsland").append(item)
            $("#dreamy-"+ id).empty().remove();
            });
    });

       //pulls in villagers in our database - add once passport is set up 
       //to pull in where user matches user on page load
       $(document).ready(function() {
        $.get("/api/villagers", function (response) {
            console.log(response);
            for (let i = 0; i < response.length; i++) {
                if (response[i].dreamy === false)
                {let item = (`<li id="island-${response[i].id}" class="island"name="${response[i].name}">${response[i].name}<button id="${response[i].id}"  class="deletebtn">Delete <img class="removeIcon" src="./images/deleteIcon.png"></button></li>`)
                $("#onIsland").append(item)}
                
                if (response[i].dreamy === true)
                {let item = (`<li id="dreamy-${response[i].id}" class="dreamy"name="${response[i].name}">${response[i].name}<button id="${response[i].id}"  class="deletebtn">Delete <img class="removeIcon" src="./images/deleteIcon.png"></button><button id="${response.id}" name="${response[i].name}" class="dreamybtn">Move<img class="islandIcon" src="./images/islandIcon.png"></button></li>`)
                $("#isDreamy").append(item)}
            }
        })
    })
    //================================================================
    //pulls in villagers in our database
    $("#view").on("click", function () {
        $.get("api/villagers", function (data) {
            console.log(data);
        })
    })