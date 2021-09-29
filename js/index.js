import makeMap from './map.js'
import sources from './mapSources.js'
import layers from './mapLayers.js'
import handleModal from './modal.js'
import { toggleLayers } from "./forms.js";

// Handles Map Click for stations
import handleStation from './charts.js'
import handleStationB from './charts2.js'
import handleStationW from './charts3.js'


// add additional imports here (popups, forms, etc)
const modal = document.getElementById('modal')
const modalToggle = document.getElementById('modal-toggle')
const closeModal = document.getElementById('close-modal')
// get additional elements here (forms, etc)
$(document).ready(function(){
  $(".slide-toggle").click(function(){
      $("#mylist").slideToggle();
  });
});

$(document).ready(function() {
  $('.bold-text').click(function() {
      $("#mylist").slideToggle();
      $(".bold-text i").toggleClass("fa-angle-up fa-angle-down");
  });
});
// toggle base and basemap layers 
const toggleLayerForms = Array.from(
  document.querySelectorAll(".sidebar-form-toggle")
);

$(document).ready(function(){
// $("#about").modal('show');
});

var active = null;

const storeStation = (activeStation)=>{
   active = activeStation;
 // console.log(activeStation)
}

var propsStation = null;
var corrdinatesStation = null;

const storeFull = (props, corrdinates)=>{
  propsStation = props;
  corrdinatesStation = corrdinates;
}

// storeFull()

// toggle bewteen Chart View and Data View for Access Score
document.querySelectorAll(".infoSelection").forEach(el => {
  el.onclick = event => {
    const id = event.target.dataset.imageToShow
    document.querySelectorAll(".info").forEach(img => { img.style.display = "none" })
    document.getElementById(id).style.display = "block"
  }
})
// toggle bewteen Chart View and Data View for Bike Score
document.querySelectorAll(".infoSelectionBS").forEach(el => {
  el.onclick = event => {
    const id = event.target.dataset.imageToShow
    document.querySelectorAll(".infoBS").forEach(img => { img.style.display = "none" })
    document.getElementById(id).style.display = "block"
  }
})
// toggle bewteen Chart View and Data View for Walk Score
document.querySelectorAll(".infoSelectionWS").forEach(el => {
  el.onclick = event => {
    const id = event.target.dataset.imageToShow
    document.querySelectorAll(".infoWS").forEach(img => { img.style.display = "none" })
    document.getElementById(id).style.display = "block"
  }
})

// toggle bewteen Chart View and Data View for Walk Score
document.querySelectorAll(".aboutSelection").forEach(el => {
  el.onclick = event => {
    const id = event.target.dataset.imageToShow
    document.querySelectorAll(".tabcontent").forEach(tablinks => { tablinks.style.display = "none" })
    document.getElementById(id).style.display = "block"
  }
})

//toggle Splash and Map
document.getElementById("homeLink").addEventListener("click", function() {
  document.getElementById("mapLink").style.display = "block";
  document.getElementById("main").style.display = "flex"
  document.getElementById("sidebar").style.display = "none"
  document.getElementById("map").style.display = "none"
});  

//toggle Splash and Map
document.getElementById("mapLink").addEventListener("click", function() {
  document.getElementById("mapLink").style.display = "none";
  document.getElementById("main").style.display = "none"
  document.getElementById("map").style.display = "block"
  document.getElementById("sidebar").style.display = "block"
  map.resize()
}); 

// Access Score CheckBox toggle
document.getElementById("AS").addEventListener("click", function() {
  handleStation(propsStation,corrdinatesStation,map)
  // document.getElementById("accessScore").style.display = "block";
  // document.getElementById("bikeScore").style.display = "none";
  // document.getElementById("walkScore").style.display = "none";

  // document.getElementById("infoSwitch").style.display = "block";
  // document.getElementById("infoSwitchBS").style.display = "none";
  // document.getElementById("infoSwitchWS").style.display = "none";
  document.documentElement.style.setProperty('--popup-color', '#30958c');

  $('#BS').css({
    'font-weight':'normal'
  });
  $('#WS').css({
    'font-weight':'normal'
  });
  $('#AS').css({
    'font-weight':'bold'
  });

  map.setLayoutProperty('stations', "visibility", "visible")
  map.setLayoutProperty('stationsB', "visibility", "none")
  map.setLayoutProperty('stationsW', "visibility", "none")

  map.setFilter('as_2mile', ['==', 'dvrpc_id', active]);

});

