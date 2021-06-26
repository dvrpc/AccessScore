import makeMap from './map.js'
import sources from './mapSources.js'
import layers from './mapLayers.js'
import handleModal from './modal.js'
import handleStation from './charts.js'
import handleStationB from './charts2.js'
import handleStationW from './charts3.js'
// add additional imports here (popups, forms, etc)


const modal = document.getElementById('modal')
const modalToggle = document.getElementById('modal-toggle')
const closeModal = document.getElementById('close-modal')
// get additional elements here (forms, etc)

document.querySelectorAll(".infoSelection").forEach(el => {
  el.onclick = event => {
    const id = event.target.dataset.imageToShow
    document.querySelectorAll(".info").forEach(img => { img.style.display = "none" })
    document.getElementById(id).style.display = "block"
  }
})

document.querySelectorAll(".scoreSelection").forEach(el => {
  el.onclick = event => {
    const id = event.target.dataset.imageToShow
    document.querySelectorAll(".score").forEach(img => { img.style.display = "none" })
    document.getElementById(id).style.display = "block"
  }
})

document.getElementById("AS").addEventListener("click", function() {
 // alert("Hello World!");
  document.getElementById("accessScore").style.display = "block"
  document.getElementById("bikeScore").style.display = "none"
  document.getElementById("walkScore").style.display = "none"
  map.setLayoutProperty('stations', "visibility", "visible")
  map.setLayoutProperty('stationsB', "visibility", "none")
  map.setLayoutProperty('stationsW', "visibility", "none")
});

document.getElementById("BS").addEventListener("click", function() {
  // alert("Hello World!");
   document.getElementById("accessScore").style.display = "none"
   document.getElementById("bikeScore").style.display = "block"
   document.getElementById("walkScore").style.display = "none"
   map.setLayoutProperty('stations', "visibility", "none")
   map.setLayoutProperty('stationsB', "visibility", "visible")
   map.setLayoutProperty('stationsW', "visibility", "none")
 });

 document.getElementById("WS").addEventListener("click", function() {
  // alert("Hello World!");
   document.getElementById("accessScore").style.display = "none"
   document.getElementById("bikeScore").style.display = "none"
   document.getElementById("walkScore").style.display = "block"
   map.setLayoutProperty('stations', "visibility", "none")
   map.setLayoutProperty('stationsB', "visibility", "none")
   map.setLayoutProperty('stationsW', "visibility", "visible")
 });


const searchForm = document.getElementById('search')
var retailSearch = {};
var stations;

// map
const map = makeMap()

map.on('load', () => {
    for(const source in sources) map.addSource(source, sources[source])
    for(const layer in layers) map.addLayer(layers[layer])

    // add map events here (click, mousemove, etc)
    var stationID = null;

    // Create a popup, but don't add it to the map yet.
    var popup = new mapboxgl.Popup({
        className: "station-popup",
        closeButton: false,
        closeOnClick: false
        });

    map.on('click','stations', (e) => {
      var props = e.features[0].properties;
      var coordinates = e.features[0].geometry.coordinates;
      handleStation(props,coordinates,map)    
    });

    map.on('click','stationsB', (e) => {
      var props = e.features[0].properties;
      var coordinates = e.features[0].geometry.coordinates;
      handleStationB(props,coordinates,map)    
    });

    map.on('click','stationsW', (e) => {
      var props = e.features[0].properties;
      var coordinates = e.features[0].geometry.coordinates;
      handleStationW(props,coordinates,map)    
    });

    map.on('mousemove', 'stations', (e) => {
        map.getCanvas().style.cursor = 'pointer';
        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = '<h3>'+ e.features[0].properties.station +' : '+e.features[0].properties.AS_SCORE+'</h3>';
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
handleModal(modal, modalToggle, closeModal)
