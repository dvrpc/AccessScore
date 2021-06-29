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

document.querySelectorAll(".infoSelectionBS").forEach(el => {
  el.onclick = event => {
    const id = event.target.dataset.imageToShow
    document.querySelectorAll(".info").forEach(img => { img.style.display = "none" })
    document.getElementById(id).style.display = "block"
  }
})

document.querySelectorAll(".infoSelectionWS").forEach(el => {
  el.onclick = event => {
    const id = event.target.dataset.imageToShow
    document.querySelectorAll(".info").forEach(img => { img.style.display = "none" })
    document.getElementById(id).style.display = "block"
  }
})

// document.querySelectorAll(".scoreSelection").forEach(el => {
//   el.onclick = event => {
//     const id = event.target.dataset.imageToShow
//     document.querySelectorAll(".score").forEach(img => { img.style.display = "none" })
//     document.getElementById(id).style.display = "block"
//   }
// })

document.getElementById("AS").addEventListener("click", function() {
 // alert("Hello World!");
  document.getElementById("accessScore").style.display = "block";
  document.getElementById("bikeScore").style.display = "none";
  document.getElementById("walkScore").style.display = "none";

  document.getElementById("infoSwitch").style.display = "block";
  document.getElementById("infoSwitchBS").style.display = "none";
  document.getElementById("infoSwitchWS").style.display = "none";
  document.documentElement.style
  .setProperty('--popup-color', '#30958c');

  $('#BS').css({
    'color':'grey',
    'font-weight':'normal'
  });
  $('#WS').css({
    'color':'grey',
    'font-weight':'normal'
  });
  $('#AS').css({
    'color':'var(--theme-access)',
    'font-weight':'bold'
  });

  map.setLayoutProperty('stations', "visibility", "visible")
  map.setLayoutProperty('stationsB', "visibility", "none")
  map.setLayoutProperty('stationsW', "visibility", "none")
  map.setLayoutProperty('bs_limit', "visibility", "none")
  map.setLayoutProperty('ws_limit', "visibility", "none")
});

document.getElementById("BS").addEventListener("click", function() {
  // alert("Hello World!");
  document.getElementById("bikeScore").style.display = "block"
  document.getElementById("accessScore").style.display = "none"
  document.getElementById("walkScore").style.display = "none"

  document.getElementById("infoSwitchBS").style.display = "block"
  document.getElementById("infoSwitch").style.display = "none"
  document.getElementById("infoSwitchWS").style.display = "none"

 //  document.document.getElementsByClassName("station-popup").style.backgroundColor = "#f4a22d"
 // $('.station-popup').css('background-color', '#f4a22d');
  document.documentElement.style
    .setProperty('--popup-color', '#90D782');

  $('#AS').css({
    'color':'grey',
    'font-weight':'normal'
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
   map.setLayoutProperty('as_2mile', "visibility", "none")
   map.setLayoutProperty('ws_limit', "visibility", "none")
 });

 document.getElementById("WS").addEventListener("click", function() {
  // alert("Hello World!");
   document.getElementById("accessScore").style.display = "none"
   document.getElementById("bikeScore").style.display = "none"
   document.getElementById("walkScore").style.display = "block"

   document.getElementById("infoSwitchWS").style.display = "block"
   document.getElementById("infoSwitch").style.display = "none"
   document.getElementById("infoSwitchBS").style.display = "none"
   
   document.documentElement.style
   .setProperty('--popup-color', '#ad0074');
  
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
   map.setLayoutProperty('as_2mile', "visibility", "none")
   map.setLayoutProperty('bs_limit', "visibility", "none")
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
    var stationIDb = null;
    var stationIDw = null;
  
    // Create a popup, but don't add it to the map yet.
    let popup = new mapboxgl.Popup({
        className: "station-popup",
        closeButton: false,
        closeOnClick: false
        });

    map.on('click','stations', (e) => {
    //  console.log(stationID);
      stationID = e.features[0].properties.dvrpc_id;
      var props = e.features[0].properties;
      var coordinates = e.features[0].geometry.coordinates;
      handleStation(props,coordinates,map)   
      // When the mouse moves over the station layer, update the
      // feature state for the feature under the mouse
      if (stationID) {
        map.setFilter('as_2mile', ['==', 'dvrpc_id', stationID]);
        map.setLayoutProperty('as_2mile', 'visibility', 'visible');
      }
    });

    map.on('click','stationsB', (e) => {
     // console.log(stationIDb);
      stationIDb = e.features[0].properties.dvrpc_id;
      var props = e.features[0].properties;
      var coordinates = e.features[0].geometry.coordinates;
      handleStationB(props,coordinates,map)   
      
      if (stationIDb) {
        map.setFilter('bs_limit', ['==', 'dvrpc_id', stationIDb]);
        map.setLayoutProperty('bs_limit', 'visibility', 'visible');
      }
    });

    map.on('click','stationsW', (e) => {
      stationIDw = e.features[0].properties.dvrpc_id;
      var props = e.features[0].properties;
      var coordinates = e.features[0].geometry.coordinates;
      handleStationW(props,coordinates,map)  
      
      if (stationIDw) {
        map.setFilter('ws_limit', ['==', 'dvrpc_id', stationIDw]);
        map.setLayoutProperty('ws_limit', 'visibility', 'visible');
      }
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
   //   popup.addClassName('station-popup');
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
handleModal(modal, modalToggle, closeModal)
