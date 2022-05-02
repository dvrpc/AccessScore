var bike_value = ["Bike Lane", "Protected Bike Lane", "Buffered Bike Lane"];
var park_type = ["Municipal","State","County","Federal"];

let popColor = ['interpolate',['linear'],
['get', 'u_tpopest'],
40, '#DFEFFB',
2659, '#A6CFE1',
3565,'#4D9DC0',
4415, '#0078AE',
5585, '#004E76'
]; 

let empColor = ['interpolate',['linear'],
['get', 'EMP15'],
49, '#dadaeb',
671, '#bcbddc',
1043, '#9e9ac8',
1673, '#756bb1',
2829, '#54278f'
]; 

let carColor = ['interpolate',['linear'],
['get', 'ZeroCarHH'],
9, '#ffffd4',
66, '#fed98e',
87, '#fe9929',
109, '#d95f0e',
137, '#993404'
]; 

const catchment = {
  as_osm_limits: {
    id: "as_osm_limits",
    type: "line",
    source: "as_osm_limits",
    "source-layer": "as_osm_limits",
    paint: {
      "line-color": "#3bb8ad",
      "line-opacity": 0.8,
      "line-width": {
        base: 9,
        stops: [
          [10, 1],
          [12, 2],
          [13, 3.5],
        ],
      },
    },
    layout: {
      visibility: "none",
      "line-join": "round",
      "line-cap": "round",
    },
  },
  bs_limit: {
    id: "bs_limit",
    type: "line",
    source: "bs_limit",
    "source-layer": "cycle_lowstress_limits",
    paint: {
      "line-color": "#Df73FF",
      "line-opacity": 0.8,
      "line-width": {
        base: 9,
        stops: [
          [10, 1],
          [12, 2],
          [13, 3.1],
        ],
      },
    },
    layout: {
      visibility: "none",
      "line-join": "round",
      "line-cap": "round",
    },
  },
  ws_limit: {
    id: "ws_limit",
    type: "line",
    source: "ws_limit",
    "source-layer": "walk_pednetwork_limits",
    paint: {
      // Orange
      "line-color": "#efa801",
      "line-opacity": 0.8,
      "line-width": {
        base: 9,
        stops: [
          [10, 1],
          [12, 2],
          [13, 3],
        ],
      },
    },
    layout: {
      visibility: "none",
      "line-join": "round",
      "line-cap": "round",
    },
  },
  stationSelect: {
    id: "stationSelect",
    type: "circle",
    source: "accessscore",
    paint: {
      "circle-opacity": 0,
      "circle-radius": [
        "step",
        ["zoom"],
        ["case", ["boolean", ["feature-state", "hover"], false], 8, 6],
        10,
        ["case", ["boolean", ["feature-state", "hover"], false], 10, 8],
        13,
        ["case", ["boolean", ["feature-state", "hover"], false], 12, 9],
      ],
      "circle-stroke-color": "#ffe100",
      "circle-stroke-width": 3,
    },
    layout: {
      visibility: "none",
    },
  },
};

