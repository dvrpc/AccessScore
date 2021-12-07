import makeMap from './map.js'
import sources from './mapSources.js'
import layers from './mapLayers.js'
// import handleModal from './modal.js'
import { toggleLayers } from "./forms.js";
import { togglerHome, togglerMap, togglerEAS, togglerAS, togglerBS, togglerWS } from "./toggler.js";

// Handles Map Click for stations
import handleStation from './charts.js'
import handleStationB from './charts2.js'
import handleStationW from './charts3.js'

// add additional imports here (popups, forms, etc)
// $(document).ready(function(){
//   // $("#about").modal('show');
//   });
// core functionality 
//toggle base and basemap layers 
const toggleLayerForms = Array.from(
  document.querySelectorAll(".sidebar-form-toggle")
);

// get additional elements here (forms, etc)

// Search Functionality
const searchForm = document.getElementById('search')
var retailSearch = {};

fetch('https://services1.arcgis.com/LWtWv6q6BJyKidj8/ArcGIS/rest/services/AccessScore/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=geojson')
  .then(response => response.json())
  .then (data => {
    var retail = data;
    retail.features.forEach(function (geojsonrow) {
      retailSearch[geojsonrow.properties.station] = geojsonrow
    });
  });
 // .then(data => console.log(data));
//  console.log(retailSearch);
// Base Layer Toggler
$("#monitoring").on("mouseenter", function () {
	$("#monitoring_group").show();
  $("#expander-icon").toggleClass("fa-angle-up fa-angle-down");
});

$("#monitoring").on("mouseleave", function () {
	$("#monitoring_group").hide();
  $("#expander-icon").toggleClass("fa-angle-down fa-angle-up");
	$("#monitoring_group").on("mouseenter", function () {
		$("#monitoring_group").show();
	});
});

$("#monitoring_group").on("mouseleave", function () {
	$("#monitoring_group").hide();
});
// Legend Toggler
const legendBtn = document.getElementById('legend-items')
// const legendContainer = legendBtn.nextElementSibling
legendBtn.onclick = e => toggleLegend(e)
const toggleLegend = e => {
  const content = e.target.nextElementSibling
  content.classList.toggle('legend-content-hide')
  $("#legend-icon").toggleClass("fa-angle-down fa-angle-up");
}
// storeFull()
// toggle bewteen Category Scoring (CHARTS) and Data Measurements (Values)
document.querySelectorAll(".infoSelection").forEach(el => {
  el.onclick = event => {
    const id = event.target.dataset.imageToShow
    document.querySelectorAll(".info").forEach(img => { img.style.display = "none" })
    document.getElementById(id).style.display = "block"
  }
})

document.getElementById("tourLink").addEventListener("click", function() {
  $("#monitoring_group").show();
  introJs().start();
});  

// variable for functionality
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
// map
const map = makeMap()

// const map2 = new mapboxgl.Map({
//   container: 'map2', // container ID
//   style: 'mapbox://styles/mapbox/dark-v10', // style URL
//   center: [ -75.26,40.00,], // starting position [lng, lat]
//   zoom: 12,
//   interactive: false// starting zoom
// });

// map2.on('load', () => {

// map2.addSource(
//   'as_osm_limits',
//   { type:'vector',
//   url:'https://tiles.dvrpc.org/data/access-score.json'});
//   map2.addLayer(
//     {
//     "id": "as_osm_limits",
//     "type": "line",
//     "source": "as_osm_limits",
//     "source-layer": "as_osm_limits",
//     'paint': {
//     'line-color': '#3bb8ad',
//     'line-opacity':.8,
//     'line-width': 4.5},
//     "layout": { 
//      "visibility": "none",
//      'line-join': 'round',
//      'line-cap': 'round' }
//     },
//     'road-rail'
//   );
// });

