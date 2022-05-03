// HOVER AccessScore


const wire_layer_hover = (map) => {
  var stationID = null;

  map.on("mousemove", "stations", (e) => {
    map.getCanvas().style.cursor = "pointer";
    // var coordinates = e.features[0].geometry.coordinates.slice();
    // var description = '<h3>'+ e.features[0].properties.station +' : '+e.features[0].properties.AS_SCORE+'</h3>';
    // // var description = '<h3>'+ e.features[0].properties.station +' : '+e.features[0].properties.AS_SCORE+'</h3>';
    // var Popclass = 'station-popup';

    if (e.features.length > 0) {
      // When the mouse moves over the station layer, update the
      // feature state for the feature under the mouse
      if (stationID) {
        map.removeFeatureState({
          source: "accessscore",
          id: stationID,
        });
      }
      stationID = e.features[0].id;
      map.setFeatureState(
        {
          source: "accessscore",
          id: stationID,
        },
        {
          hover: true,
        }
      );
    }
    // Populate the popup and set its coordinates
    // based on the feature found.
    // popup.setLngLat(coordinates).setHTML(description).addTo(map);
    createPopUp(e.features[0]);
  });
  // HOVER CycleScore
  map.on("mousemove", "stationsB", (e) => {
    map.getCanvas().style.cursor = "pointer";
    // var coordinates = e.features[0].geometry.coordinates.slice();
    // var description = '<h3>'+ e.features[0].properties.station +' : '+e.features[0].properties.BS_SCORE+'</h3>';
    if (e.features.length > 0) {
      // When the mouse moves over the station layer, update the
      // feature state for the feature under the mouse
      if (stationID) {
        map.removeFeatureState({
          source: "CycleScore",
          id: stationID,
        });
      }
      stationID = e.features[0].id;
      map.setFeatureState(
        {
          source: "CycleScore",
          id: stationID,
        },
        {
          hover: true,
        }
      );
    }
    // Populate the popup and set its coordinates
    // based on the feature found.
    // popup.setLngLat(coordinates).setHTML(description).addTo(map);
    createPopUpCS(e.features[0]);
  });
  // HOVER PedestrianScore
  map.on("mousemove", "stationsW", (e) => {
    map.getCanvas().style.cursor = "pointer";
    // var coordinates = e.features[0].geometry.coordinates.slice();
    // var description = '<h3>'+ e.features[0].properties.station +' : '+e.features[0].properties.WS_SCORE+'</h3>';
    if (e.features.length > 0) {
      // When the mouse moves over the station layer, update the
      // feature state for the feature under the mouse
      if (stationID) {
        map.removeFeatureState({
          source: "WalkScore",
          id: stationID,
        });
      }
      stationID = e.features[0].id;
      map.setFeatureState(
        {
          source: "WalkScore",
          id: stationID,
        },
        {
          hover: true,
        }
      );
    }
    // Populate the popup and set its coordinates
    // based on the feature found.
    // popup.setLngLat(coordinates).setHTML(description).addTo(map);
    createPopUpWS(e.features[0]);
  });

  function createPopUp(currentFeature) {
    const popUps = document.getElementsByClassName("mapboxgl-popup");
    if (popUps[0]) popUps[0].remove();
    // var popup = new mapboxgl.Popup({ closeOnClick: false })
    new mapboxgl.Popup({ closeButton: false, closeOnClick: false })
      .setLngLat(currentFeature.geometry.coordinates)
      .setHTML(
        `<h3>${currentFeature.properties.station}<br><small>${currentFeature.properties.line}</small></h3><h4>AccessScore: ${currentFeature.properties.AS_SCORE}</h4>`
      )
      .addTo(map);
  }

  function createPopUpCS(currentFeature) {
    const popUps = document.getElementsByClassName("mapboxgl-popup");
    if (popUps[0]) popUps[0].remove();
    // var popup = new mapboxgl.Popup({ closeOnClick: false })
    new mapboxgl.Popup({ closeButton: false, closeOnClick: false })
      .setLngLat(currentFeature.geometry.coordinates)
      .setHTML(
        `<h3>${currentFeature.properties.station}<br><small>${currentFeature.properties.line}</small></h3><h4>CycleScore: ${currentFeature.properties.CS_SCORE}</h4>`
      )
      .addTo(map);
  }

  function createPopUpWS(currentFeature) {
    const popUps = document.getElementsByClassName("mapboxgl-popup");
    if (popUps[0]) popUps[0].remove();
    // var popup = new mapboxgl.Popup({ closeOnClick: false })
    new mapboxgl.Popup({ closeButton: false, closeOnClick: false })
      .setLngLat(currentFeature.geometry.coordinates)
      .setHTML(
        `<h3>${currentFeature.properties.station}<br><small>${currentFeature.properties.line}</small></h3><h4>PedestrianScore: ${currentFeature.properties.WS_SCORE}</h4>`
      )
      .addTo(map);
  }

  function closePopUp() {
    const popUps = document.getElementsByClassName("mapboxgl-popup");
    if (popUps[0]) popUps[0].remove();
  }

  // When the mouse leaves the station layer, update the eature state of the previously hovered feature
  // Hover Leave - AccessScore
  map.on("mouseleave", "stations", function () {
    if (stationID) {
      map.setFeatureState(
        {
          source: "accessscore",
          id: stationID,
        },
        {
          hover: false,
        }
      );
    }
    stationID = null;
    // Reset the cursor style
    // close popup
    map.getCanvas().style.cursor = "";
    closePopUp();
    // popup.remove();
  });

  // Hover Leave - CycleScore
  map.on("mouseleave", "stationsB", function () {
    if (stationID) {
      map.setFeatureState(
        {
          source: "CycleScore",
          id: stationID,
        },
        {
          hover: false,
        }
      );
    }
    stationID = null;
    // Reset the cursor style
    // close popup
    map.getCanvas().style.cursor = "";
    // popup.remove();
    closePopUp();
  });
  // Hover Leave - PedestrianScore
  map.on("mouseleave", "stationsW", function () {
    if (stationID) {
      map.setFeatureState(
        {
          source: "WalkScore",
          id: stationID,
        },
        {
          hover: false,
        }
      );
    }
    stationID = null;
    // Reset the cursor style
    // close popup
    map.getCanvas().style.cursor = "";
    // popup.remove();
    closePopUp();
  });

  function createPopUpBUS(currentFeature) {
    const popUps = document.getElementsByClassName("mapboxgl-popup");
    if (popUps[0]) popUps[0].remove();
    // var popup = new mapboxgl.Popup({ closeOnClick: false })
    new mapboxgl.Popup({ closeButton: false, closeOnClick: false })
      .setLngLat(currentFeature.geometry.coordinates)
      .setHTML(
        `<h4 class="BUS">${currentFeature.properties.stop_name}</h4><p>&nbsp;&nbsp;Transit Stop</p>`
      )
      .addTo(map);
  }

  map.on("mousemove", "transit_stops", function (e) {
    map.getCanvas().style.cursor = "pointer";
    createPopUpBUS(e.features[0]);
  });

  // change mouse tip upon leaving feature
  map.on("mouseleave", "transit_stops", function (e) {
    closePopUp();
  });

  function createPopUpES(currentFeature) {
    const popUps = document.getElementsByClassName("mapboxgl-popup");
    if (popUps[0]) popUps[0].remove();
    // var popup = new mapboxgl.Popup({ closeOnClick: false })
    new mapboxgl.Popup({ closeButton: false, closeOnClick: false })
      .setLngLat(currentFeature.geometry.coordinates)
      .setHTML(
        `<h4 class="ES">${currentFeature.properties.name}</h4><p>&nbsp;&nbsp;Essential Services</p>`
      )
      .addTo(map);
  }

  map.on("mousemove", "es", function (e) {
    map.getCanvas().style.cursor = "pointer";
    createPopUpES(e.features[0]);
  });

  // change mouse tip upon leaving feature
  map.on("mouseleave", "es", function (e) {
    closePopUp();
  });

  function createPopUpCiv(currentFeature) {
    const popUps = document.getElementsByClassName("mapboxgl-popup");
    if (popUps[0]) popUps[0].remove();
    // var popup = new mapboxgl.Popup({ closeOnClick: false })
    new mapboxgl.Popup({ closeButton: false, closeOnClick: false })
      .setLngLat(currentFeature.geometry.coordinates)
      .setHTML(
        `<h4 class="CIV">${currentFeature.properties.Name}</h4><p>&nbsp;&nbsp;Civic and Cultural<br>&nbsp;&nbsp;Resources</p>`
      )
      .addTo(map);
  }

  map.on("mousemove", "civic", function (e) {
    map.getCanvas().style.cursor = "pointer";
    createPopUpCiv(e.features[0]);
  });

  // change mouse tip upon leaving feature
  map.on("mouseleave", "civic", function (e) {
    closePopUp();
  });

  function createPopUpSEPTA(currentFeature, coords) {
    const popUps = document.getElementsByClassName("mapboxgl-popup");
    if (popUps[0]) popUps[0].remove();
    // var popup = new mapboxgl.Popup({ closeOnClick: false })
    new mapboxgl.Popup({ closeButton: false, closeOnClick: false })
      //   .setLngLat(latitude,longitude)
      .setLngLat(coords)
      .setHTML(
        //   console.log("lng:" + e.coords.longitude + ", lat:" + e.coords.latitude);
        `<h4 class="BUS">${currentFeature.properties.linename}</h4><p>&nbsp;&nbsp;SEPTA Bus Route</p>`
      )
      .addTo(map);
  }

  map.on("mousemove", "septa", function (e) {
    map.getCanvas().style.cursor = "pointer";
    // console.log(e.features[0]);
    // let latitude = e.lngLat.lat;
    // let longitude = e.lngLat.lng;
    let coords = e.lngLat;
    // console.log(latitude);
    // console.log(coords);
    // console.log("lng:" + longitude + ", lat:" + latitude);
    createPopUpSEPTA(e.features[0], coords);
  });

  // change mouse tip upon leaving feature
  map.on("mouseleave", "septa", function (e) {
    closePopUp();
  });

  function createPopUpCircuit(currentFeature, coords) {
    const popUps = document.getElementsByClassName("mapboxgl-popup");
    if (popUps[0]) popUps[0].remove();
    // var popup = new mapboxgl.Popup({ closeOnClick: false })
    new mapboxgl.Popup({ closeButton: false, closeOnClick: false })
      //   .setLngLat(latitude,longitude)
      .setLngLat(coords)
      .setHTML(
        //   console.log("lng:" + e.coords.longitude + ", lat:" + e.coords.latitude);
        `<h4 class="CIRCUIT">${currentFeature.properties.name}</h4><p>&nbsp;&nbsp;The Circuit Trails</p>`
      )
      .addTo(map);
  }

  map.on("mousemove", "circuit_trails", function (e) {
    map.getCanvas().style.cursor = "pointer";
    // console.log(e.features[0]);
    // let latitude = e.lngLat.lat;
    // let longitude = e.lngLat.lng;
    let coords = e.lngLat;
    // console.log(latitude);
    // console.log(coords);
    // console.log("lng:" + longitude + ", lat:" + latitude);
    createPopUpCircuit(e.features[0], coords);
  });

  // change mouse tip upon leaving feature
  map.on("mouseleave", "circuit_trails", function (e) {
    closePopUp();
  });

  function createPopUpIPD(currentFeature, coords) {
    const popUps = document.getElementsByClassName("mapboxgl-popup");
    if (popUps[0]) popUps[0].remove();
    // var popup = new mapboxgl.Popup({ closeOnClick: false })
    new mapboxgl.Popup({ closeButton: false, closeOnClick: false })
      //   .setLngLat(latitude,longitude)
      .setLngLat(coords)
      .setHTML(
        //   console.log("lng:" + e.coords.longitude + ", lat:" + e.coords.latitude);
        `<h4 class="IPD">${currentFeature.properties.ipd_class}<br>IPD Score: ${currentFeature.properties.ipd_score}</h4><p>&nbsp;&nbsp;Indicators of Potential<br>&nbsp;&nbsp;Disadvantage</p>`
      )
      .addTo(map);
  }

  map.on("mousemove", "IPD", function (e) {
    map.getCanvas().style.cursor = "pointer";
    let coords = e.lngLat;
    createPopUpIPD(e.features[0], coords);
  });

  // change mouse tip upon leaving feature
  map.on("mouseleave", "IPD", function (e) {
    closePopUp();
  });

  function createPopUpIPDno(currentFeature, coords) {
    const popUps = document.getElementsByClassName("mapboxgl-popup");
    if (popUps[0]) popUps[0].remove();
    // var popup = new mapboxgl.Popup({ closeOnClick: false })
    new mapboxgl.Popup({ closeButton: false, closeOnClick: false })
      //   .setLngLat(latitude,longitude)
      .setLngLat(coords)
      .setHTML(
        //   console.log("lng:" + e.coords.longitude + ", lat:" + e.coords.latitude);
        `<h4 class="IPD">No Data</h4><p>&nbsp;&nbsp;Indicators of Potential<br>&nbsp;&nbsp;Disadvantage</p>`
      )
      .addTo(map);
  }

  map.on("mousemove", "IPDno", function (e) {
    map.getCanvas().style.cursor = "pointer";
    let coords = e.lngLat;
    createPopUpIPDno(e.features[0], coords);
  });

  // change mouse tip upon leaving feature
  map.on("mouseleave", "IPDno", function (e) {
    closePopUp();
  });

  function createPopUpLandUse(layer, coords, props) {
    let landuse15_cat;
    if (props.substring(0, 3) === '010'){
      landuse15_cat = "Residential"
    } else if (props.substring(0, 3) === '030'){
      landuse15_cat = "Industrial"
    } else if (props.substring(0, 3) === '040'){
      landuse15_cat = "Transportation"
    } else if (props.substring(0, 3) === '050'){
      landuse15_cat = "Utility"
    } else if (props.substring(0, 3) === '060'){
      landuse15_cat = "Commerical"
    } else if (props.substring(0, 3) === '070'){
      landuse15_cat = "Institutional"
    } else if (props.substring(0, 3) === '080'){
      landuse15_cat = "Military"
    } else if (props.substring(0, 3) === '090'){
      landuse15_cat = "Recreation"
    } else if (props.substring(0, 3) === '100'){
      landuse15_cat = "Agriculture"
    } else if (props.substring(0, 3) === '110'){
      landuse15_cat = "Mining"
    } else if (props.substring(0, 3) === '120'){
      landuse15_cat = "Wooded"
    } else if (props.substring(0, 3) === '130'){
      landuse15_cat = "Water"
    } else if (props.substring(0, 3) === '140'){
      landuse15_cat = "Undeveloped"
    } else {landuse15_cat = "Unknown"}; 
    
   

    const popUps = document.getElementsByClassName("mapboxgl-popup");
    if (popUps[0]) popUps[0].remove();
    // var popup = new mapboxgl.Popup({ closeOnClick: false })
    new mapboxgl.Popup({ closeButton: false, closeOnClick: false })
      //   .setLngLat(latitude,longitude)
      .setLngLat(coords)
      .setHTML("<h4 class='LandUse'>" + landuse15_cat + "</h4><p>&nbsp;&nbsp;DVRPC Land Use</p>")
      .addTo(map);
  }

  map.on("mousemove", "landuse15", function (e) {
    map.getCanvas().style.cursor = "pointer";
 
    let coords = e.lngLat;
    let layer = e.features[0];
    let props = e.features[0].properties.lu15sub;
    // console.log(e.features[0].properties.lu15sub);
    createPopUpLandUse(layer, coords, props);
  });

  // change mouse tip upon leaving feature
  map.on("mouseleave", "landuse15", function (e) {
    closePopUp();
  });

  function createPopUpCar(layer, coords, props) {
    const popUps = document.getElementsByClassName("mapboxgl-popup");
    if (popUps[0]) popUps[0].remove();
    new mapboxgl.Popup({ closeButton: false, closeOnClick: false })
      .setLngLat(coords)
      .setHTML("<h4 class='Car'>Total Households<br> (per tract):<br>" + props.ZeroCarHH  + "</h4><p>&nbsp;&nbsp;Zero-vehcile Households</p>")
      .addTo(map);
  }

  map.on("mousemove", "car", function (e) {
    map.getCanvas().style.cursor = "pointer";
    let coords = e.lngLat;
    let layer = e.features[0];
    let props = e.features[0].properties;
    createPopUpCar(layer, coords, props);
  });

  // change mouse tip upon leaving feature
  map.on("mouseleave", "car", function (e) {
    closePopUp();
  });

  function createPopUpEmp(layer, coords, props) {
    const popUps = document.getElementsByClassName("mapboxgl-popup");
    if (popUps[0]) popUps[0].remove();
    new mapboxgl.Popup({ closeButton: false, closeOnClick: false })
      .setLngLat(coords)
      .setHTML("<h4 class='Emp'>Total Employess<br> (per tract):<br>" + props.EMP15 + "</h4><p>&nbsp;&nbsp;Employees</p>")
      .addTo(map);
  }

  map.on("mousemove", "emp", function (e) {
    map.getCanvas().style.cursor = "pointer";
    let coords = e.lngLat;
    let layer = e.features[0];
    let props = e.features[0].properties;
    createPopUpEmp(layer, coords, props);
  });

  // change mouse tip upon leaving feature
  map.on("mouseleave", "emp", function (e) {
    closePopUp();
  });

  function createPopUpPop(layer, coords, props) {
    const popUps = document.getElementsByClassName("mapboxgl-popup");
    if (popUps[0]) popUps[0].remove();
    new mapboxgl.Popup({ closeButton: false, closeOnClick: false })
      .setLngLat(coords)
      .setHTML("<h4 class='Pop'>Total Population<br> (per tract):<br>" + props.u_tpopest + "</h4><p>&nbsp;&nbsp;Population</p>")
      .addTo(map);
  }

  map.on("mousemove", "population", function (e) {
    map.getCanvas().style.cursor = "pointer";
    let coords = e.lngLat;
    let layer = e.features[0];
    let props = e.features[0].properties;
    createPopUpPop(layer, coords, props);
  });

  // change mouse tip upon leaving feature
  map.on("mouseleave", "population", function (e) {
    closePopUp();
  });


};

export { wire_layer_hover };
