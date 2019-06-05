width = 600;
height = 350;

M = 6;
N = 4;

scaleX = d3.scaleLinear().domain([0, M]).range([0, width]);
scaleY = d3.scaleLinear().domain([0, N]).range([0, height]);

debugActive = false;

/* Initialize canvas */
svg = d3.select(".wrapper")
  .append("svg")
  .classed("canvas", true)
  .attr("width", "100%")
  .attr("height", "100%")
  .attr("viewBox", "0 0 " + width + " " + height + "")
  .attr("preserveAspectRatio", "xMidYMid meet");



/* Drawing */

function drawGrid() {
  // add the X gridlines
  svg.append("g")
    .attr("class", "grid")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(scaleX).ticks(M)
      .tickSize(-height)
      .tickFormat("")
    )

  // add the Y gridlines
  svg.append("g")
    .attr("class", "grid")
    .call(d3.axisLeft(scaleY).ticks(N)
      .tickSize(-width)
      .tickFormat("")
    )
}


function drawGrass(og) {
  var overgrowth = og ? og : 50;
  var vegetation = svg.append("g").classed("vegetation", true)

  var nodes = d3.range(overgrowth).map(function (i) {
    return {
      x: Math.random() * width * M,
      y: Math.random() * height * N,
    };
  });

  vegetation.selectAll(".grass")
    .data(nodes)
    .enter()
    .append("image")
    .attr("xlink:href", "resources/grass.svg")
    .attr("width", 100)
    .attr("height", 100)
    .style("opacity", 0.3)
    .attr("transform", function (d) { return "scale(0.3), translate(" + d.x + "," + d.y + ")" });
}


function drawField(flowersData, butterfliesData, debug = false) {
  // Initialize flower groups
  var flws = svg.selectAll(".flower")
    .data(flowersData)
    .enter().append("g")
    .classed("flower", true)
    .attr("id", function (d) { return "fl" + (d.id + 1) });

  // Render flower image
  flws.append("path")
    .attr("d", flower1)
    .attr("fill", function (d) { return d.color })
    .attr("stroke", "black");
  flws.append("path")
    .attr("d", flower2)
    .attr("fill", "white");

  fw = flws.select("path").node().getBBox().width;
  fh = flws.select("path").node().getBBox().height;

  // Arrange flower groups on grid
  flws.transition().duration(1000)
    .attr("transform", function (d) { return "translate(" + scaleX(d.x + 0.5) + "," + scaleY(d.y + 0.5) + ")" });

  // Center flower images on grid
  flws.selectAll("path")
    .transition().duration(0)
    .attr("transform", "scale(0.4), translate(" + (-fw / 2) + "," + (-fh / 2) + ")");

  /* -------------------------------------------------------------- */

  // Initialize butterfly groups
  var bfls = svg.selectAll(".butterfly")
    .data(butterfliesData)
    .enter().append("g")
    .classed("butterfly", true)
    .attr("id", function (d) { return "bf" + (d.id + 1) });

  // Render butterfly image
  bfls.append("path")
    .attr("d", bfly)
    .attr("fill", function (d) { return d.color })
    .attr("fill-opacity", 0);

  // Arrange butterfly groups on flowers
  bfls.transition().duration(0)
    .attr("transform", function (d) { return "translate(" + scaleX(d.x + 0.5) + "," + scaleY(d.y + 0.5) + ")" });

  bw = bfls.select("path").node().getBBox().width;
  bh = bfls.select("path").node().getBBox().height;

  // Center butterfly images on grid
  bfls.selectAll("path")
    .transition().duration(2000)
    .attr("fill-opacity", 1)
    .attr("transform", "scale(1.2) translate(" + (-bw / 1.8) + "," + (-bh / 2) + ")");


  if (debug || debugActive) {
    debugActive = true;
    // Draw center of flower group (debug)
    flws.append("circle")
      .attr("r", 1)
      .style("fill", "red")

    // Render label showing flower id
    flws.append("text")
      .attr("dx", 20)
      .attr("dy", 20)
      .attr("fill", "white")
      .text(function (d) { return "F" + (d.id + 1) });

    // Draw center of butterfly group (debug)
    bfls.append("circle")
      .attr("r", 1)
      .style("fill", "black")

    // Render label showing butterfly id
    bfls.append("text")
      .attr("dx", 20)
      .attr("dy", 40)
      .attr("fill", "black")
      .text(function (d) { return "B" + (d.id + 1) });
  }

  svg.selectAll(".butterfly")
    .on("mouseover", function () {
      d3.select(this).remove();
      updateFreeButterflies();
    });
}

function updateField(butterfliesData) {
  var bfls = svg.selectAll(".butterfly")
    .data(butterfliesData)
    .transition().duration(1000)
    .attr("transform", function (d) { return "translate(" + scaleX(d.x + 0.5) + "," + scaleY(d.y + 0.5) + ")" })
}

function clearField() {
  d3.selectAll(".flower").remove();
  d3.selectAll(".butterfly").remove();
}