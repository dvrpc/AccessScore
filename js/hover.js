let popup = new mapboxgl.Popup({
  className: "hover-popup",
  closeButton: false,
  closeOnClick: false,
});

const wire_single_layer = (map, layername) => {
  /**
   * For the provided layername, set the cursor to use a
   * pointer when hovering, and return to normal cursor when
   * you move the mouse away
   *
   * @param {mapboxgl.Map} map - The map object for the page
   * @param {string} layername - The name of the layer to assign the functionality to
   */

  // change mouse tip to pointer finger
  map.on(
    "mouseenter",
    layername,
    () => (map.getCanvas().style.cursor = "pointer")
  );

  // change mouse tip upon leaving feature
  map.on("mouseleave", layername, function (e) {
    map.getCanvas().style.cursor = "";
  });
};

const wire_mouse_hover = (map) => {
  /**
   * Show interactivity tooltip hints for all layers defined within
   *
   * @param {mapboxgl.Map} map - The map object for the page
   */
  var layers = [
    "transit_stops",
    "es",
    "septa",
    "njt",
    "circuit_trails",
    "IPD",
    "IPDno",
    "landuse15",
  ];

  layers.forEach((lyr) => wire_single_layer(map, lyr));

  // // Add popup when hovering
  // map.on("mouseenter", "prail", function (e) {
  //   var props = e.features[0].properties;
  //   var msg = "<h3>" + props.line_name + "</h3>";
  // popup.setLngLat(e.lngLat).setHTML(msg).addTo(map);
  // });

  // // change mouse tip upon leaving feature
  // map.on("mouseleave", "prail", function (e) {
  // popup.remove();
  // });

  map.on("mouseenter", "transit_stops", function (e) {
    var coordinates = e.features[0].geometry.coordinates.slice();
    var props = e.features[0].properties;
    var msg = "<h3>" + props.stop_name + "</h3>";
    popup.setLngLat(coordinates).setHTML(msg).addTo(map);
  });

  // change mouse tip upon leaving feature
  map.on("mouseleave", "transit_stops", function (e) {
    popup.remove();
  });

  map.on("mouseenter", "es", function (e) {
    var coordinates = e.features[0].geometry.coordinates.slice();
    var props = e.features[0].properties;
    var msg = "<h3>" + props.name + "</h3>";
    popup.setLngLat(coordinates).setHTML(msg).addTo(map);
  });

  // change mouse tip upon leaving feature
  map.on("mouseleave", "es", function (e) {
    popup.remove();
  });

  map.on("mouseenter", "septa", function (e) {
    var props = e.features[0].properties;
    var msg = "<h3>" + props.linename + "</h3>";
    popup.setLngLat(e.lngLat).setHTML(msg).addTo(map);
  });

  // change mouse tip upon leaving feature
  map.on("mouseleave", "septa", function (e) {
    popup.remove();
  });

  map.on("mouseenter", "njt", function (e) {
    var props = e.features[0].properties;
    var msg = "<h3>" + props.line + "</h3>";
    popup.setLngLat(e.lngLat).setHTML(msg).addTo(map);
  });

  // change mouse tip upon leaving feature
  map.on("mouseleave", "njt", function (e) {
    popup.remove();
  });

  map.on("mouseenter", "circuit_trails", function (e) {
    var props = e.features[0].properties;
    var msg = "<h3>" + props.name + "</h3>";
    popup.setLngLat(e.lngLat).setHTML(msg).addTo(map);
  });

  // change mouse tip upon leaving feature
  map.on("mouseleave", "circuit_trails", function (e) {
    popup.remove();
  });

  map.on("mouseenter", "IPD", function (e) {
    var props = e.features[0].properties;
    var msg = "<h3>" + props.ipd_class + "(" + props.ipd_score + ")</h3>";
    popup.setLngLat(e.lngLat).setHTML(msg).addTo(map);
  });

  //change mouse tip upon leaving feature
  map.on("mouseleave", "IPD", function (e) {
    popup.remove();
  });

  map.on("mouseenter", "IPDno", function (e) {
    // var props = e.features[0].properties;
    var msg = "<h3>No Data</h3>";
    popup.setLngLat(e.lngLat).setHTML(msg).addTo(map);
  });

  //change mouse tip upon leaving feature
  map.on("mouseleave", "IPDno", function (e) {
    popup.remove();
  });
  map.on("mouseenter", "landuse15", function (e) {
    // var props = e.features[0].properties;
    var msg = "<h3>No Data</h3>";
    popup.setLngLat(e.lngLat).setHTML(msg).addTo(map);
  });

  //change mouse tip upon leaving feature
  map.on("mouseleave", "landuse15", function (e) {
    popup.remove();
  });
};

export { wire_mouse_hover };
