/* Global variables */
dataset = [];
flowers = [];
butterflies = [];

curr_flArr = [null, null];
curr_bfflArr = [null, null];

free_butterflies = 0;

updatefrequency = 1500;
debug = false;

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

/* Main */
function reload() {
    console.log("reloading...")
    document.getElementById("stats").textContent="reloading..."
    load_occurring = true;
    clearField();
    loadData();
    drawField(flowers, butterflies);
    if (update_loop) {
        clearInterval(update_loop)
    }
    launch();
}

function init() {
    setTimeout(function () {
        d3.json("resources/settings.json").then(function (data) {
            dataset = data
            drawGrass();
            if (debug) {
                drawGrid();
            }
            loadData();
            drawField(flowers, butterflies, debug);
            free_butterflies = 10;
            addEventListener();
        });
    }, 500);
}

i = 0
function loop() {
    if (free_butterflies > 0) {
        i = i + 1;
        console.log("moving butterflies..." + (i));
        nextButterflyFlowerArrangement();
        butterflies = updateButterflyCoords(butterflies, flowers);
        updateField(butterflies);
    } else {
        console.log("all butterflies have been caught");
        document.getElementById("stats").textContent = "all butterflies have been caught";
        clearInterval(update_loop);
    }
}
j = 0
function updateFreeButterflies() {
    free_butterflies--;
    console.log("butterfly caught! remaining: " + free_butterflies);
    document.getElementById("stats").textContent = free_butterflies + " butterflies remaining.";
}

update_loop = null;
function launch() {
    if (update_loop) {
        clearInterval(update_loop)
    }
    free_butterflies = 10;
    i = 0;
    setTimeout(function () {
        if (load_occurring) {
            j = j + 1
            console.log("j: " + j)
            document.getElementById("stats").textContent = free_butterflies + " butterflies remaining.";
            update_loop = setInterval(loop, updatefrequency);
            load_occurring = false;
        }
    }, 2000);
}

init();
load_occurring = true;
launch();