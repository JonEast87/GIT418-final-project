const setPos = (array) => {
  //Creates the map object with the intended coordinates and sets zoom level to 14
  map = L.map('map').setView(array, 14),

//Creates the required WebGL metadata and chains it to the map object
  gl = L.mapboxGL({
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">© MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>',
    accessToken: 'not-needed',
    style: 'https://api.maptiler.com/maps/streets/style.json?key=qZjWTwtNTmBxDi3ZpTB5'
    //Creates the marker for the intended coordinates and chains it to the map object
  }).addTo(map);
  let marker = L.marker(array).addTo(map);
}

const getPos = position => {
  document.getElementById("location").innerHTML = "Latitude: " + position.coords.latitude + "° , Longitude: " + position.coords.longitude + "°" + " <br> Altitude: " + position.coords.altitude;

  //This array is for the latitude and longitude of the desired display location
  let coordsArray = [position.coords.latitude, position.coords.longitude];

  return setPos(coordsArray)
}

const start = () => {
  // if location services are allowed via browser then check will be true
  try {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getPos);
    } else {
      document.getElementById("location").innerHTML = "Location Services Not Turned On";
    }
  } catch (err) {
    console.log(err);
  }
}

start();