    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    // $.get("/api/user_data").then(function(data) {
    //   $(".member-name").text(data.islandName);
    // });

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
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        let currentNameIsland = $("#currentName").text().slice(6)

        console.log(currentNameIsland)

        $.post("/api/villagers", { "name": currentNameIsland, "dreamy": false })
            .then(function (response) {
                console.log(response);
                $("#onIsland").append(`<li class="island">${response.name}<button class="deletebtn"><i class="fa fa-times"></i></button><button class="islandbtn"><img class="moveDreamy" src="./images/dreamyIcon.png"></button></li>`)

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
                $("#isDreamy").append(`<li class="dreamy">${response.name}<button class="deletebtn"><i class="fa fa-times"></i></button><button class="dreamybtn"><img class="islandIcon" src="./images/islandIcon.png"></button></li>`)


            })
    })
    )

    //================================================================




    // ===== Demo Post Basic Functions ======
    // $("#addIsland").on("click", function () {
    //     $.post("/api/villagers", { "name": "Kevin", "dreamy": false })

    // })

    // ===== Demo Post Basic Functions ======
    // $("#addDreamy").on("click", function () {
    //     $.post("/api/villagers", { "name": "Kevin", "dreamy": true })

    // })

    //pulls in villagers in our database
    $("#view").on("click", function () {
        $.get("api/villagers", function (data) {
            console.log(data);
        })
    })
