const handleStationB = function (props, coordinates, map) {
  //  var props = e.features[0].properties;

  var sName = "<h1>" + props.station + "</h1>";
  var info =
    "<small>" +
    props.line +
    "<span><img id='operatorLogo' src='./img/" +
    props.operator +
    ".png'/></span><br>" +
    // " ( "+props.operator +")</small><br>"+
    props.county +
    " County, " +
    props.state;
  ("</small>");
  document.getElementById("stationName").innerHTML = sName;
  document.getElementById("stationInfo").innerHTML = info;
  // '#a50026',3,'#d73027',4,'#f46d43',5,'#fdae61',6,'#74add1',7,'#4575b4',8,'#313695',11,'#ccc'

  if (props.AS_SCORE <= 2.99) {
    var color = "background:#a50026";
  } else if (props.AS_SCORE <= 3.99) {
    var color = "background:#d73027";
  } else if (props.AS_SCORE <= 4.99) {
    var color = "background:#f46d43";
  } else if (props.AS_SCORE <= 5.99) {
    var color = "background:#fdae61";
  } else if (props.AS_SCORE <= 6.99) {
    var color = "background:#74add1";
  } else if (props.AS_SCORE <= 7.99) {
    var color = "background:#4575b4";
  } else {
    var color = "background:#313695";
  }

  var accessScore =
    "<div class='odemeter' style=" +
    color +
    ">" +
    props.AS_SCORE +
    "</div><div class='odemter-text'>AccessScore</div>";
  // "<div id='accessScore' class='scoreSelection' value='accessScore'>Access Score</div>"
  document.getElementById("as-score").innerHTML = accessScore;

  if (props.CS_SCORE <= 2.99) {
    var color = "background:#a50026";
  } else if (props.CS_SCORE <= 3.99) {
    var color = "background:#d73027";
  } else if (props.CS_SCORE <= 4.99) {
    var color = "background:#f46d43";
  } else if (props.CS_SCORE <= 5.99) {
    var color = "background:#fdae61";
  } else if (props.CS_SCORE <= 6.99) {
    var color = "background:#74add1";
  } else if (props.CS_SCORE <= 7.99) {
    var color = "background:#4575b4";
  } else {
    var color = "background:#313695";
  }

  var bikeScore =
    "<div class='odemeter' style=" +
    color +
    ">" +
    props.CS_SCORE +
    "</div><div class='odemter-text'>CycleScore</div>";
  // "<div class='scoreSelection' value='bikeScore'>Cycle Score</div>"
  document.getElementById("bs-score").innerHTML = bikeScore;

  if (props.WS_SCORE <= 2.99) {
    var color = "background:#a50026";
  } else if (props.WS_SCORE <= 3.99) {
    var color = "background:#d73027";
  } else if (props.WS_SCORE <= 4.99) {
    var color = "background:#f46d43";
  } else if (props.WS_SCORE <= 5.99) {
    var color = "background:#fdae61";
  } else if (props.WS_SCORE <= 6.99) {
    var color = "background:#74add1";
  } else if (props.WS_SCORE <= 7.99) {
    var color = "background:#4575b4";
  } else {
    var color = "background:#313695";
  }

  var walkScore =
    "<div class='odemeter' style=" +
    color +
    ">" +
    props.WS_SCORE +
    "</div><div class='odemter-text'>PedestrianScore</div>";
  // "<div class='scoreSelection' value='walkScore'>Pedestrian Score</div>"
  document.getElementById("ws-score").innerHTML = walkScore;

  if (props.pos_sc_b == 1) {
    var POS = "> 2 mile";
  } else if (props.pos_sc_b == 2) {
    var POS = "> 1 mile";
  } else if (props.pos_sc_b == 3) {
    var POS = "1/2 mile - 1 mile";
  } else if (props.pos_sc_b == 4) {
    var POS = "<= 1/2 mile";
  } else if (props.pos_sc_b == 5) {
    var POS = "on/adjacent";
  } else {
    var POS = "";
  }

  if (props.wrc_sc_b == 1) {
    var WRC = "> 2 mile";
  } else if (props.wrc_sc_b == 2) {
    var WRC = "> 1 mile";
  } else if (props.wrc_sc_b == 3) {
    var WRC = "1/2 mile - 1 mile";
  } else if (props.wrc_sc_b == 4) {
    var WRC = "<= 1/2 mile";
  } else if (props.wrc_sc_b == 5) {
    var WRC = "on/adjacent";
  } else {
    var WRC = "";
  }

  var content1BS =
    "<div class='data-row'><span class='data-info'>Civic and Cultural Attractors </span><span class='data-value'> " +
    props.civ_sm_b +
    " resources</span></div>" +
    "<br><div class='data-row'><span class='data-info'>Employees (Nets 2015) within 1-mile of the station  </span><span class='data-value'> " +
    numeral(props.emp_sm_b).format("(0,0)") +
    " employees</span></div>" +
    "<br><div class='data-row'><span class='data-info'>Essential Services (ETA) </span><span class='data-value'> " +
    props.ess_sm_b +
    " services</span></div>" +
    "<br><div class='data-row'><span class='data-info'>Parks and Open Space </span><span class='data-value'> " +
    POS +
    "</span></div>" +
    "<br><div class='data-row'><span class='data-info'>Walkable Retail and Centers </span><span class='data-value'> " +
    WRC +
    "</span></div>";
  document.getElementById("dataMeasurementsBS1").innerHTML = content1BS;

  if (props.ipd_sc_b == 1) {
    var IPD = "well below average";
  } else if (props.ipd_sc_b == 2) {
    var IPD = "below average";
  } else if (props.ipd_sc_b == 3) {
    var IPD = "average";
  } else if (props.ipd_sc_b == 4) {
    var IPD = "above average";
  } else if (props.ipd_sc_b == 5) {
    var IPD = "well above average";
  } else {
    var IPD = "n/a";
  }

  var content2BS =
    "<div class='data-row'><span class='data-info'>Indicators of Potential Disadvantage </span><span class='data-value'> " +
    IPD +
    "</span></div>" +
    "<br><div class='data-row'><span class='data-info'>Population Density  </span><span class='data-value'> " +
    numeral(props.pop_sm_b).format("(0,0)") +
    " persons</span></div>" +
    "<br><div class='data-row'><span class='data-info'>Zero Vehicle Households</span><span class='data-value'> " +
    numeral(props.zvh_sm_b).format("(0,0)") +
    " households</span></div>";
  document.getElementById("dataMeasurementsBS2").innerHTML = content2BS;

  var content3BS =
    "<div class='data-row'><span class='data-info'>Non-Parking Boards </span><span class='data-value'> " +
    props.npb_npbp +
    "%</span></div>" +
    "<br><div class='data-row'><span class='data-info'>Percentage of Local Drivers </span><span class='data-value'> " +
    numeral(props.surv_cal_1).format("(0.00)") +
    "%</span></div>" +
    "<br><div class='data-row'><span class='data-info'>Transit Vehicle Volume</span><span class='data-value'> " +
    // props.tvv_sc +
    "<i>*values coming soon</i></span></div>";
  document.getElementById("dataMeasurementsBS3").innerHTML = content3BS;

  if (props.cir_sc_b == 1) {
    var CIR = "> 2 mile";
  } else if (props.cir_sc_b == 2) {
    var CIR = "> 1 mile";
  } else if (props.cir_sc_b == 3) {
    var CIR = "1/2 mile - 1 mile";
  } else if (props.cir_sc_b == 4) {
    var CIR = "<= 1/2 mile";
  } else if (props.cir_sc_b == 5) {
    var CIR = "on/adjacent";
  } else {
    var CIR = "";
  }

  var content4BS =
    "<div><table class='dataTable'>" +
    "<tr>" +
    "<th scope='col'></th>" +
    "<th scope='col'>AccessScore</th>" +
    "<th scope='col'>CycleScore</th>" +
    "<th scope='col'>PedestrainScore</th>" +
    "</tr>" +
    "<tr class='dataTable-row'>" +
    "<td class='data-info'>Circuit Trail Proximity</td>" +
    "<td class='data-value'>" +
    CIR_a +
    "</td>" +
    "<td class='data-value'>" +
    CIR_c +
    "</td>" +
    "<td class='data-value'>" +
    CIR_w +
    "</td>" +
    "</tr>" +
    "<tr class='dataTable-row'>" +
    "<td class='data-info'>Connectivity Score</td>" +
    "<td class='data-value'>" +
    numeral(props.int_va_a).format("(0.00)") +
    "</td>" +
    "<td class='data-value'>" +
    numeral(props.int_va_c).format("(0.00)") +
    "</td>" +
    "<td class='data-value'>" +
    numeral(props.int_va_w).format("(0.00)") +
    "</td>" +
    "</tr>" +
    "<tr class='dataTable-row'>" +
    "<td class='data-info'>Crashes (KSI from 2015-2019) </td>" +
    "<td class='data-value'>" +
    props.ksi_sm_a +
    " total ksi</td>" +
    "<td class='data-value'>" +
    props.ksi_bike_t +
    " bike ksi</td>" +
    "<td class='data-value'>" +
    props.ksi_ped_to +
    " ped ksi</td>" +
    "</tr>" +
    "<tr class='dataTable-row'>" +
    "<td class='data-info'>Low Stress Bike Shed </td>" +
    "<td class='data-value'>" +
    numeral(props.lts_va_a).format("(0.00)") +
    "</td>" +
    "<td class='data-value'>" +
    numeral(props.lts_va_c).format("(0.00)") +
    "</td>" +
    "<td class='data-value'>" +
    numeral(props.lts_va_w).format("(0.00)") +
    "</td>" +
    "</tr>" +
    "<tr class='dataTable-row'>" +
    "<td class='data-info2'>Walk Shed (linear miles)</td>" +
    "<td class='data-value2'>" +
    numeral(props.ped_va_a).format("(0.00)") +
    "</td>" +
    "<td class='data-value2'>" +
    numeral(props.ped_va_c).format("(0.00)") +
    "</td>" +
    "<td class='data-value2'>" +
    numeral(props.ped_va_w).format("(0.00)") +
    "</td>" +
    "</tr>" +
    "</table></div>";
  document.getElementById("dataMeasurementsBS4").innerHTML = content4BS;

  map.flyTo({
    // created a parameter that pulls the lat/long values from the geojson
    center: coordinates,
    speed: 0.7,
    zoom: 13,
  });

  // Chart 1 values
  var score1BS = [
    props.civ_sc_b,
    props.emp_sc_b,
    props.ess_sc_b,
    props.pos_sc_b,
    props.wrc_sc_b,
  ];
  var score2BS = [props.ipd_sc_b, props.pop_sc_b, props.zvh_sc_b];
  var score3BS = [props.npb_sc, props.lps_sc_b, props.tvv_sc];
  var score4BS = [
    props.cir_sc_b,
    props.int_sc_b,
    props.ksi_sc_b,
    props.lts_sc_b,
    props.ped_sc_b,
  ];

  updatebarChartBS(score1BS);
  updatebarChartBS2(score2BS);
  updatebarChartBS3(score3BS);
  updatebarChartBS4(score4BS);

  function updatebarChartBS(Values) {
    var options = {
      chart: {
        renderTo: "chartAS1",
        type: "bar",
        plotBackgroundColor: null,
        plotBorderWidth: 0, //null,
        plotShadow: false,
        height: 200,
        spacingLeft: 20,
        spacingRight: 20,
        backgroundColor: "#FFF",
        //  backgroundColor: '#EFEFEF'
      },
      colors: ["#90d782"],
      credits: {
        enabled: false,
      },
      title: {
        //  text: 'Bicycle Volume by Month',
        text: null,
        x: -20, //center
      },
      xAxis: {
        categories: [
          "Civic and Cultural Attractors",
          "Employees",
          "Essential Services (ETA)",
          "Parks and Open Space",
          "Walkable Retail and Centers",
        ],
        tickColor: "transparent",
        lineColor: "transparent",
        labels: { useHTML: true },
      },
      yAxis: {
        min: 0,
        max: 5,
        tickInterval: 1,
        height: 150,
        gridLineColor: "#90d782",
        title: {
          text: "",
        },
      },
      legend: {
        enabled: false,
      },
      tooltip: {
        enabled: false,
      },
      series: [
        {
          name: "Total",
          id: "Values",
          data: [],
        },
      ],
    };

    var Labels = [],
      counData = [];
    for (var i = 0; i < Values.length; i++) {
      counData.push({
        name: Labels[i],
        y: Values[i],
      });
    }
    options.series[0].data = counData;
    var chart = new Highcharts.Chart(options);
    //  $('.highcharts-xaxis-labels text, .highcharts-xaxis-labels span').click(function () {
    //      // console.log(this.textContent.split(' ')[0]);
    //        chart1Modal(this.textContent.split(' ')[0]);
    //  });
    //    console.log(bikeindata);
  }
  // Start Chart 2
  function updatebarChartBS2(Values) {
    var options = {
      chart: {
        renderTo: "chartAS2",
        type: "bar",
        plotBackgroundColor: null,
        plotBorderWidth: 0, //null,
        plotShadow: false,
        height: 130,
        spacingLeft: 20,
        spacingRight: 20,
        backgroundColor: "#FFF",
        //  backgroundColor: '#EFEFEF'
      },
      colors: ["#90d782"],
      credits: {
        enabled: false,
      },
      title: {
        //  text: 'Bicycle Volume by Month',
        text: null,
        x: -20, //center
      },
      xAxis: {
        categories: [
          "Indicators of Potential Disadvantage",
          "Population Density",
          "Zero Vehicle Households",
        ],
        tickColor: "transparent",
        lineColor: "transparent",
        labels: { useHTML: true },
      },
      yAxis: {
        min: 0,
        max: 5,
        tickInterval: 1,
        height: 80,
        gridLineColor: "#90d782",
        title: {
          text: "",
        },
      },
      legend: {
        enabled: false,
      },
      tooltip: {
        enabled: false,
      },
      series: [
        {
          name: "Total",
          id: "Values",
          data: [],
        },
      ],
    };

    var Labels = [],
      counData = [];
    for (var i = 0; i < Values.length; i++) {
      counData.push({
        name: Labels[i],
        y: Values[i],
      });
    }
    options.series[0].data = counData;
    var chart = new Highcharts.Chart(options);
    // $('.highcharts-xaxis-labels text, .highcharts-xaxis-labels span').click(function () {
    //     // console.log(this.textContent.split(' ')[0]);
    //       chart1Modal(this.textContent.split(' ')[0]);
    // });
    //    console.log(bikeindata);
  }
  // EndChart 2
  // Start Chart 3
  function updatebarChartBS3(Values) {
    var options = {
      chart: {
        renderTo: "chartBS3",
        type: "bar",
        plotBackgroundColor: null,
        plotBorderWidth: 0, //null,
        plotShadow: false,
        height: 130,
        spacingLeft: 20,
        spacingRight: 20,
        backgroundColor: "#FFF",
        //  backgroundColor: '#EFEFEF'
      },
      colors: ["#90d782"],
      credits: {
        enabled: false,
      },
      title: {
        //  text: 'Bicycle Volume by Month',
        text: null,
        x: -20, //center
      },
      xAxis: {
        categories: [
          "Non-Parking Boards",
          "Percentage of Local Drivers",
          "Transit Vehicle Volume",
        ],
        tickColor: "transparent",
        lineColor: "transparent",
        labels: { useHTML: true },
      },
      yAxis: {
        min: 0,
        max: 5,
        tickInterval: 1,
        height: 80,
        gridLineColor: "#90d782",
        title: {
          text: "",
        },
      },
      legend: {
        enabled: false,
      },
      tooltip: {
        enabled: false,
      },
      series: [
        {
          name: "Total",
          id: "Values",
          data: [],
        },
      ],
    };

    var Labels = [],
      counData = [];
    for (var i = 0; i < Values.length; i++) {
      counData.push({
        name: Labels[i],
        y: Values[i],
      });
    }
    options.series[0].data = counData;
    var chart = new Highcharts.Chart(options);
    // $('.highcharts-xaxis-labels text, .highcharts-xaxis-labels span').click(function () {
    //     // console.log(this.textContent.split(' ')[0]);
    //       chart1Modal(this.textContent.split(' ')[0]);
    // });
    //    console.log(bikeindata);
  }
  // EndChart 3
  // Start Chart 3
  function updatebarChartBS4(Values) {
    var options = {
      chart: {
        renderTo: "chartBS4",
        type: "bar",
        plotBackgroundColor: null,
        plotBorderWidth: 0, //null,
        plotShadow: false,
        height: 200,
        spacingLeft: 20,
        spacingRight: 20,
        backgroundColor: "#FFF",
        //  backgroundColor: '#EFEFEF'
      },
      colors: ["#90d782"],
      credits: {
        enabled: false,
      },
      title: {
        //  text: 'Bicycle Volume by Month',
        text: null,
        x: -20, //center
      },
      xAxis: {
        categories: [
          "Circuit Trail Proximity",
          "Connectivity Score",
          "Crashes",
          "Low Stress Bike Shed",
          "Walk Shed",
        ],
        tickColor: "transparent",
        lineColor: "transparent",
        labels: { useHTML: true },
      },
      yAxis: {
        min: 0,
        max: 5,
        tickInterval: 1,
        height: 150,
        gridLineColor: "#73ac68",
        title: {
          text: "",
        },
      },
      legend: {
        enabled: false,
      },
      tooltip: {
        enabled: false,
      },
      series: [
        {
          name: "Total",
          id: "Values",
          data: [],
        },
      ],
    };

    var Labels = [],
      counData = [];
    for (var i = 0; i < Values.length; i++) {
      counData.push({
        name: Labels[i],
        y: Values[i],
      });
    }
    options.series[0].data = counData;
    var chart = new Highcharts.Chart(options);
    // $('.highcharts-xaxis-labels text, .highcharts-xaxis-labels span').click(function () {
    //     // console.log(this.textContent.split(' ')[0]);
    //       chart1Modal(this.textContent.split(' ')[0]);
    // });
    //    console.log(bikeindata);
  }
  // EndChart 4
};
export default handleStationB;
