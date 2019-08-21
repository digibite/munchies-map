$(document).ready(function() {
    var password = $("#inputPassword");
    var email = $("#email");
    var ownerName = $("#ownerName");
    var businessName = $("#businessName");

    $("#profile").on("click", function (event) {
        event.preventDefault();
        
        var newBusiness = {
            owner_name: ownerName.val().trim(),
            business_name: businessName.val().trim(),
            email: email.val(),
            password: password.val()
        };
        submitProfile(newBusiness);
    });

    function submitProfile(nBusiness) {
        $.post("/api/vendors", nBusiness, function() {
            alert("Thank you for signing up!");
            window.location = "/";
        });
    }
});
