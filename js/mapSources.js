const sources = {  
    'boundaries': {
        type: 'vector',
        url: 'https://tiles.dvrpc.org/data/dvrpc-municipal.json'
    },
    'crime': {
        type:'geojson',
        data:' https://phl.carto.com/api/v2/sql?q=SELECT+*+FROM+shootings+WHERE+year+BETWEEN+2016+AND+2021+&filename=shootings&format=geojson&skipfields=cartodb_id',
        generateId: true //
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
        data:'https://services1.arcgis.com/LWtWv6q6BJyKidj8/ArcGIS/rest/services/AccessScore/FeatureServer/9/query?where=1%3D1&outFields=*&outSR=4326&f=geojson',
        generateId: true //
    },
    'as_osm_limits': {
        // type:'geojson',
        type:'vector',
        // data:'https://services1.arcgis.com/LWtWv6q6BJyKidj8/ArcGIS/rest/services/AccessScore/FeatureServer/3/query?where=1%3D1&outFields=*&outSR=4326&f=geojson',
        url:'https://tiles.dvrpc.org/data/access-score.json'
        // generateId: true //
    },
    'bs_limit': {
        // type:'geojson',
        // data:'https://services1.arcgis.com/LWtWv6q6BJyKidj8/ArcGIS/rest/services/AccessScore/FeatureServer/2/query?where=1%3D1&outFields=*&outSR=4326&f=geojson',
        // generateId: true //
        type:'vector',
        url:'https://tiles.dvrpc.org/data/access-score.json'
    },
    'ws_limit': {
        // type:'geojson',
        // data:'https://services1.arcgis.com/LWtWv6q6BJyKidj8/ArcGIS/rest/services/AccessScore/FeatureServer/1/query?where=1%3D1&outFields=*&outSR=4326&f=geojson',
        // generateId: true //
        type:'vector',
        url:'https://tiles.dvrpc.org/data/access-score.json'
    },
    'sidewalk_inventory': {
        type: "vector",
        url: "https://tiles.dvrpc.org/data/pedestrian-network.json",
      },
    'sidewalk_analysis': {
        type: "vector",
        url: "https://tiles.dvrpc.org/data/sidewalk-gaps-analysis-v2.json",
      },  
    'lts': {
        type: "vector",
        url: "https://tiles.dvrpc.org/data/lts.json",
      },
    'nearmap': {
        'type': 'raster',
        'tiles': [
        'https://api.nearmap.com/tiles/v3/Vert/{z}/{x}/{y}.png?apikey=NGE1ODI2NDMtYjk1Yi00ZWIxLTg4YWQtM2U0NGFmOTNjMDgy'    
         ],
        'tileSize': 256
    },
    'circuit_trails': {
        type:'geojson',
        data:'https://arcgis.dvrpc.org/portal/rest/services/Transportation/CircuitTrails/FeatureServer/0/query?where=circuit+%3D+%27Existing%27&outFields=*&returnGeometry=true&geometryPrecision=8&outSR=4326&f=geojson',
        generateId: true //    
    },
    'parks': {
        type:'geojson',
        // returnIdsOnly
        data:'https://arcgis.dvrpc.org/portal/rest/services/Planning/DVRPC_ProtectedOpenSpace/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&returnGeometry=true&f=geojson'  
    },
    'retail': {
        type:'geojson',
        // returnIdsOnly
        data:'https://services1.arcgis.com/LWtWv6q6BJyKidj8/ArcGIS/rest/services/Retail/FeatureServer/1/query?where=1%3D1&outFields=*&outSR=4326&returnGeometry=true&f=geojson'  
    },
    'IPD': {
        type:'geojson',
        data:"https://arcgis.dvrpc.org/portal/rest/services/Demographics/IPD_2018/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&returnGeometry=true&f=geojson" 
    },
}

export default sources