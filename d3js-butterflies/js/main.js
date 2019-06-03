/* Data loading */

function getFlowerCoords(arrangement) {
    var coords = [];
    arrangement.forEach(element => {
      coords.push({ "y": element[0] - 1, "x": element[1] - 1 });
    });
    return coords;
  }
  
  function pickRandomArrangement(arrangements) {
    return arrangements[Math.floor(Math.random() * arrangements.length)];
  }
  
  function loadData(dataset) {
    flws = dataset.flowers
    arrs = dataset.flowers_arrangements
    var coords = getFlowerCoords(pickRandomArrangement(arrs));
    
    return {
      flws: flws,
      coords: coords
    }
  }
    


function reload() {
    d3.selectAll(".flower").remove();
    drawField(flws, getFlowerCoords(pickRandomArrangement(arrs)));
}


function init() {
    setTimeout(function () {
        d3.json("resources/settings.json").then(function (data) {
        //drawGrid();
        dataset = loadData(data);
        drawField(dataset.flws, dataset.coords);
        });
    }, 500);
}

init();