$(document).ready(function () {
  var url = "http://localhost:3000/post"

  $("#btnRe").click(function () {
    $.post(url, {
      Email: $("#em").val(),
      Phone: $("#pn").val(),
      Username: $("#usr").val(),
      Password: $("#pass").val()
    });
    alert('Register Complete!')
    location.replace('login.html');
  });
});