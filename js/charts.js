const handleStation = function (props,coordinates,map) {
    //  var props = e.features[0].properties;
//  if( document.getElementById("accessScore").style.display = "block") {
//   alert("display not available");
// }

    var info =
    "<h1 style='margin-bottom: 13px;'>" +
    props.station +
    "</h1><small>  "+
    props.line +
    "<span><img id='operatorLogo' src='./img/" +
    props.operator +
    ".png'/></span><br>"+
    " ( "+props.operator +")</small><br>"+
    props.county +
    " County, " +
    props.state 
    "</small></div>" 
    ;
    document.getElementById("stationName").innerHTML = info;
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

    var accessScore = "<div class='odemeter' style="+ color +">"+ props.AS_SCORE+"</div><div class='odemter-text'>AccessScore</div>"
    // "<div id='accessScore' class='scoreSelection' value='accessScore'>Access Score</div>"
    document.getElementById("as-score").innerHTML = accessScore;

    if (props.BS_SCORE <= 2.9) {
        var color = 'background:#a50026';
      } else if (props.BS_SCORE <= 3.99){
        var color = 'background:#d73027';
    } else if (props.BS_SCORE <= 4.9){
        var color = 'background:#f46d43';
    } else if (props.BS_SCORE <= 5.9){
        var color = 'background:#fdae61';
    } else if (props.BS_SCORE <= 6.9){
        var color = 'background:#74add1';
    } else if (props.BS_SCORE <= 7.9){
        var color = 'background:#4575b4';
    } else {
        var color = 'background:#313695';
      }

    var bikeScore = "<div class='odemeter' style="+ color +">"+ props.BS_SCORE+ "</div><div class='odemter-text'>CycleScore</div>"
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

    let lookup = {
        0: "> 2 mile",
        1: "> 2 mile",
        2: "> 1 mile",
        3: "1/2 mile - 1 mile",
        4:"<= 1/2 mile",
        5:"on/adjacent"
    }

    let POS_a = lookup[props.pos_sc_a];
    let POS_b = lookup[props.pos_sc_b];
    let POS_w = lookup[props.pos_sc_w];
    let WRC_a = lookup[props.wrc_sc_a];
    let WRC_b = lookup[props.wrc_sc_b];
    let WRC_w = lookup[props.wrc_sc_w];
    let CIR_a = lookup[props.cir_sc_a];
    let CIR_b = lookup[props.cir_sc_b];
    let CIR_w = lookup[props.cir_sc_w];

    var content1b = "<div><table class='dataTable'>" 
        +"<tr>"
        + "<th scope='col'></th>"
        +"<th scope='col'>AccessScore</th>"
        +"<th scope='col'>CycleScore</th>"
        +"<th scope='col'>PedestrianScore</th>"
        +"</tr>"
        +"<tr class='dataTable-row'>"
        + "<td class='data-info'>Civic and Cultural Attractors</td>"
        + "<td class='data-value'>"+ props.civ_sm_a +"</td>"
        + "<td class='data-value'>"+ props.civ_sm_b +"</td>"
        +"<td class='data-value'>"+ props.civ_sm_w +"</td>"
        +"</tr>"
        +"<tr class='dataTable-row'>"
        + "<td class='data-info'>Employees</td>"
        +"<td class='data-value'>"+numeral(props.emp_sm_a).format("(0,0)") +"</td>"
        +"<td class='data-value'>"+numeral(props.emp_sm_b).format("(0,0)") +"</td>"
        +"<td class='data-value'>"+numeral(props.emp_sm_w).format("(0,0)") +"</td>"
        +"</tr>"
        +"<tr class='dataTable-row'>"
        +"<td class='data-info'>Essential Services (ETA)</td>"
        +"<td class='data-value'>"+props.ess_sm_a +"</td>"
        +"<td class='data-value'>"+props.ess_sm_b +"</td>"
        +"<td class='data-value'>"+props.ess_sm_w +"</td>"
        +"</tr>"
        +"<tr class='dataTable-row'>"
        +"<td class='data-info'>Parks and Open Space</td>"
        +"<td class='data-value'>"+POS_a+"</td>"
        +"<td class='data-value'>"+POS_b+"</td>"
        +"<td class='data-value'>"+POS_w+"</td>"
        +"</tr>"
        +"<tr class='dataTable-row'>"
        +"<td class='data-info2'>Walkable Retail and Centers</td>"
        +"<td class='data-value2'>"+WRC_a+"</td>"
        +"<td class='data-value2'>"+WRC_b+"</td>"
        +"<td class='data-value2'>"+WRC_w+"</td>"
        +"</tr>"
        +"</table></div>";
    document.getElementById("dataMeasurements1b").innerHTML = content1b; 

    let lookupIPD = {
        0: "n/a",
        1: "well below average",
        2: "below average",
        3: "average",
        4:"above average",
        5:"well above average"
    }
    let IPD_a = lookupIPD[props.ipd_sc_a]; 

    var content2 = "<div><table class='dataTable'>" 
    +"<tr>"
    + "<th scope='col'></th>"
    +"<th scope='col'>Access Score</th>"
    +"<th scope='col'>Cycle Score</th>"
    +"<th scope='col'>Pedestrain Score</th>"
    +"</tr>"
    +"<tr class='dataTable-row'>"
    + "<td class='data-info'>Indicators of Potential Disadvantage</td>"
    + "<td class='data-value'>"+ props.ipd_sc_a +"</td>"
    + "<td class='data-value'>"+ props.ipd_sc_b +"</td>"
    +"<td class='data-value'>"+ props.ipd_sc_w+"</td>"
    +"</tr>"
    +"<tr class='dataTable-row'>"
    +"<td class='data-info'>Population Density</td>"
    +"<td class='data-value'>"+numeral(props.pop_sm_a).format("(0,0)") +"</td>"
    +"<td class='data-value'>"+numeral(props.pop_sm_b).format("(0,0)") +"</td>"
    +"<td class='data-value'>"+numeral(props.pop_sm_w).format("(0,0)") +"</td>"
    +"</tr>"
    +"<tr class='dataTable-row'>"
    +"<td class='data-info2'>Zero Vehicle Households</td>"
    +"<td class='data-value'>"+numeral(props.zvh_sm_a).format("(0,0)") +"</td>"
    +"<td class='data-value'>"+numeral(props.zvh_sm_b).format("(0,0)") +"</td>"
    +"<td class='data-value'>"+numeral(props.zvh_sm_w).format("(0,0)") +"</td>"
    +"</tr>"
    +"</table></div>";
    document.getElementById("dataMeasurements2").innerHTML = content2;

    var content3 = "<div><table class='dataTable'>" 
    +"<tr>"
    + "<th scope='col'></th>"
    +"<th scope='col'>Access Score</th>"
    +"<th scope='col'>Cycle Score</th>"
    +"<th scope='col'>Pedestrain Score</th>"
    +"</tr>"
    +"<tr class='dataTable-row'>"
    + "<td class='data-info'>Non-Parking Boards</td>"
    + "<td class='data-value'>"+numeral(props.npb_npbp).format("(0,0)") +"</td>"
    + "<td class='data-value'>"+ numeral(props.npb_npbp).format("(0,0)")+"</td>"
    + "<td class='data-value'>"+ numeral(props.npb_npbp).format("(0,0)") +"</td>"
    +"</tr>"
    +"<tr class='dataTable-row'>"
    +"<td class='data-info'>Percentage of Local Drivers</td>"
    +"<td class='data-value'>"+numeral(props.lps_va_a).format("0.0%") +"</td>"
    +"<td class='data-value'>"+numeral(props.lps_va_b).format("0.0%") +"</td>"
    +"<td class='data-value'>"+numeral(props.lps_va_w).format("0.0%") +"</td>"
    +"</tr>"
    +"<tr class='dataTable-row'>"
    +"<td class='data-info2'>Transit Vehicle Volume</td>"
    +"<td class='data-value'>Coming Soon</td>"
    +"<td class='data-value'>Coming Soon</td>"
    +"<td class='data-value'>Coming Soon</td>"
    +"</tr>"
    +"</table></div>";
    document.getElementById("dataMeasurements3").innerHTML = content3;

    var content4 = "<div><table class='dataTable'>" 
    +"<tr>"
    + "<th scope='col'></th>"
    +"<th scope='col'>Access Score</th>"
    +"<th scope='col'>Cycle Score</th>"
    +"<th scope='col'>Pedestrain Score</th>"
    +"</tr>"
    +"<tr class='dataTable-row'>"
    + "<td class='data-info'>Circuit Trail Proximity</td>"
    + "<td class='data-value'>"+ CIR_a +"</td>"
    + "<td class='data-value'>"+ CIR_b +"</td>"
    +"<td class='data-value'>"+ CIR_w +"</td>"
    +"</tr>"
    +"<tr class='dataTable-row'>"
    + "<td class='data-info'>Connectivity Score</td>"
    +"<td class='data-value'>"+ numeral(props.int_va_a).format("(0.00)") +"</td>"
    +"<td class='data-value'>"+ numeral(props.int_va_b).format("(0.00)") +"</td>"
    +"<td class='data-value'>"+ numeral(props.int_va_w).format("(0.00)") +"</td>"
    +"</tr>"
    +"<tr class='dataTable-row'>"
    +"<td class='data-info'>Crashes (KSI from 2015-2019) </td>"
    +"<td class='data-value'>"+  props.ksi_sm_a +" total ksi</td>"
    +"<td class='data-value'>"+props.ksi_bike_t +" bike ksi</td>"
    +"<td class='data-value'>"+ props.ksi_ped_to +" ped ksi</td>"
    +"</tr>"
    +"<tr class='dataTable-row'>"
    +"<td class='data-info'>Low Stress Bike Shed </td>"
    +"<td class='data-value'>"+ numeral(props.lts_va_a).format("(0.00)")+"</td>"
    +"<td class='data-value'>"+ numeral(props.lts_va_b).format("(0.00)")+"</td>"
    +"<td class='data-value'>"+ numeral(props.lts_va_w).format("(0.00)")+"</td>"
    +"</tr>"
    +"<tr class='dataTable-row'>"
    +"<td class='data-info2'>Walk Shed (linear miles)</td>"
    +"<td class='data-value2'>"+  numeral(props.ped_va_a).format("(0.00)") +"</td>"
    +"<td class='data-value2'>"+  numeral(props.ped_va_b).format("(0.00)") +"</td>"
    +"<td class='data-value2'>"+  numeral(props.ped_va_w).format("(0.00)") +"</td>"
    +"</tr>"
    +"</table></div>";
    document.getElementById("dataMeasurements4").innerHTML = content4;
        
    map.flyTo({
    // created a parameter that pulls the lat/long values from the geojson
    center: coordinates,
    speed: 0.7,
    zoom: 13,
    });

    // Start Bar Charts 
    //  function chart1Modal(value) {
    //  alert("modal goes here");
    //  }

    // Chart 1 values
    var score1 = [props.civ_sc_a,props.emp_sc_a,props.ess_sc_a, props.pos_sc_a,props.wrc_sc_a];
    var score1BS = [props.civ_sc_b,props.emp_sc_b,props.ess_sc_b, props.pos_sc_b,props.wrc_sc_b];
    var score1WS = [props.civ_sc_w,props.emp_sc_w,props.ess_sc_w, props.pos_sc_w,props.wrc_sc_w];
    
    var score2 = [props.ipd_sc_a,props.pop_sc_a,props.zvh_sc_a];
    var score2BS = [props.ipd_sc_b,props.pop_sc_b,props.zvh_sc_b];
    var score2WS = [props.ipd_sc_w,props.pop_sc_w,props.zvh_sc_w];
  
    var score3 = [props.npb_sc,props.lps_sc_a,props.tvv_sc];
    var score3BS = [props.npb_sc,props.lps_sc_b,props.tvv_sc];
    var score3WS = [props.npb_sc,props.lps_sc_w,props.tvv_sc];

    var score4 = [props.cir_sc_a,props.int_sc_a,props.ksi_sc_a, props.lts_sc_a,props.ped_sc_a];
    var score4BS = [props.cir_sc_b,props.int_sc_b,props.ksi_sc_b, props.lts_sc_b,props.ped_sc_b];
    var score4WS = [props.cir_sc_w,props.int_sc_w,props.ksi_sc_w, props.lts_sc_w,props.ped_sc_w];

    updatebarChart(score1,score1BS,score1WS);
    updatebarChart2(score2,score2BS,score2WS);
    updatebarChart3(score3,score3BS,score3WS);
    updatebarChart4(score4,score4BS,score4WS);

    function updatebarChart(Values,Values2,Values3) {
     var options = {
         chart: {
             renderTo: 'chartAS1',
             type:'bar',
             plotBackgroundColor: null,
             plotBorderWidth: 0,//null,
             plotShadow: false,
             height:225,
             marginLeft:220,
             marginBottom:30,
             spacingLeft: 20,
             spacingRight: 20,
             backgroundColor: '#FFF'
           //  backgroundColor: '#EFEFEF'
         },
           colors: ['#267770','#df73ff','#efa801']
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
             height: 170,
             gridLineColor: "#267770",
             title: {
                 text: ''
             }
         },
         legend: {
             enabled: true,
             x: 15,
             y: 15
         },
         tooltip: {
             enabled: false
         },
         series: [{
                 name:'AccessScore',
                //  id: 'Values',
                 data: Values
             },{
                name:'CycleScore',
               //  id: 'Values',
                data: Values2
            },{
                name:'PedestrianScore',
               //  id: 'Values',
                data: Values3
            }
            ]
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
 function updatebarChart2(Values, Values2, Values3) {
    var options = {
        chart: {
            renderTo: 'chartAS2',
            type:'bar',
            plotBackgroundColor: null,
            plotBorderWidth: 0,//null,
            plotShadow: false,
            height:150,
            marginLeft:225,
            marginBottom:30,
            spacingLeft: 20,
            spacingRight: 20,
            backgroundColor: '#FFF'
          //  backgroundColor: '#EFEFEF'
        },
        colors: ['#267770','#df73ff','#efa801']
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
            labels: {useHTML: true,
            align:'right'}
        },
        yAxis: {
            min: 0,
            max:5,
            tickInterval: 1,
            height: 100,
            gridLineColor: "#267770",
            title: {
                text: ''
            }
        },
        legend: {
            enabled: true,
            x: 15,
            y: 15
        },
        tooltip: {
            enabled: false
        },
        series: [{
            name:'AccessScore',
           //  id: 'Values',
            data: Values
        },{
           name:'CycleScore',
          //  id: 'Values',
           data: Values2
       },{
           name:'PedestrianScore',
          //  id: 'Values',
           data: Values3
       }
       ]
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
  function updatebarChart3(Values, Values2, Values3) {
    var options = {
        chart: {
            renderTo: 'chartAS3',
            type:'bar',
            plotBackgroundColor: null,
            plotBorderWidth: 0,//null,
            plotShadow: false,
            height:150,
            marginLeft:220,
            marginBottom:30,
            spacingLeft: 20,
            spacingRight: 20,
            backgroundColor: '#FFF'
          //  backgroundColor: '#EFEFEF'
        },
        colors: ['#267770','#df73ff','#efa801']
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
            height: 100,
            gridLineColor: "#267770",
            title: {
                text: ''
            }
        },
        legend: {
            enabled: true,
            x: 15,
            y: 15
        },
        tooltip: {
            enabled: false
        },
        series: [{
            name:'AccessScore',
           //  id: 'Values',
            data: Values
        },{
           name:'CycleScore',
          //  id: 'Values',
           data: Values2
       },{
           name:'PedestrianScore',
          //  id: 'Values',
           data: Values3
       }
       ]
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
  function updatebarChart4(Values, Values2, Values3) {
    var options = {
        chart: {
            renderTo: 'chartAS4',
            type:'bar',
            plotBackgroundColor: null,
            plotBorderWidth: 0,//null,
            plotShadow: false,
            height:220,
            marginLeft:220,
            marginBottom:30,
            spacingLeft: 20,
            spacingRight: 20,
            backgroundColor: '#FFF'
          //  backgroundColor: '#EFEFEF'
        },
        colors: ['#267770','#df73ff','#efa801']
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
            height: 170,
            gridLineColor: "#267770",
            title: {
                text: ''
            }
        },
        legend: {
            enabled: true,
            x: 15,
            y: 15
        },
        tooltip: {
            enabled: false
        },
        series: [{
            name:'AccessScore',
           //  id: 'Values',
            data: Values
        },{
           name:'CycleScore',
          //  id: 'Values',
           data: Values2
       },{
           name:'PedestrianScore',
          //  id: 'Values',
           data: Values3
       }
       ]
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
 export default handleStation