// Bike Score CheckBox toggle
document.getElementById("BS").addEventListener("click", function() {
  //storeStation()
  // console.log(active)
  // console.log(propsStation)
  // console.log(corrdinatesStation)
  handleStationB(propsStation,corrdinatesStation,map)
  // document.getElementById("bikeScore").style.display = "block"
  // document.getElementById("accessScore").style.display = "none"
  // document.getElementById("walkScore").style.display = "none"

  // document.getElementById("infoSwitchBS").style.display = "block"
  // document.getElementById("infoSwitch").style.display = "none"
  // document.getElementById("infoSwitchWS").style.display = "none"

  document.documentElement.style.setProperty('--popup-color', '#Df73FF');

  $('#AS').css({
    'color':'grey',
    'font-weight':'normal',
    'box-shadow': '0px 0px 0px rgba(0, 255, 128, 0)' 
  });
  $('#WS').css({
    'color':'grey',
    'font-weight':'normal'
  });
  $('#BS').css({
    'color':'var(--theme-accessO)',
    'font-weight':'bold'
  });

   map.setLayoutProperty('stations', "visibility", "none")
   map.setLayoutProperty('stationsB', "visibility", "visible")
   map.setLayoutProperty('stationsW', "visibility", "none")

   map.setFilter('bs_limit', ['==', 'dvrpc_id', active]);
 });

 // Walk Score CheckBox toggle
 document.getElementById("WS").addEventListener("click", function() {
  handleStationW(propsStation,corrdinatesStation,map)
  //  document.getElementById("accessScore").style.display = "none"
  //  document.getElementById("bikeScore").style.display = "none"
  //  document.getElementById("walkScore").style.display = "block"

  //  document.getElementById("infoSwitchWS").style.display = "block"
  //  document.getElementById("infoSwitch").style.display = "none"
  //  document.getElementById("infoSwitchBS").style.display = "none"
   
   document.documentElement.style.setProperty('--popup-color', '#efa801');
  
   $('#AS').css({
    'color':'grey',
    'font-weight':'normal'
  });
  $('#BS').css({
    'color':'grey',
    'font-weight':'normal'
  });
  $('#WS').css({
    'color':'var(--theme-accessF)',
    'font-weight':'bold'
  });

   map.setLayoutProperty('stations', "visibility", "none")
   map.setLayoutProperty('stationsB', "visibility", "none")
   map.setLayoutProperty('stationsW', "visibility", "visible")

   map.setFilter('ws_limit', ['==', 'dvrpc_id', active]);
 });
// Still to come --- Code that is related to Datalist Search 
// const searchForm = document.getElementById('search')
// var retailSearch = {};
// var stations;

// map
const map = makeMap()

