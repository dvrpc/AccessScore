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
    // console.log(e.features[0]);
    // let latitude = e.lngLat.lat;
    // let longitude = e.lngLat.lng;
    let coords = e.lngLat;
    // console.log(latitude);
    // console.log(coords);
    // console.log("lng:" + longitude + ", lat:" + latitude);
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
    // console.log(e.features[0]);
    // let latitude = e.lngLat.lat;
    // let longitude = e.lngLat.lng;
    let coords = e.lngLat;
    // console.log(latitude);
    // console.log(coords);
    // console.log("lng:" + longitude + ", lat:" + latitude);
    createPopUpIPDno(e.features[0], coords);
  });

  // change mouse tip upon leaving feature
  map.on("mouseleave", "IPDno", function (e) {
    closePopUp();
  });
};

export { wire_layer_hover };
