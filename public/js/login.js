$(document).ready(function() {
    var password = $("#password");
    var email = $("#email");
    
    $("#login").on("click", function (event) {
        event.preventDefault();
        
        var user = {
            email: email.val(),
            password: password.val()
        };
        console.log(user);
        submitUser(user);
    });

    function submitUser(user) {
        $.post("/login", user, function(data) {
            if (data){
                sessionStorage.setItem("user", JSON.stringify(data));
                window.location = "/profile";
            } else {
                console.error("incorrect");
            }

        })
    }
});
