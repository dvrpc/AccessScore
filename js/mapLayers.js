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
            "visibility":"visible",
             },
        "paint": {
            'line-width': 0.5,
            'line-color': '#4a5c64'
        }
    },
    IPD: {
      id: "IPD",
      type: "fill",
      source: "IPD",
      paint: {
        "fill-color": [
          "interpolate",
          ["linear"],
          ["get", "ipd_score"],
          9,
          "#ffffd9",
          13,
          "#edf8b1",
          15,
          "#c7e9b4",
          17,
          "#7fcdbb",
          19,
          "#41b6c4",
          21,
          "#1d91c0",
          24,
          "#225ea8",
          27,
          "#253494",
          30,
          "#081d58"
        ],
        "fill-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          1,
          7,
          0.75
        ]
      },
      "layout": { "visibility": "none" }
    },
    parks: {
      "id": "parks",
      "type": "fill",
      "source": "parks",
      "paint": {
        "fill-color": "rgba( 134, 195, 25,  0.5)"
      },
      "layout": { "visibility": "none" }
    },
    transit_stops: {
      'id': 'transit_stops',
      'type': 'circle',
      'source': 'sidewalk_analysis',
      "source-layer": "transit_stops",
      // minzoom: 11,
      "layout": {
        "visibility":"none",
         },
      'paint': {
        'circle-radius': 2,
        'circle-stroke-color': '#ffc6af',
        'circle-stroke-width': .2,
        'circle-color':'#ffa17a'
      }
    },
    crime: {
      'id': 'crime',
      'type': 'circle',
      'source': 'crime',
      // minzoom: 11,
      "layout": {
        "visibility":"none",
         },
      'paint': {
        'circle-radius': 2,
        'circle-stroke-color': '#ffc6af',
        'circle-stroke-width': .2,
        'circle-color':'#ffa17a'
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
    sidewalks: {
      id: "sidewalks",
      type: "line",
      source: "sidewalk_inventory",
      layout: {
        // make layer none by default
        visibility: "none",
      },
      paint: {
        "line-width": 1.2,
        "line-color": "rgba(255,255,255,0.5)",
      },
      "source-layer": "ped_lines",
      filter: ["==", "line_type", 1],
    },
    crosswalks: {
      id: "crosswalks",
      type: "line",
      source: "sidewalk_inventory",
      layout: {
        // make layer visible by default
        visibility: "none",
      },
      // minzoom: 13,
      paint: {
        "line-width": 4,
        "line-color": "rgba(255,255,255,0.5)",
        // "line-dasharray": [1, 0.5]
      },
      "source-layer": "ped_lines",
      filter: ["==", "line_type", 2],
    },
    circuit_trails: {
        'id':'circuit_trails',
        'type':'line',
        'source':'circuit_trails',
        'layout':{'visibility': 'none'},
        'paint':{
        'line-width':1.5,
        'line-color':'#4fe314'
        }
    },  
    lts: {
      // existing_conditions_lts
      id: "lts",
      type: "line",
      source: "lts",
      layout: {
        // make layer visible by default
        visibility: "none",
      },
      minzoom: 11,
      paint: {
        "line-width": 1.5,
        "line-color": "rgba(249, 248, 113,0.7)",
        // "line-dasharray": [1, 0.5]
      },
      "source-layer": "existing_conditions_lts",
   //   filter: ["==", "lts_score", 3],
      filter: ['match', ['get', 'lts_score'], [3,4], true, false],
  }, 
  bikelane: {
    // existing_conditions_lts
    id: "bikelane",
    type: "line",
    source: "lts",
    layout: {
      // make layer visible by default
      visibility: "none",
    },
   // minzoom: 11,
    paint: {
      "line-width": 1.5,
      "line-color": "rgba(198,121, 246,0.7)",
      // "line-dasharray": [1, 0.5]
    },
    "source-layer": "existing_conditions_lts",
     filter: ["==", "bikefacili", 'Bike Lane'],
  //  filter: ['<>', ['get', 'bikefacili'], [""], true, false],
}, 
    as_2mile: {
        "id": "as_2mile",
        "type": "fill",
        "source": "as_2mile",
        "paint": {
          "fill-color": "rgba(48, 149, 140, 0.5)"
        },
        "layout": { "visibility": "none" }
      },
      as_osm_limits: {
        "id": "as_osm_limits",
        "type": "line",
        "source": "as_osm_limits",
        "source-layer": "as_osm_limits",
        'paint': {
        // 'line-color': '#30958c',
        'line-color': '#59AAA3',
        'line-opacity':.6,
        'line-width': 8},
        "layout": { 
         "visibility": "none",
         'line-join': 'round',
         'line-cap': 'round' }
      },
      bs_limit: {
        "id": "bs_limit",
        "type": "line",
        "source": "bs_limit",
        'paint': {
        'line-color': '#90d782',
        'line-opacity':.6,
        'line-width': 6},
        "layout": { 
         "visibility": "none",
         'line-join': 'round',
         'line-cap': 'round' }
      },
      ws_limit: {
        "id": "ws_limit",
        "type": "line",
        "source": "ws_limit",
        'paint': {
          // "fill-color": "rgba(173,0,116, 0.5)"
          'line-color': '#ad0073',
          'line-opacity':.6,
          'line-width': 4.5},
          "layout": { 
           "visibility": "none",
           'line-join': 'round',
           'line-cap': 'round' }
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
        'circle-stroke-color': '#fff',
        'circle-stroke-width': 1,
        'circle-color': [
            'step',
            ['get', 'AS_SCORE'],
            '#a50026',3,'#d73027',4,'#f46d43',5,'#fdae61',6,'#74add1',7,'#4575b4',8,'#313695',11,'#ccc'
        ]
        }
    },
    CycleScore:{
        "id": "stationsB",
        "type": "circle",
        "source": "CycleScore",
        "layout": {
            "visibility":"none",
        },
        "paint": {
        'circle-radius': 
        ['step', ['zoom'],
        ['case',['boolean', ['feature-state', 'hover'], false],6,4],
        10,
        ['case',['boolean', ['feature-state', 'hover'], false],8,6],
        13,
        ['case',['boolean', ['feature-state', 'hover'], false],10,7]],
        'circle-stroke-color': '#fff',
        'circle-stroke-width': 1,
        'circle-color': [
            'step',
            ['get', 'BS_SCORE'],
            '#a50026',3,'#d73027',4,'#f46d43',5,'#fdae61',6,'#74add1',7,'#4575b4',8,'#313695',11,'#ccc'
        ]
        }
    },
    WalkScore:{
        "id": "stationsW",
        "type": "circle",
        "source": "WalkScore",
        "layout": {
            "visibility":"none",
        },
        "paint": {
        'circle-radius': 
        ['step', ['zoom'],
        ['case',['boolean', ['feature-state', 'hover'], false],6,4],
        10,
        ['case',['boolean', ['feature-state', 'hover'], false],8,6],
        13,
        ['case',['boolean', ['feature-state', 'hover'], false],10,7]],
        'circle-stroke-color': '#fff',
        'circle-stroke-width': 1,
        'circle-color': [
            'step',
            ['get', 'WS_SCORE'],
            '#a50026',3,'#d73027',4,'#f46d43',5,'#fdae61',6,'#74add1',7,'#4575b4',8,'#313695',11,'#ccc'
        ]
        }
    }
}

export default layers