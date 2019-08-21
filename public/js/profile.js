$(document).ready(function() {
    var itemName = $("#itemName");
    var itemPrice =$("#itemPrice");

    var currentUser = JSON.parse(sessionStorage.getItem("user"));
    console.log(currentUser);
    if(currentUser) {
        $("#greeting").text(`Hello ${currentUser.owner_name}`);
        $("#business").text(`Business Name: ${currentUser.business_name}`);
        displayItem();
    }

    $("#save").on("click", function() {

        var newItem = {
            name: itemName.val().trim(),
            price: itemPrice.val(),
            VendorId: currentUser.id
        }
        submitItem(newItem);
        $("#displayMenu").empty();
        displayItem();

    });

    $("#online").on("click", function () {
        currentUser.status = true;
        $.ajax({
            method: "PUT",
            url: "/api/vendors",
            data: currentUser
        });
        if(currentUser.status) {
            if (navigator.geolocation) {

                navigator.geolocation.getCurrentPosition(function (position) {
                    var pos = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        VendorId: currentUser.id
                    };
    
                    console.log(pos);
                    getLocation(pos);
                });
            }
        }
        alert("You're live");      
    });

    $("#offline").on("click", function() {
        currentUser.status = false;
        $.ajax({
            method: "PUT",
            url: "/api/vendors",
            data: currentUser
        });
        alert("See you soon!")
    });

    $("#delete").on("click", function() {

        $.ajax({
            method: "DELETE",
            url: "/api/vendors/" + currentUser.id
        });
        alert("Thank you for doing business with us.");
    });

    $(".btn btn-outline-success btn-sm border-0").on("click", function() {
        console.log("hello");
        // $.ajax ({
        //     method: "DELETE",
        //     url: "/api/menu/" + data.id
        // });
    });

    function submitItem(newItem) {
        $.post("/api/menu", newItem, function(data) {
            console.log(data);
        });
    }

    function getLocation(pos) {
        $.post("/api/location", pos, function(data) {
            console.log(data);
        });
    }

    function displayItem() {
        $.get("/api/menu/" + currentUser.id, function(data) {
            for (let i = 0; i < data.length; i++) {
                var div = $("<div>")
                    .addClass("card text-center border-success mb-3")
                    .attr("style", "min-width: 10rem; max-width: 10rem;");
                var header = $("<div>").addClass("card-header").text(data[i].name);
                var body = $("<div>").addClass("card-body");
                var title = $("<h5>")
                    .addClass("card-title text-center mt-3")
                    .text("$" + data[i].price);
                var button = $("<button>")
                    .addClass("btn btn-outline-success btn-sm border-0")
                    .text("REMOVE");
                div.append(header, title, button);
                $("#displayMenu").append(div);
            }
        });   
    }
});