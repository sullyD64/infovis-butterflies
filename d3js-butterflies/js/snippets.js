// var configurations;
// d3.json("resources/coordinates.json").then(function(data) {
//     configurations = data;
// });



// d3.selectAll("svg").append("image")
//   .attr('xlink:href', 'resources/flower.svg')
//   .attr('x', 0)
//   .attr('y', 0)
//   .attr('width', 10)
//   .attr('height', 10)
//   .attr('fill', 'green')



// d3.select('#btn')
//     .on('click', function() {
//         init(butterflies);
//         d3.selectAll('body')
//             .append('h3')
//             .text('Today is a beautiful day!!');
//     });


// var nodes = d3.range(10).map(function(i) { 
//   return {
//     index: i,
//     x: getRandomInt(20, 120),
//     y: getRandomInt(20, 120),
//     r: 10.120/2
//     }; 
//   });


// var svgWidth = document.body.clientWidth;
// var svgHeight = document.body.scrollHeight;

// var svg = d3.select("div#container")
//   .append("svg")
//   .attr("preserveAspectRatio", "xMinYMid meet")
//   .attr("viewBox", "0 0 1 1")
//   .style("border","5px solid")
//   .classed("svg-content", true);





// var getdata = function() {
//     var dataset = []
//     for (var i = 0; i < 20; i++) {
//       var x = d3.randomUniform(-50,50)();
//       var y = d3.randomUniform(-50,50)();
//       dataset.push({"x": x, "y": y});
//     }
//     return dataset
//   }
    
//   var data = getdata()
  
//   data.forEach(function(d) {
//     d.x = +d.x;
//     d.y = +d.y;
//   });
  
  
//     // scale the range of the data
  
  
//     // add the dots
//     svg.selectAll("dot")
//       .data(data)
//       .enter().append("circle")
//       .attr("r", 5)
//       .attr("cx", function(d) { return x(d.x); })
//       .attr("cy", function(d) { return y(d.y); });
  
  
//     // add the X Axis
//     svg.append("g")
//       .attr("transform", "translate(0," + field.height + ")")
//       .call(d3.axisBottom(x));
  
//     // add the Y Axis
//     svg.append("g")
//       .call(d3.axisLeft(y));
  
  


// var getdata = function () {
//   var dataset = []
//   for (var i = 0; i < 10; i++) {
//     var x = d3.randomUniform(-10, 10)();
//     var y = d3.randomUniform(-10, 10)();
//     var id = i + 1;
//     dataset.push({ "x": x, "y": y, "id": id });
//   }
//   return dataset
// }

// var data = getdata()



/// CAPTURE BUTTERFLIES

// var scale = 2;
// d3.selectAll('.operator')
//   .on('mouseenter', function() {
//     d3.select(this).select("circle").attr("cx", 50 / scale)
//     d3.select(this).select("circle").attr("cy", 50 / scale)

//     console.log('Mouse Enter');
//     d3.select(this).attr('transform', 'scale(2)');

//   })
//   .on('mouseleave', function() {

//     console.log('Mouse Leave');

//   })
//   .call(d3.behavior.drag().on('drag', function() {

//     d3.select(this).attr('transform', 'translate(' + d3.event.x + ',' + d3.event.y + ')');

//   }))
