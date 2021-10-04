function markerColor(depth){
    if (depth>=90){
        return "#EF8573";
    }
    else if (depth>=70){
        return "#EFB473";
    }
    else if (depth>=50){
        return "#EFD073";
    }
    else if (depth>=30){
        return "#E7EF73";
    }
    else if (depth>=10){
        return "#B6EF73";
    }
    else{
        return "#75EF73";
    }
}

function createMap(quakeMarks){
    var map = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        });

    var layer = {earthquakes: new L.LayerGroup(quakeMarks)};

    var myMap = L.map("map", {
        center: [0, 0],
        zoom: 2,
        layers: [map, layer.earthquakes]
    });   


    var legend = L.control({position: 'bottomright'});
            legend.onAdd=function(myMap){
                var div=L.DomUtil.create('div','legend');
                var labels = ["<10","10-29","30-49","50-69","70-89","90+"];
                grades = [0, 10, 30, 50, 70, 90],
                div.innerHTML='<div><b>Legend</b></div';
                for(var i=0; i <grades.length; i++){
                    div.innerHTML+='<i style="background:'+markerColor(grades[i])+' ">&nbsp;</i>&nbsp;&nbsp;'
                    +labels[i]+'<br/>';
                }
                return div;
            }
        legend.addTo(myMap);
}


function createMarkers(response) {

    // Pull the "stations" property from response.data.
    var quakes = response.features;
  
    // Initialize an array to hold bike markers.
    var quakeMarkers = [];
  
    // Loop through the stations array.
    for (var index = 0; index < quakes.length; index++) {
      var quake = quakes[index];
  
      // For each station, create a marker, and bind a popup with the station's name.
    //   var quakeMarker = L.marker([quake.geometry.coordinates[1], quake.geometry.coordinates[0]])
    //     .bindPopup("<h3>" + quake.properties.place + "<h3><h3>Depth: " + quake.geometry.coordinates[2] + "</h3>");
        var quakeMarker = L.circleMarker([quake.geometry.coordinates[1], quake.geometry.coordinates[0]], {
            radius: quake.properties.mag*3,
            color: "#000000",
            weight: .5,
            fillColor: markerColor(quake.geometry.coordinates[2]),
            fillOpacity: 0.9
        }).bindPopup("<h3>" + quake.properties.place + "<h3><h3>Depth: " + quake.geometry.coordinates[2] + "</h3>" + "<h3><h3>Mag: " + quake.properties.mag + "</h3>");
    //   // Add the marker to the bikeMarkers array.
       quakeMarkers.push(quakeMarker);
    }
  
    // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
    createMap(quakeMarkers);
  }
  
  
  // Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(createMarkers);
  


