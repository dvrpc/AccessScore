import makeMap from './map.js'
import sources from './mapSources.js'
import layers from './mapLayers.js'
import handleModal from './modal.js'
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

  
    const handleStation = function (props,coordinates,map) {
         //   var props = e.features[0].properties;
           // console.log(props.STATION);

    var info =
    "<div id='stationName'><h3 style='margin-top:0;'>" +
    props.station +
    "<small> - "+
    props.line+
    "</span><span><img id='operatorLogo' src='./img/" +
    props.operator +
    ".png'/></span><br>"+
    props.county +
    "<span></span> County, <span>" +
    props.state +
    "</span></small></h3></div>"+
    "</div>" 
    ;
    document.getElementById("stationName").innerHTML = info;
    var content = "<div class='data-row'><span class='data-info'>Civic and Cultural Attractors </span><span class='data-value'> " +
      props.civic_cnt +
      "</span></div>" +
      "<br><div class='data-row'><span class='data-info'>Parks and Open Space </span><span class='data-value'> " +
      props.park_score +
      "</span></div>" +
      "<br><div class='data-row'><span class='data-info'>Walkable Retail and Centers </span><span class='data-value'> " +
      props.retail_sco +
      "</span></div>" +
      "<br><div class='data-row'><span class='data-info'>Essential Services (ETA) </span><span class='data-value'> " +
      props.eta_cnt +
      "</span></div>" +
      "<br><div class='data-row'><span class='data-info'>Employees (Nets 2015) within 1-mile of the station  </span><span class='data-value'> " +
      numeral(props.emp_sum).format("(0,0)") +
      "</span></div>" 
      ;
    document.getElementById("dataMeasurements").innerHTML = content;
           
    map.flyTo({
    // created a parameter that pulls the lat/long values from the geojson
    center: coordinates,
    speed: 0.7,
    zoom: 13,
    });

    // Start Bar Charts 
    function EXTODdraw(value) {
      alert("modal goes here");
    //    $('#EXTODModal').one('shown.bs.modal', function() {
    //    $('#EXTODTabs a[data-target="#' + value + '"]').tab('show'); }).modal('show');
    //    $('#FTODPModal').modal('close');
    }

    // Chart 1 values
      var score1 = [
      props.civic_scor,
      props.park_score,
      props.retail_sco,
      props.eta_score,
      props.employee_s 
      ];
      updatebarChart(score1);

      function updatebarChart(Values) {
          var options = {
              chart: {
                  renderTo: 'chart1',
                  type:'bar',
                  plotBackgroundColor: null,
                  plotBorderWidth: 0,//null,
                  plotShadow: false,
                  height:200,
                  spacingLeft: 25,
                  spacingRight: 60,
                  backgroundColor: '#FFF'
                //  backgroundColor: '#EFEFEF'
              },
                colors: ['#b16eb7']
              ,
              credits: {
                  enabled: false
              },
              title: {
                //  text: 'Bicycle Volume by Month',
                text:null,
                  x: -20 //center
              },
              xAxis: {
                  categories: [ 'Civic and Cultural Attractors','Parks and Open Space','Walkable Retail and Centers','Essential Services (ETA)','Employees'],
                  tickColor: 'transparent',
                  lineColor: 'transparent',
                  labels: {useHTML: true}
              },
              yAxis: {
                  min: 0,
                  max:5,
                  tickInterval: 1,
                  height: 150,
                  gridLineColor: "#8C3095",
                  title: {
                      text: ''
                  }
              },
              legend: {
                  enabled: false
              },
        /*      credits: {
                  position: {
                      align: 'left',
                      x: 5,
                      y: -5 // position of credits
                  },
                  text: 'click category name for description',
                  href: null
      
              },
        */      tooltip: {
                  enabled: false
              },
              series: [{
                      name:'Total',
                      id: 'Values',
                      data: []
                  }]
          };
      
          var Labels = [],
          counData = [];
          for (var i = 0; i < Values.length; i++){
          counData.push({
          name: Labels[i],
          y: Values[i]})
          }
          options.series[0].data = counData;
          var chart = new Highcharts.Chart(options)
      
          $('.highcharts-xaxis-labels text, .highcharts-xaxis-labels span').click(function () {
              // console.log(this.textContent.split(' ')[0]);
                EXTODdraw(this.textContent.split(' ')[0]);
          });
        //    console.log(bikeindata);
          }
      }

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
