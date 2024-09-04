// canvasEvents.js

export function initializeCanvasEvents(canvas, context, grid, gridInfo, colorPicker, state) {
    
    // Función para establecer el color de una celda
    function setCellColor(index, color) {
        const colorInt = parseInt(color.slice(1), 16);
        state[index] = colorInt;
    }

    // Función para obtener el color de una celda
    function getCellColor(index) {
        const colorInt = state[index];
        return '#' + colorInt.toString(16).padStart(6, '0');
    }

    let isMouseDown = false;
    let isDrawing = false;
    let animationFrameId = null;
    
    // Variables para almacenar las coordenadas
    let lastX = null;
    let lastY = null;
    let currentColor;

    // Función para dibujar una línea entre dos puntos (incluso con casillas)
    function drawLine(x0, y0, x1, y1) {
        const dx = Math.abs(x1 - x0);
        const dy = Math.abs(y1 - y0);
        const sx = (x0 < x1) ? 1 : -1;
        const sy = (y0 < y1) ? 1 : -1;
        let err = dx - dy;

        while (true) {
            const { coordX, coordY } = grid.getCellCoordinates(x0, y0);
            context.fillStyle = currentColor;
            context.clearRect(coordX * grid.cellWidth, coordY * grid.cellHeight, grid.cellWidth, grid.cellHeight);
            context.fillRect(coordX * gridInfo.cellWidth, coordY * gridInfo.cellHeight, gridInfo.cellWidth, gridInfo.cellHeight);
            setCellColor(coordY * gridInfo.numCols + coordX, currentColor);

            if (x0 === x1 && y0 === y1) break;

            const e2 = 2 * err;
            if (e2 > -dy) {
                err -= dy;
                x0 += sx;
            }
            if (e2 < dx) {
                err += dx;
                y0 += sy;
            }
        }
    }

    // Función para iniciar el dibujo
    function startDrawing(x, y) {
        isDrawing = true;
        lastX = x;
        lastY = y;
        currentColor = colorPicker.getSelectedColor();
        requestAnimationFrame(draw);
    }

    // Función para detener el dibujo
    function stopDrawing() {
        isDrawing = false;
        cancelAnimationFrame(animationFrameId);
    }

    // Función para actualizar las coordenadas
    function updateCoordinates(x, y) {
        drawLine(lastX, lastY, x, y); // Dibujar una línea entre el último punto y el actual
        lastX = x;
        lastY = y;
    }

    // Función de animación
    function draw() {
        if (!isDrawing) return;

        animationFrameId = requestAnimationFrame(draw);
    }

    // Eventos de ratón
    canvas.addEventListener('mousedown', function(event) {
        if (event.button === 0) {
            const rect = canvas.getBoundingClientRect();
            const x = (event.clientX - rect.left) * (canvas.width / rect.width);
            const y = (event.clientY - rect.top) * (canvas.height / rect.height);
            startDrawing(x, y);
        }
    });

    canvas.addEventListener('mousemove', function(event) {
        if (!isDrawing) return;
        const rect = canvas.getBoundingClientRect();
        const x = (event.clientX - rect.left) * (canvas.width / rect.width);
        const y = (event.clientY - rect.top) * (canvas.height / rect.height);
        updateCoordinates(x, y);
    });

    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);

    // Eventos táctiles
    canvas.addEventListener('touchstart', function(event) {
        if (event.touches.length === 1) {  // Solo dibujar si hay un solo dedo tocando la pantalla
            const rect = canvas.getBoundingClientRect();
            const touch = event.touches[0];
            const x = touch.clientX - rect.left;
            const y = touch.clientY - rect.top;
            startDrawing(x, y);
            event.preventDefault();  // Prevenir el comportamiento por defecto del navegador
        }
    });

    canvas.addEventListener('touchmove', function(event) {
        if (event.touches.length === 1 && isDrawing) {  // Solo dibujar si hay un solo dedo
            const rect = canvas.getBoundingClientRect();
            const touch = event.touches[0];
            const x = touch.clientX - rect.left;
            const y = touch.clientY - rect.top;
            updateCoordinates(x, y);
            event.preventDefault();  // Prevenir el comportamiento por defecto del navegador
        }
    });

    canvas.addEventListener('touchend', stopDrawing);
    canvas.addEventListener('touchcancel', stopDrawing);
}
