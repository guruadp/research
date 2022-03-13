let username;
let password;
let check = 1;

$(".login").on("click", function() {
    username = $(".username").val();
    password = $(".password").val();
    $.ajax({
        url: "/php/login.php",
        type: "POST",
        data: {username, password, check},
        success: function(result) {
            if(result == '"0"') {
                alert("Username and Password did not match!");
            }
            else {
                location.replace("/html/subjects.html");
            }
      }
    });
});

$(".redirect").on("click", function() {
    location.replace("/html/signup.html");
});