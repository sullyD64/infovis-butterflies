/* Global variables */
dataset = []
flowers = []
butterflies = []

/* Data loading */
function loadFlowerCoords(flws, flArrangement) {
    var flws_new = []

    flws.forEach(element => {
        coords = flArrangement[element.id - 11];
        flws_new.push({
            "id": element.id,
            "color": element.color,
            "x": coords[1] - 1,
            "y": coords[0] - 1
        });
    })
    return flws_new;
}

function pickRandomArrangement(arrangements) {
    return arrangements[Math.floor(Math.random() * arrangements.length)];
}

function loadData() {
    var flArrangement = pickRandomArrangement(dataset.flowers_arrangements);
    flowers = loadFlowerCoords(dataset.flowers, flArrangement);


    // bfls = dataset.butterflies;
    // var couples = dataset.butterflies_flowers;

}

function getButterflyCoords(bfls, flowers_arrangements, couples) {
    var coords = []


}


function reload() {
    d3.selectAll(".flower").remove();
    d3.selectAll(".butterfly").remove();

    loadData()
    drawField(flowers);
}


function init() {
    setTimeout(function () {
        d3.json("resources/settings.json").then(function (data) {
            dataset = data
            drawGrass();
            drawGrid();
            loadData();
            drawField(flowers);
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