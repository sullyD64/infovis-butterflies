# Infovis-butterflies

First assignment for the 2019 InfoVis course i'm attending at Roma Tre University.
The main goal is to fiddle and experiment with Javascript, D3.js and SVG.

In particular, the exercise is to draw 10 butterflies, which are on 10 flowers distributed on the drawing area; periodically, the butterflies swap positions flying between flowers. The flowers' arrangement and the butterfly-flower pairings are stored in a json file, with 10 possible configurations which cycle continuously. By pressing "r" anywhere, the mouse cursor becomes a net which allows to catch the butterflies.

## Features

The demo has the following features:

- Responsive SVG canvas, to preserve aspect ratio even when width and height are changed;
- Randomly generated vegetation;
- Flowers are drawn on a 6x4 grid; the flower's arrangement is chosen randomly between 10 possible arrangements;
- Periodically, a new flower is chosen for each butterfly by randomly picking from 10 possible paring lists;
- Butterflies position are guessed by querying the pairing list (which consists of _(butterfly_id, flower_id)_ pairs) and getting the flower's coordinates on the grid.
- The random choice doesn't allow the current layout to be selected again, so everytime there is a different configuration.
- **Debug mode** switchable by setting `debug=true` in main.js: in debug mode, grid lines and id labels are drawn.
- Butterfly update frequency is set to 1.5 second by default; value is stored in `updateFrequency` in main.js.
- **Capture mode**: switchable by pressing "r" anywhere in the page. The mouse cursor becomes a net and it becomes possible to catch butterflies by hovering on them. A counter shows the number of the remaining butterflies.
- **Reset button**: resets the whole scene, by picking a _new_ flower arrangement and reinitializing the butterflies. The reset lasts two seconds, the scene can't be reset again if a reset is occurring.
