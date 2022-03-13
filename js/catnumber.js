var flag = 0;

$(".profile-button").on("click", function () {
    if(flag == 0) {
        $(".wrapper").fadeOut();
        $(".options").fadeIn();
        flag = 1;
    }
    else {
        $(".wrapper").fadeIn();
        $(".options").fadeOut();
        flag = 0;
    }
});