// Access Score CheckBox toggle
const togglerAS = (map) => {
document.getElementById("AS").addEventListener("click", function() {
  // handleStation(propsStation,corrdinatesStation,map)
  $("#bs_limit").prop("checked", false);
  $('#as_osm_limits').attr('checked', true); // Unchecks it
  $('#ws_limit').attr('checked', false); // Unchecks it
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
  // map.setFilter('as_2mile', ['==', 'dvrpc_id', active]);
})
};
// Bike Score CheckBox toggle
const togglerBS = (map) => {
  document.getElementById("BS").addEventListener("click", function() {
  $("#bs_limit").prop("checked", true);
  $('#as_osm_limits').attr('checked', false); // Unchecks it
  $('#ws_limit').attr('checked', false); // Unchecks it
  //storeStation()
  // console.log(active)
  // console.log(propsStation)
  // console.log(corrdinatesStation)
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
   //  map.setFilter('bs_limit', ['==', 'dvrpc_id', active]);
   // handleStationB(propsStation,corrdinatesStation,map)
   map.setLayoutProperty('stations', "visibility", "none")
   map.setLayoutProperty('stationsB', "visibility", "visible")
   map.setLayoutProperty('stationsW', "visibility", "none")
 })
};
 // Walk Score CheckBox toggle
 const togglerWS = (map) => {
 document.getElementById("WS").addEventListener("click", function() {
  // handleStationW(propsStation,corrdinatesStation,map)
  $("#bs_limit").prop("checked", false);
  $('#as_osm_limits').attr('checked', false); // Unchecks it
  $('#ws_limit').attr('checked', true); // Unchecks it
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
  //  map.setFilter('ws_limit', ['==', 'dvrpc_id', active]);
 })
};

// Home Page and Map interaction
//toggle Home and Map
const togglerHome = () => {
document.getElementById("homeLink").addEventListener("click", function() {
  document.getElementById("homeLink").style.display = "none"
  document.getElementById("mapLink").style.display = "block"
  document.getElementById("main").style.display = "flex"
  document.getElementById("sidebar").style.display = "none"
  document.getElementById("map").style.display = "none"
  document.getElementById("stationSearchForm").style.display = "none"
})
};  

//toggle Home and Map
const togglerMap = (map) => {
document.getElementById("mapLink").addEventListener("click", function() {
  document.getElementById("mapLink").style.display = "none"
  document.getElementById("homeLink").style.display = "block"
  document.getElementById("main").style.display = "none"
  document.getElementById("map").style.display = "block"
  document.getElementById("sidebar").style.display = "block"
  document.getElementById("stationSearchForm").style.display = "block"
  map.resize()
})
}; 
// toggle Home and Map Explore the Map Button
const togglerEAS = (map) => {
document.getElementById("EAS").addEventListener("click", function() {
  document.getElementById("mapLink").style.display = "none"
  document.getElementById("homeLink").style.display = "block"
  document.getElementById("main").style.display = "none"
  document.getElementById("map").style.display = "block"
  document.getElementById("sidebar").style.display = "block"
  document.getElementById("stationSearchForm").style.display = "block"
  map.resize()
})
}; 

 export { togglerHome, togglerMap, togglerEAS, togglerAS, togglerBS, togglerWS }