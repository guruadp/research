let username;
let password;
let check = 1;
let confirm;

$(".signup").on("click", function () {
    username = $(".username").val();
    password = $(".password").val();
    confirm = $(".confirm-password").val();
    if(password == confirm) {
        $.ajax({
            url: "/php/signup.php",
            type: "POST",
            data: {username, password, check},
            success: function(result) {
                if(result == '"0"') {
                    alert("User already Exists");
                }
                else {
                    location.replace("/html/question1.html");
                }
          }
        });
    }
    else {
        alert("Passwords doesn't match!");
    }
});

$(".redirect").on("click", function() {
    location.replace("/index.html");
});
