/* Global variables */
dataset = [];
flowers = [];
butterflies = [];

curr_flArr = [null, null];
curr_bfflArr = [null, null];

updatefrequency = 1500;
debug = true;

/* Data loading */

function updateFlowerCoords(flowers) {
    new_flowers = []
    flowers.forEach(f => {
        coords = curr_flArr[1][f.id];
        f = { ...f, ...{ "x": coords[1] - 1, "y": coords[0] - 1 } };
        new_flowers.push(f);
    })
    return new_flowers
}

function updateButterflyCoords(butterflies, flowers) {
    new_butterflies = []
    butterflies.forEach(b => {
        target_fl_id = curr_bfflArr[1].find(function (el) { return el[0] == b.id })[1];
        target_fl = flowers.find(function (el) { return el.id == target_fl_id });
        b = { ...b, ...{ "x": target_fl.x, "y": target_fl.y } };
        new_butterflies.push(b);
    })
    return new_butterflies;
}

function pickRandom(arrangements) {
    return arrangements[Math.floor(Math.random() * arrangements.length)];
}

function nextFlowerArrangement() {
    var new_flArr = pickRandom(dataset.flowers_arrangements);
    while (curr_flArr[0] == new_flArr[0]) {
        new_flArr = pickRandom(dataset.flowers_arrangements);
    }
    curr_flArr = new_flArr
}

function nextButterflyFlowerArrangement() {
    var new_bfflArr = pickRandom(dataset.bffl_arrangements);
    while (curr_bfflArr[0] == new_bfflArr[0]) {
        new_bfflArr = pickRandom(dataset.bffl_arrangements);
    }
    curr_bfflArr = new_bfflArr
}

function loadData() {
    nextFlowerArrangement()
    flowers = updateFlowerCoords(dataset.flowers);
    nextButterflyFlowerArrangement()
    butterflies = updateButterflyCoords(dataset.butterflies, flowers);
}

function reload() {
    d3.selectAll(".flower").remove();
    d3.selectAll(".butterfly").remove();

    loadData()
    drawField(flowers, butterflies);
}

/* Main */

function init() {
    setTimeout(function () {
        d3.json("resources/settings.json").then(function (data) {
            dataset = data
            drawGrass();
            // drawGrid();
            loadData();
            drawField(flowers, butterflies, debug);
        });
    }, 500);
}

i = 0
function loop() {
    i = i + 1
    console.log("updating butterflies..." + (i))

    nextButterflyFlowerArrangement()
    butterflies = updateButterflyCoords(butterflies, flowers)
    updateField(butterflies)
}


init();
setInterval(loop, updatefrequency);