map.on('load', () => {

    togglerAS (map);
    togglerBS (map);
    togglerWS (map);
    togglerHome ();
    togglerMap (map);
    togglerEAS (map);

    for(const source in sources) map.addSource(source, sources[source])
    for(const layer in layers) map.addLayer(layers[layer])

    // Wire all checkbox layer toggles to an on-click event
    toggleLayerForms.forEach((form) => toggleLayers(form, map));
 
    // add map events here (click, mousemove, etc)
    // Add NearMap Imagery, it is added here do to neediung to place layer below road-street layer
    map.addLayer(
      {
      "id": "as_osm_limits",
      "type": "line",
      "source": "as_osm_limits",
      "source-layer": "as_osm_limits",
      'paint': {
      'line-color': '#3bb8ad',
      'line-opacity':.8,
      'line-width': 
      {
        "base": 9,
        "stops": [
          [10, 1],
          [12, 2],
          [13, 4]
        ]
      }
    },
      "layout": { 
       "visibility": "none",
       'line-join': 'round',
       'line-cap': 'round' }
      },
      'road-label'
    );
    map.addLayer(
      {
      "id": "bs_limit",
      "type": "line",
      "source": "bs_limit",
      "source-layer":"cycle_lowstress_limits",
      'paint': {
      'line-color':'#Df73FF',
      'line-opacity':.8,
      'line-width': 
      {
        "base": 9,
        "stops": [
          [10, 1],
          [12, 2],
          [13, 3.5]
        ]
      }
    },
      "layout": { 
       "visibility": "none",
       'line-join': 'round',
       'line-cap': 'round' }
      },
      'road-label'
    );
    map.addLayer(
      {
        "id": "ws_limit",
        "type": "line",
        "source": "ws_limit",
        "source-layer":"walk_pednetwork_limits",
        'paint': {
          // Orange
          'line-color': '#efa801',
          'line-opacity':.8,
          'line-width': 
          {
            "base": 9,
            "stops": [
              [10, 1],
              [12, 2],
              [13, 3]
            ]
          }
        },
          "layout": { 
           "visibility": "none",
           'line-join': 'round',
           'line-cap': 'round' }
      },
      'road-label'
    );
    map.addLayer(
    {
      "id": "stationSelect",
      "type": "circle",
      "source": "accessscore",
      "paint": {
        'circle-opacity': 0,
        'circle-radius': 
        ['step', ['zoom'],
        ['case',['boolean', ['feature-state', 'hover'], false],8,6],
        10,
        ['case',['boolean', ['feature-state', 'hover'], false],10,8],
        13,
        ['case',['boolean', ['feature-state', 'hover'], false],12,9]],
        'circle-stroke-color': '#ffe100',
        'circle-stroke-width': 3
      },
        "layout": { 
          "visibility": "none"
      },
    },
    'road-label'
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
    map.addLayer(
      {
      'id': 'nearmap',
      'type': 'raster',
      'source': 'nearmap',
      'paint': {},
      "layout": {"visibility":"none"}
      },
      'road-rail'
      );
      // Create a popup, but don't add it to the map yet.
      let popup = new mapboxgl.Popup({
        className: "station-popup",
        closeButton: false,
        closeOnClick: false
        });  

// add map events here (click, mousemove, etc)
    var stationID = null;
    var stationIDb = null;
    var stationIDw = null;

// Search by Station
    searchForm.onsubmit = function (e) {
      e.preventDefault()
      const input = e.target.children[0].children[0]
      const searched = input.value
      const location = retailSearch[searched]
      if(!location) {
        alert('Please select a value from the dropdown list')
        input.value = ''
        return
      }
      // non-mapbox function calling the geojson properties and coordinates that get pushed to the handleStation function
      var props = location.properties;
      var coordinates = location.geometry.coordinates;
      var FID = props.dvrpc_id;
     // console.log(FID);
      stationID =  props.dvrpc_id;

          if (stationID) {
            map.setFilter('stationSelect', ['==', 'dvrpc_id', stationID]);
            map.setFilter('as_2mile', ['==', 'dvrpc_id', stationID]);
            map.setFilter('as_osm_limits', ['==', 'dvrpc_id', stationID]);
            map.setFilter('bs_limit', ['==', 'dvrpc_id', stationID]);
            map.setFilter('ws_limit', ['==', 'dvrpc_id', stationID]);
            map.setLayoutProperty('stationSelect', 'visibility', 'visible');
            map.setLayoutProperty('as_2mile', 'visibility', 'visible');
            map.setLayoutProperty('as_osm_limits', 'visibility', 'visible');
            map.setLayoutProperty('bs_limit', 'visibility', 'visible');
            map.setLayoutProperty('ws_limit', 'visibility', 'visible');
          }
          handleStation(props,coordinates,map)   
          storeStation(stationID)
          storeFull(props,coordinates)
        // }
    } 
  
// AccessScore Station Click
    map.on('click','stations', (e) => {
      // var sidebarViz = $("#sidebar").css("display");
      // // $("#clickBait").css("display", "none"); 
      // if (sidebarViz !== "block") {
      // //  $("#map").toggleClass("col-sm-6 col-md-6 col-lg-6 col-sm-12 col-md-12 col-lg-12");
      //   $("#map").css("width", "60%");
      //   $("#sidebar").css("display", "block");
      //   $("#legend-box").css("display", "none");
      //   map.resize();
      // }
    //  console.log(stationID);
      $("#analysisWrapper").css("display", "flex");
      $("#scoreWrapper").css("display", "flex");
      $("#chartWrapper").css("display", "block");
      $("#btn-tour").css("display", "block");

      stationID = e.features[0].properties.dvrpc_id;
      var props = e.features[0].properties;
      var coordinates = e.features[0].geometry.coordinates;
      // When the mouse moves over the station layer, update the
      // feature state for the feature under the mouse
      if (stationID) {
        map.setFilter('stationSelect', ['==', 'dvrpc_id', stationID]);
        map.setFilter('as_2mile', ['==', 'dvrpc_id', stationID]);
        map.setFilter('as_osm_limits', ['==', 'dvrpc_id', stationID]);
        map.setFilter('bs_limit', ['==', 'dvrpc_id', stationID]);
        map.setFilter('ws_limit', ['==', 'dvrpc_id', stationID]);
        map.setLayoutProperty('stationSelect', 'visibility', 'visible');
        map.setLayoutProperty('as_2mile', 'visibility', 'visible');
        map.setLayoutProperty('as_osm_limits', 'visibility', 'visible');
        // map.setLayoutProperty('bs_limit', 'visibility', 'visible');
        // map.setLayoutProperty('ws_limit', 'visibility', 'visible');
      }
      handleStation(props,coordinates,map)   
      storeStation(stationID)
      storeFull(props,coordinates)
    });
// CycleScore Station Click
    map.on('click','stationsB', (e) => {
     // console.log(stationIDb);
      stationIDb = e.features[0].properties.dvrpc_id;
      var props = e.features[0].properties;
      var coordinates = e.features[0].geometry.coordinates;
  
      if (stationIDb) {
        map.setFilter('stationSelect', ['==', 'dvrpc_id', stationIDb]);
        map.setFilter('as_2mile', ['==', 'dvrpc_id', stationIDb]);
        map.setFilter('as_osm_limits', ['==', 'dvrpc_id', stationIDb]);
        map.setFilter('bs_limit', ['==', 'dvrpc_id', stationIDb]);
        map.setFilter('ws_limit', ['==', 'dvrpc_id', stationIDb]);
        map.setLayoutProperty('stationSelect', 'visibility', 'visible');
        map.setLayoutProperty('as_2mile', 'visibility', 'visible');
        // map.setLayoutProperty('as_osm_limits', 'visibility', 'visible');
        // map.setLayoutProperty('bs_limit', 'visibility', 'visible');
        // map.setLayoutProperty('ws_limit', 'visibility', 'visible');
      }
      handleStationB(props,coordinates,map)   
      storeStation(stationIDb)
      storeFull(props,coordinates)
    });
// PedestrianScore Station Click
    map.on('click','stationsW', (e) => {
      stationIDw = e.features[0].properties.dvrpc_id;
      var props = e.features[0].properties;
      var coordinates = e.features[0].geometry.coordinates;
  
      if (stationIDw) {
        map.setFilter('stationSelect', ['==', 'dvrpc_id', stationIDw]);
        map.setFilter('as_2mile', ['==', 'dvrpc_id', stationIDw]);
        map.setFilter('as_osm_limits', ['==', 'dvrpc_id', stationIDw]);
        map.setFilter('bs_limit', ['==', 'dvrpc_id', stationIDw]);
        map.setFilter('ws_limit', ['==', 'dvrpc_id', stationIDw]);
        map.setLayoutProperty('stationSelect', 'visibility', 'visible');
        map.setLayoutProperty('as_2mile', 'visibility', 'visible');
        // map.setLayoutProperty('as_osm_limits', 'visibility', 'visible');
        // map.setLayoutProperty('bs_limit', 'visibility', 'visible');
        // map.setLayoutProperty('ws_limit', 'visibility', 'visible');
      }
      handleStationW(props,coordinates,map)  
      storeStation(stationIDw)
      storeFull(props,coordinates)
    });
// // AccessScore Station HOVER
    map.on('mousemove', 'stations', (e) => {
        map.getCanvas().style.cursor = 'pointer';
        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = '<h3>'+ e.features[0].properties.station +' : '+e.features[0].properties.AS_SCORE+'</h3>';
        // var description = '<h3>'+ e.features[0].properties.station +' : '+e.features[0].properties.AS_SCORE+'</h3>';
       // var Popclass = 'station-popup';

        if (e.features.length > 0) {
        // When the mouse moves over the station layer, update the
        // feature state for the feature under the mouse
        if (stationID) {
          map.removeFeatureState({
            source: 'accessscore',
            id: stationID
          });
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

// add typeahead
 const populateOptions = function (obj) {
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

})
// modal
// handleModal(modal, modalToggle, closeModal)
