let check2 = 1;
let subjects = [];
let check = 1;

    $.ajax({
        url: "/php/storenum1.php",
        type: "POST",
        data: {check2},
        success: function(result) {
            console.log(result);
            var data = parseInt(result);
            var html = ``;
            for(let i=1; i<=data; i++) {
                html += `<center><input type="text" class="subject" placeholder="Subject ` + i +` Name"></center>
                <br>
                <br></br>`
            }
            $(".subjects").append(html);
      }
    });

    $(".next").on("click", function() {

        var inputs = $(".subject");
        for(var i=0; i<inputs.length; i++) {
            subjects.push($(inputs[i]).val());
        }

        subjects = JSON.stringify(subjects);

        $.ajax({
            url: "/php/substore.php",
            type: "POST",
            data: {check, subjects},
            success: function(result) {
                if(result == '"0"') {
                }
                else {
                    location.replace("/html/subjects.html");
                }
          }
        });

    });