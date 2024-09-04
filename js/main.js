// main.js

import { initializeColorPicker } from './colorPicker.js';
import { initializeGrid } from './grid.js';
import { initializeCanvasEvents } from './canvasEvents.js';

const canvas = document.getElementById('canv');
const context = canvas.getContext('2d');
const colorSelector = document.getElementById('form-color-selector');
const editButton = document.getElementById('edit-button');

const gridInfo = {
    "numRows" : 750,
    "numCols" : 400,
    "cellHeight" : 5,
    "cellWidth" : 5,
}
const state = new Uint32Array(gridInfo.numCols * gridInfo.numRows); // Cada celda puede almacenar un color de 32 bits (rgba)
const colorPicker = initializeColorPicker(colorSelector, editButton);
const grid = initializeGrid(canvas, context, gridInfo.numCols, gridInfo.numRows, gridInfo.cellWidth, gridInfo.cellHeight, state);
initializeCanvasEvents(canvas, context, grid, gridInfo, colorPicker, state);
