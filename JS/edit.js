$(document).ready(function () {
  var url = "http://localhost:3000/post"

  $("#btnUp").click(function () {
    console.log("jill");
    $.get(url + "/" + $("#id").val(), function (data) {
      console.log(data);
      var newuser = {};
      newuser.id = data.id;
      newuser.Email = $("#em").val();
      newuser.Phone = $("#pn").val();
      newuser.Username = $("#usr").val();
      newuser.Password = $("#pass").val();
      console.log(JSON.stringify(newuser));
      var updateUrl = url + "/" + data.id;
      $.ajax({
        url: updateUrl,
        type: 'PUT',
        data: newuser,
        success: function (result) {
          alert('Edit Complete!');
          location.replace('profile.html');
        }
      });
    });
  })
})