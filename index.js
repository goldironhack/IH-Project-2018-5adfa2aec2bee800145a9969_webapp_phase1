//GOOGLE MAPS KEY API
const KEY_MAPS = "AIzaSyB63_2wCGLLuvMadVGTh8oaaPKIcH67sBs";

//*****************************//
//URL OF THE DATASETS TO BE USED

//NEIGHBORHOOD NAMES GIS
const URL_NEIGHBORHOOD_NAMES_GIS =
  "https://data.cityofnewyork.us/api/views/xyye-rtrs/rows.json?accessType=DOWNLOAD";

//NY DISTRICTS GEOSHAPES
const URL_POLYGON =
  "https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/nycd/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=geojson";

//DATASET CRIMES IN NY - 12/31/2015
const URL_CRIMES_IN_NY =
  "https://data.cityofnewyork.us/api/views/qgea-i56i/rows.json?accessType=DOWNLOAD";

//DATASET CONTAINS INFORMATION ON NEW YORK CITY HOUSING BY BUILDING DATA
const URL_HOUSING_IN_NY =
  "https://data.cityofnewyork.us/api/views/hg8x-zxpr/rows.json?accessType=DOWNLOAD";
//*****************************//

//GLOBAL VARIABLES
var input_map = {
  remove: "https://image.flaticon.com/icons/svg/139/139087.svg",
  get: "https://image.flaticon.com/icons/svg/139/139088.svg",
  state: true
};

var map,
  features = [];

//COORDINATE NYU STERN SCHOOL OF BUSINESS
var initialCoordinates = { lat: 40.7291, lng: -73.9965 };

//FUNCTIONS
/**
 * FUNCTION TO INITIALIZE THE MAP
 */
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: initialCoordinates,
    zoom: 10
  });

  var marker = new google.maps.Marker({
    position: initialCoordinates,
    map: map
  });
}

/**
 * DRAW THE MAP WITH THE GEOJSON COORDINATES
 */
function getMapFromGeoJson() {
  map.data.loadGeoJson(URL_POLYGON);

  map.data.setStyle(function(_feature) {
    var color = getColor();

    features.push(_feature);

    return {
      fillColor: color,
      strokeWeight: 1,
      fillOpacity: 1
    };
  });
}

/**
 * REMOVE THE MAP WITH GEOJSON COORDINATES
 */
function removePolygon() {
  for (var feature of features) {
    map.data.remove(feature);
  }
}

/**
 * CHANGE THE IMAGE ICON MAPS
 */
function getAndRemoveMap() {
  if (input_map.state) {
    getMapFromGeoJson();
    $("#input-map").attr("src", input_map.get);
    input_map.state = false;
  } else {
    removePolygon();
    $("#input-map").attr("src", input_map.remove);
    input_map.state = true;
  }
}

/**
 * COLORS USED TO PAINT THE MAP
 */
function getColor() {
  var color = [
    "#09347a",
    "#007dc3",
    "#0169a4",
    "#3399cc",
    "#f1632a",
    "#464646"
  ];
  return choice(color);
}

/**
 * RANDOM WITH THE ARRAY COMPONENTS
 */
function choice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * MAIN
 */
$(function() {
  $('[data-toggle="tooltip"]').tooltip();

  $("#input-map").on("click", getAndRemoveMap);
});
