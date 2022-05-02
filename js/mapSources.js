const sources = {
  boundaries: {
    type: "vector",
    url: "https://tiles.dvrpc.org/data/dvrpc-municipal.json",
  },
  crime: {
    type: "geojson",
    data: " https://phl.carto.com/api/v2/sql?q=SELECT+*+FROM+shootings+WHERE+year+BETWEEN+2016+AND+2021+&filename=shootings&format=geojson&skipfields=cartodb_id",
    generateId: true, //
  },
  high: {
    type: "geojson",
    data: "https://phl.carto.com/api/v2/sql?q=SELECT * FROM high_injury_network_2020&format=geojson&skipfields=cartodb_id",
    generateId: true, //
  },
  es: {
    type: "geojson",
    data: "https://arcgis.dvrpc.org/portal/rest/services/Planning/ETA_EssentialServicesPts/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=geojson",
    generateId: true, //
  },
  civic: {
    type: "geojson",
    data: "https://services1.arcgis.com/LWtWv6q6BJyKidj8/ArcGIS/rest/services/AccessScore/FeatureServer/10/query?where=1%3D1&outFields=*&outSR=4326&f=geojson",
    generateId: true, //
  },
  accessscore: {
    type: "geojson",
    data: "https://services1.arcgis.com/LWtWv6q6BJyKidj8/ArcGIS/rest/services/AccessScore/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=geojson",
    generateId: true, //
  },
  CycleScore: {
    type: "geojson",
    data: "https://services1.arcgis.com/LWtWv6q6BJyKidj8/ArcGIS/rest/services/AccessScore/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=geojson",
    generateId: true, //
  },
  WalkScore: {
    type: "geojson",
    data: "https://services1.arcgis.com/LWtWv6q6BJyKidj8/ArcGIS/rest/services/AccessScore/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=geojson",
    generateId: true, //
  },
  prail: {
    type: "geojson",
    data: "https://arcgis.dvrpc.org/portal/rest/services/Transportation/PassengerRail/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=geojson",
    generateId: true, //
  },
  as_2mile: {
    type: "geojson",
    data: "https://services1.arcgis.com/LWtWv6q6BJyKidj8/ArcGIS/rest/services/AccessScore/FeatureServer/8/query?where=1%3D1&outFields=*&outSR=4326&f=geojson",
    generateId: true, //
  },
  as_osm_limits: {
    type: "vector",
    url: "https://tiles.dvrpc.org/data/access-score.json",
  },
  bs_limit: {
    type: "vector",
    url: "https://tiles.dvrpc.org/data/access-score.json",
  },
  ws_limit: {
    type: "vector",
    url: "https://tiles.dvrpc.org/data/access-score.json",
  },
  sidewalk_inventory: {
    type: "vector",
    url: "https://tiles.dvrpc.org/data/pedestrian-network.json",
  },
  sidewalk_analysis: {
    type: "vector",
    url: "https://tiles.dvrpc.org/data/sidewalk-gaps-analysis-v2.json",
  },
  lts: {
    type: "vector",
    url: "https://tiles.dvrpc.org/data/lts.json",
  },
  nearmap: {
    type: "raster",
    tiles: [
      "https://api.nearmap.com/tiles/v3/Vert/{z}/{x}/{y}.png?apikey=NGE1ODI2NDMtYjk1Yi00ZWIxLTg4YWQtM2U0NGFmOTNjMDgy",
    ],
    tileSize: 256,
  },
  circuit_trails: {
    type: "geojson",
    data: "https://arcgis.dvrpc.org/portal/rest/services/Transportation/CircuitTrails/FeatureServer/0/query?where=circuit+%3D+%27Existing%27+or+circuit+%3D+%27In Progress%27&outFields=*&returnGeometry=true&geometryPrecision=8&outSR=4326&f=geojson",
    generateId: true, //
  },
  septa: {
    type: "geojson",
    data: "https://arcgis.dvrpc.org/portal/rest/services/Transportation/SEPTA_TransitRoutes/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&returnGeometry=true&f=geojson",
    generateId: true, //
  },
  njt: {
    type: "geojson",
    data: "https://arcgis.dvrpc.org/portal/rest/services/Transportation/NJTransit_TransitRoutes/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&returnGeometry=true&f=geojson",
    generateId: true, //
  },
  parks: {
    type: "vector",
    url: "https://tiles.dvrpc.org/data/open-space.json"
  },
  landuse15: {
    type: "vector",
    url: "https://tiles.dvrpc.org/data/dvrpc-landuse-2015.json"
  },
  population: {
    type: "geojson",
    // returnIdsOnly
    data: "https://services1.arcgis.com/LWtWv6q6BJyKidj8/ArcGIS/rest/services/AccessScore/FeatureServer/11/query?where=1%3D1&outFields=*&outSR=4326&returnGeometry=true&f=geojson",
  },
  emp: {
    type: "geojson",
    // returnIdsOnly
    data: "https://services1.arcgis.com/LWtWv6q6BJyKidj8/ArcGIS/rest/services/AccessScore/FeatureServer/11/query?where=1%3D1&outFields=*&outSR=4326&returnGeometry=true&f=geojson",
  },
  car: {
    type: "geojson",
    // returnIdsOnly
    data: "https://services1.arcgis.com/LWtWv6q6BJyKidj8/ArcGIS/rest/services/AccessScore/FeatureServer/11/query?where=1%3D1&outFields=*&outSR=4326&returnGeometry=true&f=geojson",
  },
  retail: {
    type: "geojson",
    // returnIdsOnly
    data: "https://services1.arcgis.com/LWtWv6q6BJyKidj8/ArcGIS/rest/services/Retail/FeatureServer/1/query?where=1%3D1&outFields=*&outSR=4326&returnGeometry=true&f=geojson",
  },
  retail2: {
    type: "geojson",
    // returnIdsOnly
    data: "https://services.arcgis.com/fLeGjb7u4uXqeF9q/arcgis/rest/services/CompleteStreetsTypesStndrds/FeatureServer/0/query?where=STREET_TYP+%3D+%27Walkable+Commercial+Corridors%27&outFields=*&outSR=4326&returnGeometry=true&f=geojson",
  },
  IPD: {
    type: "geojson",
    data: "https://arcgis.dvrpc.org/portal/rest/services/Demographics/IPD_2019/FeatureServer/0/query?where=u_tpopest+%3E+0&outFields=*&returnGeometry=true&outSR=4326&&f=geojson",
  },
  IPDno: {
    type: "geojson",
    data: "https://arcgis.dvrpc.org/portal/rest/services/Demographics/IPD_2019/FeatureServer/0/query?where=u_tpopest+%3C+0&outFields=*&returnGeometry=true&outSR=4326&&f=geojson",
  },
};

export default sources;
