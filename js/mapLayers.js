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
        'line-color': '#888',
        'line-opacity':.4,
        'line-width': 3
        }
    },
    AccessScore:{
        "id": "stations",
        "type": "circle",
        "source": "accessscore",
        "paint": {
        'circle-radius': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            7,4
        ],
        'circle-stroke-color': '#e5e5e5',
        'circle-stroke-width': .5,
        'circle-color': [
            'step',
            ['get', 'RS_FINAL'],
           // '#EE3224',
           '#d73027',
            3,
         //   '#F7911E',
         '#fc8d59',
            4,
         //   '#fee08b',
         '#fee090',
            5,
         //   '#FEE900',
         '#ffffbf',
            6,
         //   '#a6d96a',
         '#e0f3f8',
            7,
         //   '#1a9850',
         '#91bfdb',
            8,
        //    '#006837',
        '#4575b4',
            11,
            /* other */ '#ccc'
            ]
    }
    
}
}

export default layers
/*'circle-color': [
'step',
['get', 'point_count'],
'#51bbd6',
100,
'#f1f075',
750,
'#f28cb1'
],
/*if (i == 0) return "#991f31";
                if (i == 1) return "#60afa1";
                if (i == 2) return "#a6c834";
                if (i == 3) return "#006886";
                if (i == 4) return "#3b8448";
                if (i == 5) return "#db182e";
                if (i == 6) return "#e38225";
                if (i == 7) return "#e7c32a";
                if (i == 8) return "#9ab9a8";
                if (i == 9) return "#5d558b";
                else return "grey";
                */