document.getElementById("AS").addEventListener("click", function() {
    // alert("Hello World!");
     document.getElementById("accessScore").style.display = "block"
     document.getElementById("bikeScore").style.display = "none"
     document.getElementById("walkScore").style.display = "none"
   
     $('#BS').css({
       'color':'grey',
       'font-weight':'normal'
     });
     $('#WS').css({
       'color':'grey',
       'font-weight':'normal'
     });
     $('#AS').css({
       'color':'var(--theme-access)',
       'font-weight':'bold'
     });
   
     map.setLayoutProperty('stations', "visibility", "visible")
     map.setLayoutProperty('stationsB', "visibility", "none")
     map.setLayoutProperty('stationsW', "visibility", "none")
   });
   
   document.getElementById("BS").addEventListener("click", function() {
     // alert("Hello World!");
      document.getElementById("accessScore").style.display = "none"
      document.getElementById("bikeScore").style.display = "block"
      document.getElementById("walkScore").style.display = "none"
      
     $('#AS').css({
       'color':'grey',
       'font-weight':'normal'
     });
     $('#WS').css({
       'color':'grey',
       'font-weight':'normal'
     });
     $('#BS').css({
       'color':'var(--theme-accessO)',
       'font-weight':'bold'
     });
   
      map.setLayoutProperty('stations', "visibility", "none")
      map.setLayoutProperty('stationsB', "visibility", "visible")
      map.setLayoutProperty('stationsW', "visibility", "none")
    });
   
    document.getElementById("WS").addEventListener("click", function() {
     // alert("Hello World!");
      document.getElementById("accessScore").style.display = "none"
      document.getElementById("bikeScore").style.display = "none"
      document.getElementById("walkScore").style.display = "block"
     
      $('#AS').css({
       'color':'grey',
       'font-weight':'normal'
     });
     $('#BS').css({
       'color':'grey',
       'font-weight':'normal'
     });
     $('#WS').css({
       'color':'var(--theme-accessF)',
       'font-weight':'bold'
     });
   
      map.setLayoutProperty('stations', "visibility", "none")
      map.setLayoutProperty('stationsB', "visibility", "none")
      map.setLayoutProperty('stationsW', "visibility", "visible")
    });