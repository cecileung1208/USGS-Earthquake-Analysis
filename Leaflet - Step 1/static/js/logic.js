// Create a map object
var myMap = L.map("mapid", {
  center: [35.222, -101.8313],
  zoom: 5
});

// Add a light tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/light-v10",
  accessToken: API_KEY
}).addTo(myMap);



// Create a variable for the geojson
var queryURL =  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";



d3.json(queryURL, function(json) {



  geoLayer = L.geoJson(json, {

    style: function(feature) {
      var depth = feature.geometry.coordinates[2];
      if (depth >= 90.0) {
        return {
          color: "#FF3333"
        }; 
      }
      else if (depth >= 70.0) {
        return {
          color: "#FF9966"
        };
      } else if (depth >= 50) {
          return {
            color: "#FF9900"
        };
      } else if (depth >= 30) {
          return {
            color: "#FFCC33"
        };
      } else if (depth >= 10) {
          return {
            color: "#99FF00"
        };
      } else {
          return {
            color: "#66FF00"
        }
      }
    },

    onEachFeature: function(feature, layer) {

      var popupText = "<b>Magnitude:</b> " + feature.properties.mag +
        "<br><b>Depth:</b> " + feature.geometry.coordinates[2] +
        "<br><b>Location:</b> " + feature.properties.place +
        "<br><a href='" + feature.properties.url + "'>More info</a>";

      layer.bindPopup(popupText, {
        closeButton: true,
        offset: L.point(0, -20)
      });
      layer.on('click', function() {
        layer.openPopup();
      });
    },

    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng, {
        radius: Math.round(feature.properties.mag) * 4,
        fillOpacity: 1,
        color: "black",
      });
    },
  }).addTo(myMap);
});
