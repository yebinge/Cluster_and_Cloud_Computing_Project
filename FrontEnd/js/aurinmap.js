/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */



 let map;
 let censusMin = Number.MAX_VALUE,
   censusMax = -Number.MAX_VALUE;
 let flag = 0;
 function initMap() {
   // load the map
   map = new google.maps.Map(document.getElementById("map"), {
     center: { lat: -37.8136276, lng: 144.9630576 },
     // center: { lat: 40, lng: -100 },
     zoom: 13,
     mapTypeId: "roadmap",
     styles:[
       {
         "elementType": "geometry",
         "stylers": [
           {
             "color": "#1d2c4d"
           }
         ]
       },
       {
         "elementType": "labels.text.fill",
         "stylers": [
           {
             "color": "#8ec3b9"
           }
         ]
       },
       {
         "elementType": "labels.text.stroke",
         "stylers": [
           {
             "color": "#000000"
           }
         ]
       },
       {
         "featureType": "administrative.country",
         "elementType": "geometry.stroke",
         "stylers": [
           {
             "color": "#4b6878"
           }
         ]
       },
       {
         "featureType": "administrative.country",
         "elementType": "labels.text",
         "stylers": [
           {
             "color": "#ffeb3b"
           }
         ]
       },
       {
         "featureType": "administrative.land_parcel",
         "elementType": "labels",
         "stylers": [
           {
             "visibility": "off"
           }
         ]
       },
       {
         "featureType": "administrative.land_parcel",
         "elementType": "labels.text.fill",
         "stylers": [
           {
             "color": "#64779e"
           }
         ]
       },
       {
         "featureType": "administrative.province",
         "elementType": "geometry.stroke",
         "stylers": [
           {
             "color": "#4b6878"
           }
         ]
       },
       {
         "featureType": "landscape.man_made",
         "elementType": "geometry.stroke",
         "stylers": [
           {
             "color": "#334e87"
           }
         ]
       },
       {
         "featureType": "landscape.natural",
         "elementType": "geometry",
         "stylers": [
           {
             "color": "#023e58"
           }
         ]
       },
       {
         "featureType": "poi",
         "stylers": [
           {
             "color": "#050000"
           }
         ]
       },
       {
         "featureType": "poi",
         "elementType": "geometry",
         "stylers": [
           {
             "color": "#283d6a"
           }
         ]
       },
       {
         "featureType": "poi",
         "elementType": "labels.text.fill",
         "stylers": [
           {
             "color": "#6f9ba5"
           }
         ]
       },
       {
         "featureType": "poi",
         "elementType": "labels.text.stroke",
         "stylers": [
           {
             "color": "#1d2c4d"
           }
         ]
       },
       {
         "featureType": "poi.business",
         "stylers": [
           {
             "visibility": "off"
           }
         ]
       },
       {
         "featureType": "poi.park",
         "elementType": "geometry.fill",
         "stylers": [
           {
             "color": "#023e58"
           }
         ]
       },
       {
         "featureType": "poi.park",
         "elementType": "labels.text",
         "stylers": [
           {
             "visibility": "off"
           }
         ]
       },
       {
         "featureType": "poi.park",
         "elementType": "labels.text.fill",
         "stylers": [
           {
             "color": "#3C7680"
           }
         ]
       },
       {
         "featureType": "road",
         "elementType": "geometry",
         "stylers": [
           {
             "color": "#304a7d"
           }
         ]
       },
       {
         "featureType": "road",
         "elementType": "labels.text.fill",
         "stylers": [
           {
             "color": "#98a5be"
           }
         ]
       },
       {
         "featureType": "road",
         "elementType": "labels.text.stroke",
         "stylers": [
           {
             "color": "#1d2c4d"
           }
         ]
       },
       {
         "featureType": "road.highway",
         "elementType": "geometry",
         "stylers": [
           {
             "color": "#2c6675"
           }
         ]
       },
       {
         "featureType": "road.highway",
         "elementType": "geometry.stroke",
         "stylers": [
           {
             "color": "#255763"
           }
         ]
       },
       {
         "featureType": "road.highway",
         "elementType": "labels.text.fill",
         "stylers": [
           {
             "color": "#b0d5ce"
           }
         ]
       },
       {
         "featureType": "road.highway",
         "elementType": "labels.text.stroke",
         "stylers": [
           {
             "color": "#023e58"
           }
         ]
       },
       {
         "featureType": "road.local",
         "elementType": "labels",
         "stylers": [
           {
             "visibility": "off"
           }
         ]
       },
       {
         "featureType": "transit",
         "elementType": "labels.text.fill",
         "stylers": [
           {
             "color": "#98a5be"
           }
         ]
       },
       {
         "featureType": "transit",
         "elementType": "labels.text.stroke",
         "stylers": [
           {
             "color": "#1d2c4d"
           }
         ]
       },
       {
         "featureType": "transit.line",
         "elementType": "geometry.fill",
         "stylers": [
           {
             "color": "#283d6a"
           }
         ]
       },
       {
         "featureType": "transit.station",
         "elementType": "geometry",
         "stylers": [
           {
             "color": "#3a4762"
           }
         ]
       },
       {
         "featureType": "water",
         "elementType": "geometry",
         "stylers": [
           {
             "color": "#0e1626"
           }
         ]
       },
       {
         "featureType": "water",
         "elementType": "labels.text.fill",
         "stylers": [
           {
             "color": "#4e6d70"
           }
         ]
       }
     ]
   });
 
 
   // wire up the button
   const selectBox = document.getElementById("census-variable");
 
   google.maps.event.addDomListener(selectBox, "change", () => {
     clearCensusData();
     // load data from the previous selection
     loadCensusData(selectBox.options[selectBox.selectedIndex].value);
   });
   // state polygons only need to be loaded once, do them now
   loadMapShapes();
 
    // load data from the previous selection
    map.data.setStyle(styleFeature);
    map.data.addListener("mouseover", mouseInToRegion);
    map.data.addListener("mouseout", mouseOutOfRegion);

   
 
   // Create the search box and link it to the UI element.
   const input = document.getElementById("pac-input");
   const searchBox = new google.maps.places.SearchBox(input);
 
   map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
   // Bias the SearchBox results towards current map's viewport.
   map.addListener("bounds_changed", () => {
     searchBox.setBounds(map.getBounds());
   });
 
   let markers = [];
 
   // Listen for the event fired when the user selects a prediction and retrieve
   // more details for that place.
   searchBox.addListener("places_changed", () => {
     const places = searchBox.getPlaces();
 
     if (places.length == 0) {
       return;
     }
 
     // Clear out the old markers.
     markers.forEach((marker) => {
       marker.setMap(null);
     });
     markers = [];
 
     // For each place, get the icon, name and location.
     const bounds = new google.maps.LatLngBounds();
 
     places.forEach((place) => {
       if (!place.geometry || !place.geometry.location) {
         console.log("Returned place contains no geometry");
         return;
       }
 
       const icon = {
         url: place.icon,
         size: new google.maps.Size(71, 71),
         origin: new google.maps.Point(0, 0),
         anchor: new google.maps.Point(17, 34),
         scaledSize: new google.maps.Size(25, 25),
       };
 
       // Create a marker for each place.
       markers.push(
         new google.maps.Marker({
           map,
           icon,
           title: place.name,
           position: place.geometry.location,
         })
       );
       if (place.geometry.viewport) {
         // Only geocodes have viewport.
         bounds.union(place.geometry.viewport);
       } else {
         bounds.extend(place.geometry.location);
       }
     });
     map.fitBounds(bounds);
   });
 
 }
 
 /** Loads the state boundary polygons from a GeoJSON source. */
 function loadMapShapes() {
   
   // load US state outline polygons from a GeoJson file
   map.data.loadGeoJson(
     // "https://storage.googleapis.com/mapsdevsite/json/states.js",
     "https://raw.githubusercontent.com/tonywr71/GeoJson-Data/master/suburb-2-vic.geojson",
     { idPropertyName: "vic_loca_2" }
   );
 
   // wait for the request to complete by listening for the first feature to be
   // added
   google.maps.event.addListenerOnce(map.data, "addfeature", () => {
     google.maps.event.trigger(
       document.getElementById("census-variable"),
       "change"
     );
   });
 }
 
 
 /**
  * Loads the census data from a simulated API call to the US Census API.
  *
  * @param {string} variable
  */
 // dealing with the data(need more discussion )
 function loadCensusData(variable) {
   // load the requested variable from the census API (using local copies)
   const xhr = new XMLHttpRequest();
 
   xhr.open("GET", variable );
   xhr.onload = function () {
   const censusData = JSON.parse(xhr.responseText);
   const max = censusData["OVERALL"]["max"];
   const mean = censusData["OVERALL"]["mean"];
   const min = censusData["OVERALL"]["min"];
   const datalist = [];
     for (const [key, value] of Object.entries(censusData)) {
       const censusVariable = value["rai"];
       const positiveRate = value["positive_rate"];
       const positive = value["positive"];
       const combine = [value["rai"], value["positive_rate"]];
       datalist.push(combine);
       //console.log(value)
       const stateId = key;
       //console.log(key, value);
       if (censusVariable < censusMin) {
         censusMin = censusVariable;
       }
       
       if (censusVariable > censusMax) {
         censusMax = censusVariable;
       }
       
       const state = map.data.getFeatureById(stateId);
       if (state) {
           state.setProperty("census_variable", censusVariable);
           state.setProperty("p_rate", positiveRate)
           state.setProperty("stateId", key);
           state.setProperty("max", max);
           state.setProperty("mean", mean);
           state.setProperty("min", min);
           }
 
     };
     // update and display the legend
     document.getElementById("census-min").textContent =
       censusMin.toLocaleString();
     document.getElementById("census-max").textContent =
       censusMax.toLocaleString();
    addScatter(datalist);
     
   };
 
   xhr.send();
 }
 
 /** Removes census data from each shape on the map and resets the UI. */
 function clearCensusData() {
   censusMin = Number.MAX_VALUE;
   censusMax = -Number.MAX_VALUE;
   map.data.forEach((row) => {
     row.setProperty("census_variable", undefined);
   });
   document.getElementById("data-box").style.display = "none";
   document.getElementById("data-caret").style.display = "none";
 }
 
 /**
  * Applies a gradient style based on the 'census_variable' column.
  * This is the callback passed to data.setStyle() and is called for each row in
  * the data set.  Check out the docs for Data.StylingFunction.
  *
  * @param {google.maps.Data.Feature} feature
  */
 function styleFeature(feature) {
   const low = [5, 69, 54]; // color of smallest datum
   const high = [151, 83, 34]; // color of largest datum
   // delta represents where the value sits between the min and max
   const delta =
     (feature.getProperty("census_variable") - feature.getProperty("min")) /
     (feature.getProperty("max") - feature.getProperty("min"));
   const color = [];
 
   for (let i = 0; i < 3; i++) {
     // calculate an integer color based on the delta
     color.push((high[i] - low[i]) * delta + low[i]);
   }
 
   // determine whether to show this shape or not
   let showRow = true;
 
   if (
     feature.getProperty("census_variable") == null ||
     isNaN(feature.getProperty("census_variable"))
   ) {
     showRow = false;
   }
 
   let outlineWeight = 0.5,
     zIndex = 1;
 
   if (feature.getProperty("state") === "hover") {
     outlineWeight = zIndex = 2;
   }
   return {
     strokeWeight: outlineWeight,
     strokeColor: "#fff",
     zIndex: zIndex,
     fillColor: "hsl(" + color[0] + "," + color[1] + "%," + color[2] + "%)",
     fillOpacity: 0.75,
     visible: showRow,
   };
 }
 
 /**
  * Responds to the mouse-in event on a map shape (state).
  *
  * @param {?google.maps.MapMouseEvent} e
  */
 function mouseInToRegion(e) {
   // set the hover state so the setStyle function can change the border
   e.feature.setProperty("state", "hover");
 
   const percent = ((e.feature.getProperty("census_variable") - e.feature.getProperty("min")) /
   (e.feature.getProperty("max") - e.feature.getProperty("min"))) * 100;
   const current = e.feature.getProperty("census_variable");
   const max = e.feature.getProperty("max");
   const min = e.feature.getProperty("min");
   const mean = e.feature.getProperty("mean");
   // update the label
   // document.getElementById("data-label").textContent =
   //   e.feature.getProperty("NAME");
   document.getElementById("data-label").textContent =e.feature.getProperty("stateId");
   //addPie(pos_out, neg_out, neu_out);
   //addBar(pos_out, neg_out, neu_out);
   document.getElementById("data-value").textContent = e.feature
     .getProperty("census_variable")
     .toLocaleString();
   document.getElementById("data-box").style.display = "block";
   document.getElementById("data-caret").style.display = "block";
   document.getElementById("data-caret").style.paddingLeft = percent + "%";
   addBar(current, max, min, mean)
 }
 

 
 /**
  * Responds to the mouse-out event on a map shape (state).
  *
  */
 function mouseOutOfRegion(e) {
   // reset the hover state, returning the border to normal
   e.feature.setProperty("state", "normal");
 }
 
 window.initMap = initMap;
 
 function addBar(current, max, min, mean) {
   var dom = document.getElementById("container3");
   var myChart = echarts.init(dom);
   option = null;
 
   option = {
       tooltip: {
           trigger: 'axis',
           axisPointer: {
               type: 'none'
           },
           formatter: function (params) {
               return params[0].name + ': ' + params[0].value;
           }
       },
       xAxis: {
           data: ['Current', 'MEAN', 'MAX', 'MIN'],
           axisTick: {show: false},
           axisLine: {show: false},
           axisLabel: {
               textStyle: {
                   color: '#ffffffff',    
               }
           }
       },
       yAxis: {
           splitLine: {show: false},
           axisTick: {show: false},
           axisLine: {show: false},
           axisLabel: {show: false}
       },
       color: function(params) {
         //#ffdc60,#ee6666,#9fe080,#5470c6
         var colorList = [new echarts.graphic.LinearGradient(
           0, 0, 0, 1,
           [
               {offset: 0, color: '#0f9f59'},
               {offset: 1, color: '#0af91ef4'}
           ]
          ),new echarts.graphic.LinearGradient(
           0, 0, 0, 1,
           [   {offset: 0, color: '#f40d05f4'},
               {offset: 1, color: '#ee740ff4'}
           ]
          ), new echarts.graphic.LinearGradient(
           0, 0, 0, 1,
           [
               {offset: 0, color: '#f4c405f4'},
               {offset: 1, color: '#e4f405f4'}
           ]
          ),new echarts.graphic.LinearGradient(
            0, 0, 0, 1,
            [
                {offset: 0, color: '#05f7ebf4'},
                {offset: 1, color: '#79e4eef4'}
            ]
           )];
         return colorList[params.dataIndex]
         },
       series: [{
           name: 'hill',
           type: 'pictorialBar',
           barCategoryGap: '-130%',
           // symbol: 'path://M0,10 L10,10 L5,0 L0,10 z',
           symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
           itemStyle: {
               normal: {
                   opacity: 0.8
               },
               emphasis: {
                   opacity: 1
               }
           },
           //"这里规定下data"
           data: [Math.round(current),Math.round(mean),Math.round(max),Math.round(min)],
           label:{
             show:true,//是否显示
             textStyle:{
               fontSize:20
             }
         }
       }]
   };;
 
   myChart.setOption(option, true);
 };
 
 
 function addAll(pos, neg, neu) {
   var dom = document.getElementById("container4");
   var myChart = echarts.init(dom);
   option = null;
   // Generate data
 
 
   // option
   option = {
       tooltip: {
           trigger: 'axis',
           axisPointer: {
               type: 'shadow'
           }
       },
       legend: {
           data: ['Great Melbourne'],
           textStyle: {
               color: '#ffffff',
               fontSize:13
           }
           
       },
       xAxis: {
           data: ['Positive', 'Negative', 'Neutral'],
           axisLine: {
               lineStyle: {
                   color: '#fffff',
                   fontSize:13
               }
               
           }
       },
       yAxis: {
           splitLine: {show: false},
           axisLine: {
               lineStyle: {
                   color: '#ccc'
               }
           }
       },
       series: [{
           type: 'line',
           smooth: true,
           showAllSymbol: true,
           symbol: 'emptyCircle',
           markPoint:{
               data:[
                   {
                       type:"max",name:"最大值"                          
                   },
                   {
                       type:"min",name:"最小值"
                   },
               ]
           },
           symbolSize: 15,
           data: [pos,neg,neu]
       }, {
           name: 'Great Melbourne',
           type: 'bar',
           barWidth: 60,
           itemStyle: {
               normal: {
                   barBorderRadius: 10,
                   color: function(params) {
                       //#ffdc60,#ee6666,#9fe080,#5470c6
                       var colorList = [new echarts.graphic.LinearGradient(
                           0, 0, 0, 1,
                           [
                               {offset: 0, color: '#0f9f59'},
                               {offset: 1, color: '#0af91ef4'}
                           ]
                          ),new echarts.graphic.LinearGradient(
                           0, 0, 0, 1,
                           [   {offset: 0, color: '#f40d05f4'},
                               {offset: 1, color: '#ee740ff4'}
                           ]
                          ), new echarts.graphic.LinearGradient(
                           0, 0, 0, 1,
                           [
                               {offset: 0, color: '#f4c405f4'},
                               {offset: 1, color: '#e4f405f4'}
                           ]
                          )];
                       return colorList[params.dataIndex]
 
                   }
               }
           },
           data: [pos,neg,neu],
           label:{
               show:true,//是否显示
               textStyle:{//图例文字的样式
                 color:'#fff',
                 fontSize:16
             }
           }
       }
   ]
   };;
 
   myChart.setOption(option, true);
 }

 function addScatter(datalist){
    var dom = document.getElementById("container4");
    var myChart = echarts.init(dom);
    option = null;
    option = {
        color: function(params) {
            //#ffdc60,#ee6666,#9fe080,#5470c6
            var colorList = [new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  {offset: 0, color: '#bcff05f4'},
                  {offset: 1, color: '#1ff104f4'}
                ]
               )];
            return colorList[params.dataIndex]
        },
        xAxis: {
            name: 'RAI',
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#ffffffff',    
                }
            },axisLabel: {
                color: '#ffffffff'
              },
              axisTick: {
                lineStyle: {
                  color: '#ffffffff'
                }
              },
            splitLine: { show: false }
        },
        yAxis: {
            name: 'Postive Rate',
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#ffffffff',    
                }
            },axisLabel: {
                color: '#ffffffff'
              },
              axisTick: {
                lineStyle: {
                  color: '#ffffffff'
                }
              },
            splitLine: { show: false }
        },
        series: [
          {
            symbolSize: 10,
            data: datalist,
            type: 'scatter'
          }
        ]
      };
    myChart.setOption(option, true);
 }
 