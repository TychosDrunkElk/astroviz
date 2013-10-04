var maxJsonProp = function(jsonArray, prop){
  var max = 0;
  for(var i = 0; i < jsonArray.length; i++) {
    if(jsonArray[i][prop] > max){
      max = jsonArray[i][prop];
    }
  }
  return max;
}

var updateHeatMap = function(temps) {
  var colorRange = d3.scale.linear()
      .domain([0, 0.2, 0.4, 0.6, 0.8, 1])
      .range(["rgb(59, 114, 179)", "rgb(158, 200, 222)", "rgb(254, 224, 138)","rgb(252, 175, 97)", "rgb(245, 107, 68)", "rgb(211, 57, 74)"]);
  
  function tempToGradient(temp, i){
    return {offset: i+"%", color: colorRange(temp)};
  }
  
  var colorMap = temps.map(tempToGradient);
  var legendColorMap = [0, 0.2, 0.4, 0.6, 0.8, 1].map(function(temp, i){
    return {offset: i*20+"%", color: colorRange(temp)}
  });
  var grad = d3.select("#temperature-gradient").selectAll("stop")
                     .data(colorMap);
  grad.enter().append("stop")
      .attr("offset", function(d) { return d.offset; })
      .attr("stop-color", function(d) { return d.color; });
  grad.transition()
      .duration(500)
      .attr("offset", function(d) { return d.offset; })
      .attr("stop-color", function(d) { return d.color; })

  // var grad_legend = d3.select("#legend-temperature-gradient").selectAll("stop")
  //                     .data(legendColorMap);
  // grad_legend.enter().append("stop")
  //     .attr("offset", function(d) { return d.offset; })
  //     .attr("stop-color", function(d) { return d.color; });
  // grad_legend.transition()
  //     .duration(500)
  //     .attr("offset", function(d) { return d.offset; })
  //     .attr("stop-color", function(d) { return d.color; })
}

var initSVG = function(){
  var width = 940,
      height = 940;
  d3.select("#isochrone-container").append("svg")
      .attr("width", 600)
      .attr("height", 30)
      .attr("id", "temp-legend")
  // d3.select("#temp-legend").append("rect")
  //     .attr("fill", "url(#legend-temperature-gradient)")
  //     .attr("width", 600)
  //     .attr("height", 30);
  d3.select("#isochrone-container").append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("id", "isochrone");
}
var initTempMap = function(){
  d3.select("#isochrone").append("linearGradient")
        .attr("id", "temperature-gradient")
        .attr("gradientUnits", "userSpaceOnUse");
  // d3.select("#temp-legend").append("linearGradient")
  //       .attr("id", "legend-temperature-gradient")
  //       .attr("gradientUnits", "userSpaceOnUse")
  //       .attr("y1", "0%")
  //       .attr("y2", "0%")
  //       .attr("x1", "0%")
  //       .attr("x2", "100%");
}
var updateData = function(data) {
  var height = maxJsonProp(data[0], "radius")*4;
  d3.select("#isochrone").attr("height", height);

  var x = d3.scale.linear()
      .domain([0, data[0].length - 1])
      .range([0, 940]);

  var y = d3.scale.ordinal()
      .domain(d3.range(1))
      .rangePoints([0, height], 1);
  var area = d3.svg.area()
      .interpolate("basis")
      .x(function(d, i) { return x(i); })
      .y0(function(d) { return -d.radius*2; })
      .y1(function(d) { return d.radius*2; });

  
  var data = d3.select("#isochrone").selectAll("path")
      .data(data);

  data.enter().append("path")
      .attr("transform", function(d, i) { return "translate(0," + y(i) + ")"; })
      .style("fill", "url(#temperature-gradient)")
      .attr("d", area);
  data.transition()
      .duration(500)
      .attr("transform", function(d, i) { return "translate(0," + y(i) + ")"; })  
      .attr("d", area);
}

var stellarLife = function(data, temps) {
  initSVG();
  initTempMap();
  updateData(data);
  updateHeatMap(temps);
}

var updateAll = function(data, temps) {
  updateData(data);
  updateHeatMap(temps)
}