map.on('load', () => {
    for(const source in sources) map.addSource(source, sources[source])
    for(const layer in layers) map.addLayer(layers[layer])

    // Wire all checkbox layer toggles to an on-click event
    toggleLayerForms.forEach((form) => toggleLayers(form, map));
 
    // add map events here (click, mousemove, etc)
    // Add NearMap Imagery, it is added here do to neediung to place layer below road-street layer
    map.addLayer(
    {
    'id': 'nearmap',
    'type': 'raster',
    'source': 'nearmap',
    'paint': {},
    "layout": {"visibility":"none"}
    },
    'road-street'
    );
    map.addLayer({
      'id': 'Buildings',
      'source': 'composite',
      'minzoom':7,
      'source-layer': 'building',
      'filter': ['==', 'extrude', 'true'],
      'type': 'fill-extrusion',
    //  'minzoom': 14,
        'paint': {
          'fill-extrusion-color': '#aaa',
           
          // Use an 'interpolate' expression to
          // add a smooth transition effect to
          // the buildings as the user zooms in.
          'fill-extrusion-height': [
          'interpolate',
          ['linear'],
          ['zoom'],
          15,
          0,
          15.05,
          ['get', 'height']
          ],
          'fill-extrusion-base': [
          'interpolate',
          ['linear'],
          ['zoom'],
          15,
          0,
          15.05,
          ['get', 'min_height']
          ],
          'fill-extrusion-opacity': 0.6
          }
    });

    // add map events here (click, mousemove, etc)
    var stationID = null;
    var stationIDb = null;
    var stationIDw = null;
  
    // Create a popup, but don't add it to the map yet.
    let popup = new mapboxgl.Popup({
        className: "station-popup",
        closeButton: false,
        closeOnClick: false
        });

    map.on('click','stations', (e) => {
      var sidebarViz = $("#sidebar").css("display");
      $("#clickBait").css("display", "none"); 
      if (sidebarViz !== "block") {
      //  $("#map").toggleClass("col-sm-6 col-md-6 col-lg-6 col-sm-12 col-md-12 col-lg-12");
        $("#map").css("width", "60%");
        $("#sidebar").css("display", "block");
        $("#legend-box").css("display", "none");
        map.resize();
      }
    //  console.log(stationID);
      stationID = e.features[0].properties.dvrpc_id;
      var props = e.features[0].properties;
      var coordinates = e.features[0].geometry.coordinates;
      
      // When the mouse moves over the station layer, update the
      // feature state for the feature under the mouse
      if (stationID) {
        map.setFilter('as_2mile', ['==', 'dvrpc_id', stationID]);
        map.setFilter('as_osm_limits', ['==', 'dvrpc_id', stationID]);
        map.setFilter('bs_limit', ['==', 'dvrpc_id', stationID]);
        map.setFilter('ws_limit', ['==', 'dvrpc_id', stationID]);
        map.setLayoutProperty('as_2mile', 'visibility', 'visible');
        map.setLayoutProperty('as_osm_limits', 'visibility', 'visible');
        map.setLayoutProperty('bs_limit', 'visibility', 'visible');
        map.setLayoutProperty('ws_limit', 'visibility', 'visible');
      }
      handleStation(props,coordinates,map)   
      storeStation(stationID)
      storeFull(props,coordinates)
    });

    map.on('click','stationsB', (e) => {
     // console.log(stationIDb);
      stationIDb = e.features[0].properties.dvrpc_id;
      var props = e.features[0].properties;
      var coordinates = e.features[0].geometry.coordinates;
  
      if (stationIDb) {
        map.setFilter('as_2mile', ['==', 'dvrpc_id', stationIDb]);
        map.setFilter('as_osm_limits', ['==', 'dvrpc_id', stationIDb]);
        map.setFilter('bs_limit', ['==', 'dvrpc_id', stationIDb]);
        map.setFilter('ws_limit', ['==', 'dvrpc_id', stationIDb]);
        map.setLayoutProperty('as_2mile', 'visibility', 'visible');
        map.setLayoutProperty('as_osm_limits', 'visibility', 'visible');
        map.setLayoutProperty('bs_limit', 'visibility', 'visible');
        map.setLayoutProperty('ws_limit', 'visibility', 'visible');
      }
      handleStationB(props,coordinates,map)   
      storeStation(stationIDb)
      storeFull(props,coordinates)
    });

    map.on('click','stationsW', (e) => {
      stationIDw = e.features[0].properties.dvrpc_id;
      var props = e.features[0].properties;
      var coordinates = e.features[0].geometry.coordinates;
    
      
      if (stationIDw) {
        map.setFilter('as_2mile', ['==', 'dvrpc_id', stationIDw]);
        map.setFilter('as_osm_limits', ['==', 'dvrpc_id', stationIDw]);
        map.setFilter('bs_limit', ['==', 'dvrpc_id', stationIDw]);
        map.setFilter('ws_limit', ['==', 'dvrpc_id', stationIDw]);
        map.setLayoutProperty('as_2mile', 'visibility', 'visible');
        map.setLayoutProperty('as_osm_limits', 'visibility', 'visible');
        map.setLayoutProperty('bs_limit', 'visibility', 'visible');
        map.setLayoutProperty('ws_limit', 'visibility', 'visible');
      }
      handleStationW(props,coordinates,map)  
      storeStation(stationIDw)
      storeFull(props,coordinates)
    });

    map.on('mousemove', 'stations', (e) => {
        map.getCanvas().style.cursor = 'pointer';
        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = '<h3>'+ e.features[0].properties.station +' : '+e.features[0].properties.AS_SCORE+'</h3>';
       // var Popclass = 'station-popup';

        if (e.features.length > 0) {
        // When the mouse moves over the station layer, update the
        // feature state for the feature under the mouse
        if (stationID) {
          map.removeFeatureState({
            source: 'accessscore',
            id: stationID
          });
      //    map.setLayoutProperty('as_2mile', 'visibility', 'visible');
        }
        stationID = e.features[0].id;
        map.setFeatureState(
          {
            source: 'accessscore',
            id: stationID
          },
          {
            hover: true
          }
        );
      }
      // Populate the popup and set its coordinates
      // based on the feature found.
      popup.setLngLat(coordinates).setHTML(description).addTo(map);

    });

    map.on('mousemove', 'stationsB', (e) => {
      map.getCanvas().style.cursor = 'pointer';
      var coordinates = e.features[0].geometry.coordinates.slice();
      var description = '<h3>'+ e.features[0].properties.station +' : '+e.features[0].properties.BS_SCORE+'</h3>';
      if (e.features.length > 0) {
      // When the mouse moves over the station layer, update the
      // feature state for the feature under the mouse
      if (stationID) {
        map.removeFeatureState({
          source: 'CycleScore',
          id: stationID
        });
      }
      stationID = e.features[0].id;
      map.setFeatureState(
        {
          source: 'CycleScore',
          id: stationID
        },
        {
          hover: true
        }
      );
    }
    // Populate the popup and set its coordinates
    // based on the feature found.
    popup.setLngLat(coordinates).setHTML(description).addTo(map);
    });

    map.on('mousemove', 'stationsW', (e) => {
      map.getCanvas().style.cursor = 'pointer';
      var coordinates = e.features[0].geometry.coordinates.slice();
      var description = '<h3>'+ e.features[0].properties.station +' : '+e.features[0].properties.WS_SCORE+'</h3>';
      if (e.features.length > 0) {
      // When the mouse moves over the station layer, update the
      // feature state for the feature under the mouse
      if (stationID) {
        map.removeFeatureState({
          source: 'WalkScore',
          id: stationID
        });
      }
      stationID = e.features[0].id;
      map.setFeatureState(
        {
          source: 'WalkScore',
          id: stationID
        },
        {
          hover: true
        }
      );
    }
  // Populate the popup and set its coordinates
  // based on the feature found.
  popup.setLngLat(coordinates).setHTML(description).addTo(map);
  });
  // When the mouse leaves the station layer, update the
  // feature state of the previously hovered feature
  map.on('mouseleave', 'stations', function () {
    if (stationID) {
      map.setFeatureState(
        {
          source: 'accessscore',
          id: stationID
        },
        {
          hover: false
        }
      );
  //    map.setLayoutProperty('as_2mile', 'visibility', 'none');
    }
    stationID = null;
    // Reset the cursor style
    // close popup
    map.getCanvas().style.cursor = '';
    popup.remove();
  });

  map.on('mouseleave', 'stationsB', function () {
    if (stationID) {
      map.setFeatureState(
        {
          source: 'CycleScore',
          id: stationID
        },
        {
          hover: false
        }
      );
    }
    stationID = null;
    // Reset the cursor style
    // close popup
    map.getCanvas().style.cursor = '';
    popup.remove();
  });

  map.on('mouseleave', 'stationsW', function () {
    if (stationID) {
      map.setFeatureState(
        {
          source: 'WalkScore',
          id: stationID
        },
        {
          hover: false
        }
      );
    }
    stationID = null;
    // Reset the cursor style
    // close popup
    map.getCanvas().style.cursor = '';
    popup.remove();
  });

 // stations.features.forEach(function (marker) {
//      retailSearch[marker.properties.STATION] = marker
//  });

// add typeahead
/* const populateOptions = function (obj) {
  const datalist = document.getElementById('station-list')
  const frag = document.createDocumentFragment()
  
  Object.keys(obj).sort((a, b) => a > b).forEach(function(el) {
    const option = document.createElement('option')
    option.value = el
    frag.appendChild(option)
  })

  datalist.appendChild(frag)
}

populateOptions(retailSearch)
*/
})
// modal
// handleModal(modal, modalToggle, closeModal)
