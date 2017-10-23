function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      console.log(lat);
      console.log(lng);
      initMap(lat, lng);
    });
  }
}

function initMap(lat, lng) {
  var uluru = { lat: lat, lng: lng };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: uluru
  });
  var marker = new google.maps.Marker({
    position: uluru,
    draggable: true,
    map: map
  });
  openweather(lat, lng)

  google.maps.event.addListener(marker, 'dragend', function () {
    map.setCenter(this.getPosition()); // Set map center to marker position

    openweather(this.getPosition().lat(), this.getPosition().lng())
    console.log(this.getPosition().lat(), this.getPosition().lng());
  });

  google.maps.event.addListener(map, 'dragend', function () {
    marker.setPosition(this.getCenter()); // set marker position to map center
    openweather(this.getCenter().lat(), this.getCenter().lng())
    console.log(this.getCenter().lat(), this.getCenter().lng());
  });

}

function complate() {
  google.maps.event.addDomListener(window, 'load', function () {
    var places = new google.maps.places.Autocomplete(document.getElementById('search'));
    google.maps.event.addListener(places, 'place_changed', function () {
      var place = places.getPlace();
      var address = place.formatted_address;
      var latitude = place.geometry.location.lat();
      var longitude = place.geometry.location.lng();

      initMap(latitude, longitude);

    });
  });
}

function openweather(lat, lng) {
  var OpenWeatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + $("#search").val() + "&APPID=f95d6b3bcb257e3fec52501b3c2e78fb";
  console.log(OpenWeatherUrl);
  $.ajax({
    url: OpenWeatherUrl,
    method: 'GET'
  }).then(function (response) {
    console.log(response.weather[0].main);
    var rise = new Date(response.sys.sunrise).toISOString();
    var set = new Date(response.sys.sunset).toISOString();
    $('#cname').html('<h4>' + response.name + '</h4>');
    $('#imgtemp').attr('src', "image/" + response.weather[0].icon + ".png");
    $('#temp').html((response.main.temp / 10).toFixed(2) + '°C');
    $('#weather').html('<h4>' + response.weather[0].main + ' ' + '(' + response.weather[0].description + ')</h4>');
    //   $('#des').html('<h4>'+response.weather[0].description+'</h4>');
    $('#sunrise').html('<h4>' + rise + '</h4>');
    $('#sunset').html('<h4>' + set + '</h4>');

  });
}

getLocation();
complate()