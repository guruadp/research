let num;
let check = 1;

$(".next").on("click", function () {
    num = $(".answer").val();
    num = parseInt(num);
    $.ajax({
        url: "/php/storenum.php",
        type: "POST",
        data: {num, check},
        success: function(result) {
            console.log(result);
            if(result == '"0"') {
                alert("Error!");
            }
            else {
                location.replace("/html/question2.html");
            }
      }
    });
});