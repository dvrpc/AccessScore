const handleStationW = function (props,coordinates,map) {
    //  var props = e.features[0].properties;

    var sName =
    "<h1>" +
    props.station +
    "</h1>" 
    ;

    var info =
    "<small>"+
    props.line +
    "<span><img id='operatorLogo' src='./img/" +
    props.operator +
    ".png'/></span><br>"+
    // " ( "+props.operator +")</small><br>"+
    props.county +
    " County, " +
    props.state 
    "</small>" 
    ;
    document.getElementById("stationName").innerHTML = sName;
    document.getElementById("stationInfo").innerHTML = info;
   // '#a50026',3,'#d73027',4,'#f46d43',5,'#fdae61',6,'#74add1',7,'#4575b4',8,'#313695',11,'#ccc'
   
    if (props.AS_SCORE <= 2.99) {
        var color = 'background:#a50026';
      } else if (props.AS_SCORE <= 3.99){
        var color = 'background:#d73027';
    } else if (props.AS_SCORE <= 4.99){
        var color = 'background:#f46d43';
    } else if (props.AS_SCORE <= 5.99){
        var color = 'background:#fdae61';
    } else if (props.AS_SCORE <= 6.99){
        var color = 'background:#74add1';
    } else if (props.AS_SCORE <= 7.99){
        var color = 'background:#4575b4';
    } else {
        var color = 'background:#313695';
      }

    var accessScore = "<div class='odemeter' style="+ color +">"+ props.AS_SCORE+ "</div><div class='odemter-text'>AccessScore</div>"
    // "<div id='accessScore' class='scoreSelection' value='accessScore'>Access Score</div>"
    document.getElementById("as-score").innerHTML = accessScore;

    if (props.CS_SCORE <= 2.99) {
        var color = 'background:#a50026';
      } else if (props.CS_SCORE <= 3.99){
        var color = 'background:#d73027';
    } else if (props.CS_SCORE <= 4.99){
        var color = 'background:#f46d43';
    } else if (props.CS_SCORE <= 5.99){
        var color = 'background:#fdae61';
    } else if (props.CS_SCORE <= 6.99){
        var color = 'background:#74add1';
    } else if (props.CS_SCORE <= 7.99){
        var color = 'background:#4575b4';
    } else {
        var color = 'background:#313695';
      }

    var bikeScore = "<div class='odemeter' style="+ color +">"+ props.CS_SCORE+ "</div><div class='odemter-text'>CycleScore</div>"
    // "<div class='scoreSelection' value='bikeScore'>Cycle Score</div>"
    document.getElementById("bs-score").innerHTML = bikeScore;

    if (props.WS_SCORE <= 2.99) {
        var color = 'background:#a50026';
      } else if (props.WS_SCORE <= 3.99){
        var color = 'background:#d73027';
    } else if (props.WS_SCORE <= 4.99){
        var color = 'background:#f46d43';
    } else if (props.WS_SCORE <= 5.99){
        var color = 'background:#fdae61';
    } else if (props.WS_SCORE <= 6.99){
        var color = 'background:#74add1';
    } else if (props.WS_SCORE <= 7.99){
        var color = 'background:#4575b4';
    } else {
        var color = 'background:#313695';
      }

    var walkScore = "<div class='odemeter' style="+ color +">"+ props.WS_SCORE+ "</div><div class='odemter-text'>PedestrianScore</div>"
    // "<div class='scoreSelection' value='walkScore'>Pedestrian Score</div>"
    document.getElementById("ws-score").innerHTML = walkScore;

    if (props.pos_sc_w == 1) {
        var POS= '> 2 mile';
    } else  if (props.pos_sc_w == 2) {
        var POS= '> 1 mile';
    } else  if (props.pos_sc_w == 3) {
        var POS= '1/2 mile - 1 mile';
    } else  if (props.pos_sc_w == 4) {
        var POS= '<= 1/2 mile';
    } else  if (props.pos_sc_w == 5) {
        var POS= 'on/adjacent';
    } else {
        var POS = '';
    }

    if (props.wrc_sc_w == 1) {
        var WRC= '> 2 mile';
    } else  if (props.wrc_sc_w == 2) {
        var WRC = '> 1 mile';
    } else  if (props.wrc_sc_w == 3) {
        var WRC = '1/2 mile - 1 mile';
    } else  if (props.wrc_sc_w == 4) {
        var WRC = '<= 1/2 mile';
    } else  if (props.wrc_sc_w == 5) {
        var WRC = 'on/adjacent';
    } else {
        var WRC = '';
    }

    var content1WS = "<div class='data-row'><span class='data-info'>Civic and Cultural Attractors </span><span class='data-value'> " +
    props.civ_sm_w +
    " resources</span></div>" +
    "<br><div class='data-row'><span class='data-info'>Employees (Nets 2015) within 1-mile of the station  </span><span class='data-value'> " +
    numeral(props.emp_sm_w).format("(0,0)") +
    " employees</span></div>"+ 
    "<br><div class='data-row'><span class='data-info'>Essential Services (ETA) </span><span class='data-value'> " +
    props.ess_sm_w +
    " services</span></div>" +
    "<br><div class='data-row'><span class='data-info'>Parks and Open Space </span><span class='data-value'> " +
    POS +
    "</span></div>" +
    "<br><div class='data-row'><span class='data-info'>Walkable Retail and Centers </span><span class='data-value'> " +
    WRC +
    "</span></div>" 
    ;
    document.getElementById("dataMeasurementsWS1").innerHTML = content1WS;

    if (props.ipd_sc_w == 1) {
        var IPD = 'well below average';
    } else  if (props.ipd_sc_w == 2) {
        var IPD = 'below average';
    } else  if (props.ipd_sc_w == 3) {
        var IPD = 'average';
    } else  if (props.ipd_sc_w == 4) {
        var IPD = 'above average';
    } else  if (props.ipd_sc_w == 5) {
        var IPD = 'well above average';
    } else {
        var IPD = 'n/a';
    }

    var content2WS = "<div class='data-row'><span class='data-info'>Indicators of Potential Disadvantage </span><span class='data-value'> " +
    IPD +
    "</span></div>" +
    "<br><div class='data-row'><span class='data-info'>Population Density  </span><span class='data-value'> " +
    numeral(props.pop_sm_w).format("(0,0)") +
    " persons</span></div>"+ 
    "<br><div class='data-row'><span class='data-info'>Zero Vehicle Households</span><span class='data-value'> " +
    numeral(props.zvh_sm_w).format("(0,0)") +
    " households</span></div>" 
    ;
    document.getElementById("dataMeasurementsWS2").innerHTML = content2WS;

    var content3WS = "<div class='data-row'><span class='data-info'>Non-Parking Boards </span><span class='data-value'> " +
    props.npb_npbp  +
    "%</span></div>" +
    "<br><div class='data-row'><span class='data-info'>Percentage of Local Drivers </span><span class='data-value'> " +
    numeral(props.surv_cal_2).format("(0.00)") +
    "%</span></div>"+ 
    "<br><div class='data-row'><span class='data-info'>Transit Vehicle Volume</span><span class='data-value'> " +
    // props.tvv_sc +
    "<i>*values coming soon</i></span></div>" 
    ;
    document.getElementById("dataMeasurementsWS3").innerHTML = content3WS;

    if (props.cir_sc_w == 1) {
        var CIR= '> 2 mile';
    } else  if (props.cir_sc_w == 2) {
        var CIR = '> 1 mile';
    } else  if (props.cir_sc_w == 3) {
        var CIR = '1/2 mile - 1 mile';
    } else  if (props.cir_sc_w == 4) {
        var CIR = '<= 1/2 mile';
    } else  if (props.cir_sc_w == 5) {
        var CIR = 'on/adjacent';
    } else {
        var CIR = '';
    }

    var content4WS = "<div class='data-row'><span class='data-info'>Circuit Trail Proximity </span><span class='data-value'> " +
    CIR +
    "</span></div>" +
    "<br><div class='data-row'><span class='data-info'>Connectivity Score </span><span class='data-value'> " +
    numeral(props.int_va_w).format("(0.00)") +
    "</span></div>"+ 
    "<br><div class='data-row'><span class='data-info'>Crashes (KSI from 2015-2019) </span><span class='data-value'> " +
    props.ksi_sm_w +
    " total ksi ("+
    props.ksi_bike_2+
    " bike ksi/"+
    props.ksi_ped__2+
    " ped ksi)</span></div>" +
    "<br><div class='data-row'><span class='data-info'>Low Stress Bike Shed </span><span class='data-value'> " +
    numeral(props.lts_va_w).format("(0.00)") +
    " linear miles</span></div>" +
    "<br><div class='data-row'><span class='data-info'>Walk Shed </span><span class='data-value'> " +
    numeral(props.ped_va_w).format("(0.00)") +
    " linear miles</span></div>" 
    ;
    document.getElementById("dataMeasurementsWS4").innerHTML = content4WS;
        
    map.flyTo({
    // created a parameter that pulls the lat/long values from the geojson
    center: coordinates,
    speed: 0.7,
    zoom: 13,
    });

    // Start Bar Charts 
    // function chart1Modal(value) {
    // alert("modal goes here");
    // //    $('#EXTODModal').one('shown.bs.modal', function() {
    // //    $('#EXTODTabs a[data-target="#' + value + '"]').tab('show'); }).modal('show');
    // //    $('#FTODPModal').modal('close');
    // }

    // Chart 1 values
    var score1WS = [props.civ_sc_w,props.emp_sc_w,props.ess_sc_w, props.pos_sc_w,props.wrc_sc_w];
    var score2WS = [props.ipd_sc_w,props.pop_sc_w,props.zvh_sc_w];
    var score3WS = [props.npb_sc,props.lps_sc_w,props.tvv_sc];
    var score4WS = [props.cir_sc_w,props.int_sc_w,props.ksi_sc_w, props.lts_sc_w,props.ped_sc_w];

    updatebarChartWS(score1WS);
    updatebarChartWS2(score2WS);
    updatebarChartWS3(score3WS);
    updatebarChartWS4(score4WS);

    function updatebarChartWS(Values) {
     var options = {
         chart: {
             renderTo: 'chartWS1',
             type:'bar',
             plotBackgroundColor: null,
             plotBorderWidth: 0,//null,
             plotShadow: false,
             height:200,
             spacingLeft: 20,
             spacingRight: 20,
             backgroundColor: '#FFF'
           //  backgroundColor: '#EFEFEF'
         },
           colors: ['#ad0074']
         ,
         credits: {
             enabled: false
         },
         title: {
           //  text: 'Bicycle Volume by Month',
           text:null,
             x: -20 //center
         },
         xAxis: {
             categories: [ 'Civic and Cultural Attractors','Employees','Essential Services (ETA)','Parks and Open Space','Walkable Retail and Centers'],
             tickColor: 'transparent',
             lineColor: 'transparent',
             labels: {useHTML: true}
         },
         yAxis: {
             min: 0,
             max:5,
             tickInterval: 1,
             height: 150,
             gridLineColor: "#ad0074",
             title: {
                 text: ''
             }
         },
         legend: {
             enabled: false
         },
         tooltip: {
             enabled: false
         },
         series: [{
                 name:'Total',
                 id: 'Values',
                 data: []
             }]
    };
 
     var Labels = [],
     counData = [];
     for (var i = 0; i < Values.length; i++){
     counData.push({
     name: Labels[i],
     y: Values[i]})
     }
     options.series[0].data = counData;
     var chart = new Highcharts.Chart(options)
    //  $('.highcharts-xaxis-labels text, .highcharts-xaxis-labels span').click(function () {
    //      // console.log(this.textContent.split(' ')[0]);
    //        chart1Modal(this.textContent.split(' ')[0]);
    //  });
   //    console.log(bikeindata);
     }
 // Start Chart 2
 function updatebarChartWS2(Values) {
    var options = {
        chart: {
            renderTo: 'chartWS2',
            type:'bar',
            plotBackgroundColor: null,
            plotBorderWidth: 0,//null,
            plotShadow: false,
            height:130,
            spacingLeft: 20,
            spacingRight: 20,
            backgroundColor: '#FFF'
          //  backgroundColor: '#EFEFEF'
        },
          colors: ['#ad0074']
        ,
        credits: {
            enabled: false
        },
        title: {
          //  text: 'Bicycle Volume by Month',
          text:null,
            x: -20 //center
        },
        xAxis: {
            categories: [ 'Indicators of Potential Disadvantage','Population Density','Zero Vehicle Households'],
            tickColor: 'transparent',
            lineColor: 'transparent',
            labels: {useHTML: true}
        },
        yAxis: {
            min: 0,
            max:5,
            tickInterval: 1,
            height: 80,
            gridLineColor: "#ad0074",
            title: {
                text: ''
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            enabled: false
        },
        series: [{
                name:'Total',
                id: 'Values',
                data: []
            }]
   };

    var Labels = [],
    counData = [];
    for (var i = 0; i < Values.length; i++){
    counData.push({
    name: Labels[i],
    y: Values[i]})
    }
    options.series[0].data = counData;
    var chart = new Highcharts.Chart(options)
    // $('.highcharts-xaxis-labels text, .highcharts-xaxis-labels span').click(function () {
    //     // console.log(this.textContent.split(' ')[0]);
    //       chart1Modal(this.textContent.split(' ')[0]);
    // });
  //    console.log(bikeindata);
    }    
     // EndChart 2
  // Start Chart 3
  function updatebarChartWS3(Values) {
    var options = {
        chart: {
            renderTo: 'chartWS3',
            type:'bar',
            plotBackgroundColor: null,
            plotBorderWidth: 0,//null,
            plotShadow: false,
            height:130,
            spacingLeft: 20,
            spacingRight: 20,
            backgroundColor: '#FFF'
          //  backgroundColor: '#EFEFEF'
        },
          colors: ['#ad0074']
        ,
        credits: {
            enabled: false
        },
        title: {
          //  text: 'Bicycle Volume by Month',
          text:null,
            x: -20 //center
        },
        xAxis: {
            categories: [ 'Non-Parking Boards','Percentage of Local Drivers','Transit Vehicle Volume'],
            tickColor: 'transparent',
            lineColor: 'transparent',
            labels: {useHTML: true}
        },
        yAxis: {
            min: 0,
            max:5,
            tickInterval: 1,
            height: 80,
            gridLineColor: "#ad0074",
            title: {
                text: ''
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            enabled: false
        },
        series: [{
                name:'Total',
                id: 'Values',
                data: []
            }]
   };

    var Labels = [],
    counData = [];
    for (var i = 0; i < Values.length; i++){
    counData.push({
    name: Labels[i],
    y: Values[i]})
    }
    options.series[0].data = counData;
    var chart = new Highcharts.Chart(options)
    // $('.highcharts-xaxis-labels text, .highcharts-xaxis-labels span').click(function () {
    //     // console.log(this.textContent.split(' ')[0]);
    //       chart1Modal(this.textContent.split(' ')[0]);
    // });
  //    console.log(bikeindata);
    }    
     // EndChart 3
       // Start Chart 3
  function updatebarChartWS4(Values) {
    var options = {
        chart: {
            renderTo: 'chartWS4',
            type:'bar',
            plotBackgroundColor: null,
            plotBorderWidth: 0,//null,
            plotShadow: false,
            height:200,
            spacingLeft: 20,
            spacingRight: 20,
            backgroundColor: '#FFF'
          //  backgroundColor: '#EFEFEF'
        },
          colors: ['#ad0074']
        ,
        credits: {
            enabled: false
        },
        title: {
          //  text: 'Bicycle Volume by Month',
          text:null,
            x: -20 //center
        },
        xAxis: {
            categories: [ 'Circuit Trail Proximity','Connectivity Score','Crashes','Low Stress Bike Shed','Walk Shed'],
            tickColor: 'transparent',
            lineColor: 'transparent',
            labels: {useHTML: true}
        },
        yAxis: {
            min: 0,
            max:5,
            tickInterval: 1,
            height: 150,
            gridLineColor: "#ad0074",
            title: {
                text: ''
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            enabled: false
        },
        series: [{
                name:'Total',
                id: 'Values',
                data: []
            }]
   };

    var Labels = [],
    counData = [];
    for (var i = 0; i < Values.length; i++){
    counData.push({
    name: Labels[i],
    y: Values[i]})
    }
    options.series[0].data = counData;
    var chart = new Highcharts.Chart(options)
    // $('.highcharts-xaxis-labels text, .highcharts-xaxis-labels span').click(function () {
    //     // console.log(this.textContent.split(' ')[0]);
    //       chart1Modal(this.textContent.split(' ')[0]);
    // });
  //    console.log(bikeindata);
    }    
     // EndChart 4
       
 }
 export default handleStationW