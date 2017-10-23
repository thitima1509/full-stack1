$(document).ready(function () {
    var url = "http://localhost:3000/post"

    $("#btnLog").click(function () {

        var i
        $.ajax({
            url: url,
            method: "GET",
            success: function (data, status, xhr) {
                console.log(data);
                console.log($("#pass").val());
                console.log($("#usr").val());

                for (i = 0; i < data.length; i++) {
                    if (data[i].Password === $("#pass").val() && data[i].Username === $("#usr").val()) {
                        alert('Login Complete!')
                        location.replace('profile.html');
                        break;
                    }
                }
            }
        })
    });
});