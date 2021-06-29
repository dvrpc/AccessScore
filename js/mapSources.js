const sources = {  
    'boundaries': {
        type: 'vector',
        url: 'https://tiles.dvrpc.org/data/dvrpc-municipal.json'
    },
    'accessscore': {
        type:'geojson',
        data:'https://services1.arcgis.com/LWtWv6q6BJyKidj8/ArcGIS/rest/services/AccessScore/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=geojson',
        generateId: true //
    },
    'CycleScore': {
        type:'geojson',
        data:'https://services1.arcgis.com/LWtWv6q6BJyKidj8/ArcGIS/rest/services/AccessScore/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=geojson',
        generateId: true //
    },
    'WalkScore': {
        type:'geojson',
        data:'https://services1.arcgis.com/LWtWv6q6BJyKidj8/ArcGIS/rest/services/AccessScore/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=geojson',
        generateId: true //
    },
    'prail': {
        type:'geojson',
        data:'https://arcgis.dvrpc.org/portal/rest/services/Transportation/PassengerRail/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=geojson',
        generateId: true //
    },
    'as_2mile': {
        type:'geojson',
        data:'https://services1.arcgis.com/LWtWv6q6BJyKidj8/ArcGIS/rest/services/AccessScore/FeatureServer/3/query?where=1%3D1&outFields=*&outSR=4326&f=geojson',
        generateId: true //
    },
    'bs_limit': {
        type:'geojson',
        data:'https://services1.arcgis.com/LWtWv6q6BJyKidj8/ArcGIS/rest/services/AccessScore/FeatureServer/2/query?where=1%3D1&outFields=*&outSR=4326&f=geojson',
        generateId: true //
    },
    'ws_limit': {
        type:'geojson',
        data:'https://services1.arcgis.com/LWtWv6q6BJyKidj8/ArcGIS/rest/services/AccessScore/FeatureServer/1/query?where=1%3D1&outFields=*&outSR=4326&f=geojson',
        generateId: true //
    },
    sidewalk_inventory: {
        type: "vector",
        url: "https://tiles.dvrpc.org/data/pedestrian-network.json",
      },
    'nearmap': {
        'type': 'raster',
        // use the tiles option to specify a WMS tile source URL
        // https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/
        'tiles': [
      //  'https://img.nj.gov/imagerywms/Natural2015?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=Natural2015'
        'https://api.nearmap.com/tiles/v3/Vert/{z}/{x}/{y}.png?apikey=NGE1ODI2NDMtYjk1Yi00ZWIxLTg4YWQtM2U0NGFmOTNjMDgy'    
         ],
        'tileSize': 256
    },
    'circuit_trails': {
        type:'geojson',
        data:'https://arcgis.dvrpc.org/portal/rest/services/Transportation/CircuitTrails/FeatureServer/0/query?where=circuit+%3D+%27Existing%27&outFields=*&returnGeometry=true&geometryPrecision=8&outSR=4326&f=geojson',
        generateId: true //    
    },
}

export default sources