// canvasEvents.js

export function initializeCanvasEvents(canvas, context, grid, gridInfo, colorPicker, state) {
    
        // Función para establecer el color de una celda
        function setCellColor(index, color) {
            // Convertir color hexadecimal a entero (ejemplo: '#FF5733' => 0xFF5733)
            const colorInt = parseInt(color.slice(1), 16);
            state[index] = colorInt;
        }
    
        // Función para obtener el color de una celda
        function getCellColor(index) {
            const colorInt = state[index];
            // Convertir entero a color hexadecimal (ejemplo: 0xFF5733 => '#FF5733')
            return '#' + colorInt.toString(16).padStart(6, '0');
        }
        let isMouseDown = false;
        let isDrawing = false;

        canvas.addEventListener('mousedown', function(event) {
            if (event.button === 0) { // Verifica si es el botón izquierdo (0 es el botón izquierdo)
                isMouseDown = true;
            }
        });

        // Evento cuando se suelta el botón del ratón
        canvas.addEventListener('mouseup', function(event) {
            if (event.button === 0) { // Verifica si es el botón izquierdo
                isMouseDown = false;
            }
        });

        // Opcional: También considera "mouseleave" para cuando el ratón sale del canvas
        canvas.addEventListener('mouseleave', function() {
            isMouseDown = false;
        });

        canvas.addEventListener('touchstart', function(event) {
            isDrawing = true;
        });

        canvas.addEventListener('touchend', function(event) {
            isDrawing = false;

            // Prevenir el comportamiento por defecto
            event.preventDefault();
        });

        // Opcional: También puedes prevenir el desplazamiento al salir del canvas durante el toque
        canvas.addEventListener('touchcancel', function(event) {
            isDrawing = false;

            // Prevenir el comportamiento por defecto
            event.preventDefault();
        });


        function eFunc(event) {
            if (event.type == "mousemove" && ! isMouseDown) return;
            if (event.type == "touchmove" && isDrawing) {
                event.preventDefault();

                const touch = event.touches[0];
                const rect = canvas.getBoundingClientRect();
                const x = touch.clientX - rect.left;
                const y = touch.clientY - rect.top;
                const { coordX, coordY } = grid.getCellCoordinates(x, y);
                const color = colorPicker.getSelectedColor();
                context.fillStyle = color;
                context.clearRect(coordX * grid.cellWidth, coordY * grid.cellHeight, grid.cellWidth, grid.cellHeight);
                context.fillRect(coordX * gridInfo.cellWidth, coordY * gridInfo.cellHeight, gridInfo.cellWidth, gridInfo.cellHeight);
                setCellColor(coordY * gridInfo.numCols + coordX, color);
                return;
            }
            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;
            const x = (event.clientX - rect.left) * scaleX;
            const y = (event.clientY - rect.top) * scaleY;
    
            const { coordX, coordY } = grid.getCellCoordinates(x, y);      
            const color = colorPicker.getSelectedColor();
            context.fillStyle = color;
            context.clearRect(coordX * grid.cellWidth, coordY * grid.cellHeight, grid.cellWidth, grid.cellHeight);
            context.fillRect(coordX * gridInfo.cellWidth, coordY * gridInfo.cellHeight, gridInfo.cellWidth, gridInfo.cellHeight);
            setCellColor(coordY * gridInfo.numCols + coordX, color);
        }

    canvas.addEventListener('click', eFunc);
    canvas.addEventListener('mousemove', eFunc);
    canvas.addEventListener('touchmove', eFunc)
}
