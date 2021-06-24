const layers = {
    countyOutline: {
        "id": "county-outline",
        "type": "line",
        "source": "boundaries",
        "source-layer": "county",
        "paint": {
            'line-width': 2.5,
            'line-color': '#787878'
        },
        "filter": [
            "==",
            "dvrpc",
            "Yes"
        ]
    },
    muniOutline: {
        "id": "municipality-outline",
        "type": "line",
        "source": "boundaries",
        "source-layer": "municipalities",
        "layout": {
            "visibility":"none",
             },
        "paint": {
            'line-width': 0.5,
            'line-color': '#4a5c64'
        }
    },
    prail:{
        "id": "prail",
        "type": "line",
        "source": "prail",
        'layout': {
            'line-join': 'round',
            'line-cap': 'round'
            },
        'paint': {
        'line-color': '#f3eada',
        'line-opacity':.6,
        'line-width': 3
        }
    },
    AccessScore:{
        "id": "stations",
        "type": "circle",
        "source": "accessscore",
        "paint": {
        'circle-radius': 
        ['step', ['zoom'],
        ['case',['boolean', ['feature-state', 'hover'], false],6,4],
        10,
        ['case',['boolean', ['feature-state', 'hover'], false],8,6],
        13,
        ['case',['boolean', ['feature-state', 'hover'], false],10,7]],
      //  'circle-stroke-color': '#e5e5e5',
        'circle-stroke-color': '#fff',

        'circle-stroke-width': 1,
        'circle-color': [
            'step',
            ['get', 'AS_CAT'],
            // '#d73027',
            // 3,
            // '#fc8d59',
            // 4,
            // '#fee090',
            // 5,
            // '#ffffbf',
            // 6,
            // '#e0f3f8',
            // 7,
            // '#91bfdb',
            // 8,
            // '#4575b4',
            // 11,
            '#a50026',3,'#d73027',4,'#f46d43',5,'#fdae61',6,'#74add1',7,'#4575b4',8,'#313695',11,'#ccc'
        ]
        }
    }
}

export default layers