const layers = {
  countyOutline: {
    id: "county-outline",
    type: "line",
    source: "boundaries",
    "source-layer": "county",
    paint: {
      "line-width": 2.5,
      "line-color": "#787878",
    },
    filter: ["==", "dvrpc", "Yes"],
  },
  muniOutline: {
    id: "municipality-outline",
    type: "line",
    source: "boundaries",
    "source-layer": "municipalities",
    layout: {
      visibility: "visible",
    },
    paint: {
      "line-width": 0.5,
      "line-color": "#4a5c64",
    },
  },
  transit_stops: {
    id: "transit_stops",
    type: "circle",
    source: "sidewalk_analysis",
    "source-layer": "transit_stops",
    // minzoom: 11,
    layout: {
      visibility: "none",
    },
    paint: {
      // 'circle-radius': 2,
      "circle-stroke-color": "#f2e5c0",
      "circle-stroke-width": 1,
      "circle-color": "#e0c063",
      "circle-radius": {
        base: 9,
        stops: [
          [10, 1],
          [13, 2],
          [15, 4],
        ],
      },
    },
  },
  crime: {
    id: "crime",
    type: "circle",
    source: "crime",
    // minzoom: 11,
    layout: {
      visibility: "none",
    },
    paint: {
      // 'circle-radius': 2,
      "circle-stroke-color": "#ffc6af",
      "circle-stroke-width": 0.2,
      "circle-color": "#c70c4d",
      "circle-radius": {
        base: 9,
        stops: [
          [10, 1],
          [13, 2],
          [15, 4],
        ],
      },
    },
  },
  es: {
    id: "es",
    type: "circle",
    source: "es",
    // minzoom: 11,
    layout: {
      visibility: "none",
    },
    paint: {
      "circle-stroke-color": "#3C4C34",
      "circle-stroke-width": 0.5,
      "circle-color": "#c8ffaf",
      "circle-radius": {
        base: 9,
        stops: [
          [10, 2],
          [12, 2.5],
          [13, 3.5],
          [14, 4],
          [15, 4.4],
        ],
      },
    },
  },
  civic: {
    id: "civic",
    type: "circle",
    source: "civic",
    // minzoom: 11,
    layout: {
      visibility: "none",
    },
    paint: {
      "circle-stroke-color": "#000",
      "circle-stroke-width": 0.5,
      "circle-color": "#66FFFF",
      "circle-radius": {
        base: 9,
        stops: [
          [10, 2],
          [12, 2.5],
          [13, 3.5],
          [14, 4],
          [15, 4.4],
        ],
      },
    },
  },
  prail: {
    id: "prail",
    type: "line",
    source: "prail",
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": "#f3eada",
      "line-opacity": 0.6,
      "line-width": 3,
    },
  },
  septa: {
    id: "septa",
    type: "line",
    source: "septa",
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": "#e0c063",
      "line-opacity": 0.6,
      "line-width": 1.5,
    },
    layout: { visibility: "none" },
  },
  njt: {
    id: "njt",
    type: "line",
    source: "njt",
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": "#e0c063",
      "line-opacity": 0.6,
      "line-width": 1.5,
    },
    layout: { visibility: "none" },
  },
  high: {
    id: "high",
    type: "line",
    source: "high",
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": "#fa78b9",
      "line-opacity": 0.6,
      "line-width": 1.5,
    },
    layout: { visibility: "none" },
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
      // "line-width": 1.2,
      // "line-color": "rgba(255,255,255,0.5)",
      "line-color": "rgba(254,252,247,0.7)",
      "line-width": {
        base: 9,
        stops: [
          [10, 1],
          [12, 1.5],
          [13, 2],
          [15, 3.5],
        ],
      },
    },
    "source-layer": "ped_lines",
    filter: ["==", "line_type", 1],
  },
  crosswalks: {
    id: "crosswalks",
    type: "line",
    source: "sidewalk_inventory",
    "source-layer": "ped_lines",
    filter: ["==", "line_type", 2],
    layout: {
      // make layer visible by default
      visibility: "none",
    },
    // minzoom: 13,
    paint: {
      // "line-width": 4,
      "line-color": "rgba(254,252,247,0.5)",
      "line-width": {
        base: 9,
        stops: [
          [10, 1],
          [12, 2],
          [13, 5],
        ],
      },
      // "line-dasharray": [1, 0.5]
    },
  },
  circuit_trails: {
    id: "circuit_trails",
    type: "line",
    source: "circuit_trails",
    layout: { visibility: "none" },
    paint: {
      "line-width": 1.5,
      "line-color": "#4fe314",
    },
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
    // minzoom: 11,
    paint: {
      "line-width": 1.5,
      "line-color": "rgba(249, 248, 113,0.7)",
      // "line-dasharray": [1, 0.5]
    },
    "source-layer": "existing_conditions_lts",
    //   filter: ["==", "lts_score", 3],
    filter: ["match", ["get", "lts_score"], [3, 4], true, false],
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
      "line-color": "rgba(255, 161, 122,0.7)",
      // hex #FFA17A
      // "line-dasharray": [1, 0.5]
    },
    "source-layer": "existing_conditions_lts",
    //  filter: ["==", "bikefacili", 'Bike Lane'],
    filter: ["match", ["get", "bikefacili"], bike_value, true, false],
    //  filter: ['<>', ['get', 'bikefacili'], [""], true, false],
  },
  as_2mile: {
    id: "as_2mile",
    type: "fill",
    source: "as_2mile",
    paint: {
      // "fill-color": "rgba(48, 149, 140, 0.5)"
      "fill-color": "rgba( 245, 245, 245, 0.1)",
    },
    layout: { visibility: "none" },
  },
  AccessScore: {
    id: "stations",
    type: "circle",
    source: "accessscore",
    paint: {
      "circle-radius": [
        "step",
        ["zoom"],
        ["case", ["boolean", ["feature-state", "hover"], false], 6, 4],
        10,
        ["case", ["boolean", ["feature-state", "hover"], false], 8, 6],
        13,
        ["case", ["boolean", ["feature-state", "hover"], false], 10, 7],
      ],
      "circle-stroke-color": "#fff",
      "circle-stroke-width": 1,
      "circle-color": [
        "step",
        ["get", "AS_SCORE"],
        "#a50026",
        3,
        "#d73027",
        4,
        "#f46d43",
        5,
        "#fdae61",
        6,
        "#74add1",
        7,
        "#4575b4",
        8,
        "#313695",
        11,
        "#ccc",
      ],
    },
  },
  CycleScore: {
    id: "stationsB",
    type: "circle",
    source: "CycleScore",
    layout: {
      visibility: "none",
    },
    paint: {
      "circle-radius": [
        "step",
        ["zoom"],
        ["case", ["boolean", ["feature-state", "hover"], false], 6, 4],
        10,
        ["case", ["boolean", ["feature-state", "hover"], false], 8, 6],
        13,
        ["case", ["boolean", ["feature-state", "hover"], false], 10, 7],
      ],
      "circle-stroke-color": "#fff",
      "circle-stroke-width": 1,
      "circle-color": [
        "step",
        ["get", "CS_SCORE"],
        "#a50026",
        3,
        "#d73027",
        4,
        "#f46d43",
        5,
        "#fdae61",
        6,
        "#74add1",
        7,
        "#4575b4",
        8,
        "#313695",
        11,
        "#ccc",
      ],
    },
  },
  WalkScore: {
    id: "stationsW",
    type: "circle",
    source: "WalkScore",
    layout: {
      visibility: "none",
    },
    paint: {
      "circle-radius": [
        "step",
        ["zoom"],
        ["case", ["boolean", ["feature-state", "hover"], false], 6, 4],
        10,
        ["case", ["boolean", ["feature-state", "hover"], false], 8, 6],
        13,
        ["case", ["boolean", ["feature-state", "hover"], false], 10, 7],
      ],
      "circle-stroke-color": "#fff",
      "circle-stroke-width": 1,
      "circle-color": [
        "step",
        ["get", "WS_SCORE"],
        "#a50026",
        3,
        "#d73027",
        4,
        "#f46d43",
        5,
        "#fdae61",
        6,
        "#74add1",
        7,
        "#4575b4",
        8,
        "#313695",
        11,
        "#ccc",
      ],
    },
  },
  Buildings: {
    id: "Buildings",
    source: "composite",
    minzoom: 7,
    "source-layer": "building",
    filter: ["==", "extrude", "true"],
    type: "fill-extrusion",
    //  'minzoom': 14,
    paint: {
      "fill-extrusion-color": "#aaa",
      "fill-extrusion-height": [
        "interpolate",
        ["linear"],
        ["zoom"],
        15,
        0,
        15.05,
        ["get", "height"],
      ],
      "fill-extrusion-base": [
        "interpolate",
        ["linear"],
        ["zoom"],
        15,
        0,
        15.05,
        ["get", "min_height"],
      ],
      "fill-extrusion-opacity": 0.6,
    },
  },
};
const baselayerPolygons = {
  retail: {
    id: "retail",
    type: "fill",
    source: "retail",
    paint: {
      "fill-color": "rgba(156, 157, 240, 0.7)",
      // hex #9C9DF0
    },
    layout: { visibility: "none" },
  },
  retail2: {
    id: "retail2",
    type: "line",
    source: "retail2",
    paint: {
      "line-width": 3,
      "line-color": "rgba(156, 157, 240,0.6)",
    },
    layout: { visibility: "none" },
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
        "#081d58",
      ],
      "fill-opacity": ["interpolate", ["linear"], ["zoom"], 7, 1, 18, 0.75],
    },
    layout: { visibility: "none" },
  },
  IPDno: {
    id: "IPDno",
    type: "fill",
    source: "IPDno",
    paint: {
      "fill-color": "rgba( 110,110,110,  0.5)",
      "fill-opacity": ["interpolate", ["linear"], ["zoom"], 7, 1, 18, 0.75],
    },
    layout: { visibility: "none" },
  },
  parks: {
    id: "parks",
    type: "fill",
    source: "parks",
    paint: {
      "fill-color": "rgba( 134, 195, 25,  0.5)",
    },
    layout: { visibility: "none" },
    "source-layer": "open_space",
    filter: ["match", ["get", "os_type"], park_type , true, false],
  },
  population: {
    id: "population",
    type: "fill",
    source: "population",
    paint: {
      "fill-color": popColor,
      "fill-opacity": [
        "interpolate",
        ["linear"],
        ["zoom"],
        9,
        0.8,
        11,
        0.6
      ]
    },
    layout: { visibility: "none" }
  },
  emp: {
    id: "emp",
    type: "fill",
    source: "emp",
    paint: {
      "fill-color": empColor,
      "fill-opacity": [
        "interpolate",
        ["linear"],
        ["zoom"],
        9,
        0.8,
        11,
        0.6
      ]
    },
    layout: { visibility: "none" }
  },
  car: {
    id: "car",
    type: "fill",
    source: "car",
    paint: {
      "fill-color": carColor,
      "fill-opacity": [
        "interpolate",
        ["linear"],
        ["zoom"],
        9,
        0.8,
        11,
        0.6
      ]
    },
    layout: { visibility: "none" }
  },
  landuse15: {
    id: "landuse15",
    type: "fill",
    source: "landuse15",
    "source-layer": "lu2015",
    paint: {
      "fill-color": [
        "step",
        ["to-number", ["get", "lu15sub"]],
        "rgb(255, 255, 0)",
        3000,
        "rgb(194,158,215)",
        4000,
        "rgb(104,104,104)",
        5000,
        "rgb(255,190,190)",
        6000,
        "rgb(255,0,0)",
        7000,
        "rgb(190,232,255)",
        8000,
        "rgb(0,132,168)",
        9000,
        "rgb(230,230,0)",
        10000,
        "rgb(215,215,158)",
        11000,
        "rgb(168,0,0)",
        12000,
        "rgb(76,230,0)",
        13000,
        "rgb(0,197,255)",
        14000,
        "rgb(165,245,122)"
      ],
      "fill-opacity": [
        "interpolate",
        ["linear"],
        ["zoom"],
        0,
        1,
        7,
        0.9,
        9,
        0.6,
        11,
        0.35
      ]
    },
    layout: { visibility: "none" },
  },
};

const nearMap = {
  nearMap: {
    id: "nearmap",
    type: "raster",
    source: "nearmap",
    paint: {},
    layout: { visibility: "none" },
  },
};

export { catchment, layers, baselayerPolygons, nearMap };
