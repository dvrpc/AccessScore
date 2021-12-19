import makeMap from './map.js'
import sources from './mapSources.js'
import {catchment, layers, nearMap} from './mapLayers.js'
// import handleModal from './modal.js'
import { toggleLayers } from "./forms.js";
import { togglerHome, togglerMap, togglerEAS, togglerAS, togglerBS, togglerWS } from "./toggler.js";

// Handles Map Click for stations
import handleStation from './charts.js'
import handleStationB from './charts2.js'
import handleStationW from './charts3.js'

// add additional imports here (popups, forms, etc)
// core functionality 
//toggle base and basemap layers 
const toggleLayerForms = Array.from(
  document.querySelectorAll(".sidebar-form-toggle")
);

// get additional elements here (forms, etc)

// Search Functionality
const searchForm = document.getElementById('search')
var stationSearch = {};

fetch('https://services1.arcgis.com/LWtWv6q6BJyKidj8/ArcGIS/rest/services/AccessScore/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=geojson')
  .then(response => response.json())
  .then (data => {
    var retail = data;
    retail.features.forEach(function (geojsonrow) {
      stationSearch[geojsonrow.properties.station] = geojsonrow
    });
  });
 // .then(data => console.log(data));
//  console.log(stationSearch);

// Base Layer Toggler
$("#baselayers").on("mouseenter", function () {
	$("#baselayers_group").show();
  $("#expander-icon").toggleClass("fa-angle-up fa-angle-down");
});

$("#baselayers").on("mouseleave", function () {
	$("#baselayers_group").hide();
  $("#expander-icon").toggleClass("fa-angle-down fa-angle-up");
	$("#baselayers_group").on("mouseenter", function () {
		$("#baselayers_group").show();
	});
});

$("#baselayers_group").on("mouseleave", function () {
	$("#baselayers_group").hide();
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


// toggle bewteen Category Scoring (CHARTS) and Data Measurements (Values)
document.querySelectorAll(".infoSelection").forEach(el => {
  el.onclick = event => {
    const id = event.target.dataset.imageToShow
    document.querySelectorAll(".info").forEach(img => { img.style.display = "none" })
    document.getElementById(id).style.display = "block"
  }
})
// Tour Button
document.getElementById("tourLink").addEventListener("click", function() {
  $("#baselayers_group").show();
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

map.on('load', () => {
// wiring for on-click event on the map 
    togglerAS (map);
    togglerBS (map);
    togglerWS (map);
    togglerHome ();
    togglerMap (map);
    togglerEAS (map);

    for(const source in sources) map.addSource(source, sources[source])
    for(const layer in catchment) map.addLayer(catchment[layer],"road-label")
    for(const layer in layers) map.addLayer(layers[layer])
    for(const layer in nearMap) map.addLayer(nearMap[layer],"road-rail")
 
    // Wire all checkbox layer toggles to an on-click event
    toggleLayerForms.forEach((form) => toggleLayers(form, map));
 
    // add map events here (click, mousemove, etc)
 
    // Create a popup, but don't add it to the map yet.
    let popup = new mapboxgl.Popup({
      className: "station-popup",
      closeButton: false,
      closeOnClick: false
    });  

    const showSidebar = function (e) {   
      $("#explore").prop('open', false);
      $("#analysisWrapper").css("display", "flex");
      $("#scoreWrapper").css("display", "flex");
      $("#chartWrapper").css("display", "block");
      $("#btn-tour").css("display", "block");
    }
    map.on('click', (e) => {
      // console.log(`A click event has occurred at ${e.lngLat}`);
        showSidebar(e)
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
      const location = stationSearch[searched]
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
        // map.setLayoutProperty('bs_limit', 'visibility', 'visible');
        // map.setLayoutProperty('ws_limit', 'visibility', 'visible');
      }
      handleStation(props,coordinates,map)   
      storeStation(stationID)
      storeFull(props,coordinates)
      showSidebar(e)
    } 
  
// Click - AccessScore
    map.on('click','stations', (e) => {
    //  console.log(stationID);
    // first click will show these items

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
// Click - CycleScore
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
// Click PedestrianScore
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

// HOVER AccessScore
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
// HOVER CycleScore
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
// HOVER PedestrianScore
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

  // When the mouse leaves the station layer, update the eature state of the previously hovered feature
// Hover Leave - AccessScore  
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
// Hover Leave - CycleScore  
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
// Hover Leave - PedestrianScore  
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

// add typeahead and Populated 
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
populateOptions(stationSearch)

})
// modal
// handleModal(modal, modalToggle, closeModal)
