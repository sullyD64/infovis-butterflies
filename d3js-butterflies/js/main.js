/* Global variables */
dataset = [];
flowers = [];
butterflies = [];

/* Data loading */

function updateFlowerCoords(flowers, flArr) {
    new_flowers = []
    flowers.forEach(f => {
        coords = flArr[f.id];
        f = { ...f, ...{ "x": coords[1] - 1, "y": coords[0] - 1 } };
        new_flowers.push(f);
    })
    return new_flowers
}

function updateButterflyCoords(butterflies, flowers, bfflArr) {
    new_butterflies = []

    butterflies.forEach(b => {
        target_fl_id = bfflArr.find(function (el) { return el[0] == b.id })[1];
        target_fl = flowers.find(function (el) { return el.id == target_fl_id});
        b = { ...b, ...{ "x": target_fl.x, "y": target_fl.y } };
        new_butterflies.push(b);
    })
    return new_butterflies;
}


function pickRandomArrangement(arrangements) {
    return arrangements[Math.floor(Math.random() * arrangements.length)];
}

function loadData() {
    var flArrangement = pickRandomArrangement(dataset.flowers_arrangements);
    flowers = updateFlowerCoords(dataset.flowers, flArrangement);

    var bfflArrangement = pickRandomArrangement(dataset.bf_fl_arrangements);
    butterflies = updateButterflyCoords(dataset.butterflies, flowers, bfflArrangement);
}


function reload() {
    d3.selectAll(".flower").remove();
    d3.selectAll(".butterfly").remove();

    loadData()
    drawField(flowers, butterflies);
}


function init() {
    setTimeout(function () {
        d3.json("resources/settings.json").then(function (data) {
            dataset = data
            drawGrass();
            drawGrid();
            loadData();
            drawField(flowers, butterflies);
        });
    }, 500);
}

init();

// i = 0
// function f() {
//     reload();
//     i = i + 1
//     console.log("running..." + (i))
// }
// setInterval(f, 2000);