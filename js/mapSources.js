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
}

export default sources