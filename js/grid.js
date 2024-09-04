// grid.js

export function initializeGrid(canvas, context, numColumns, numRows, cellWidth, cellHeight, state) {
    function fillGrid() {
        for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < numColumns; j++) {
                const index = i * numColumns + j;
                const colorInt = state[index];
                const colorHex = '#' + colorInt.toString(16).padStart(6, '0');
    
                context.fillStyle = colorHex;
                context.clearRect(j * cellWidth, i * cellHeight, cellWidth, cellHeight)
                context.fillRect(j * cellWidth , i * cellHeight , cellWidth , cellHeight );
            }
        }
    }

    function resizeCanvas() {
        canvas.width = cellWidth * numColumns;
        canvas.height = cellHeight * numRows;

        fillGrid();
        /*for (let i = 0; i <= numColumns; i++) {
            const x = i * cellWidth;
            context.beginPath();
            context.moveTo(x, 0);
            context.lineTo(x, canvas.height);
            //context.stroke();
        }

        for (let j = 0; j <= numRows; j++) {
            const y = j * cellHeight;
            context.beginPath();
            context.moveTo(0, y);
            context.lineTo(canvas.width, y);
            //context.stroke();
        }*/
        
    }

    resizeCanvas();

    window.addEventListener('resize', resizeCanvas);

    return {
        getCellCoordinates: (x, y) => {
            const coordX = Math.floor(x / cellWidth);
            const coordY = Math.floor(y / cellHeight);
            return { coordX, coordY };
        }
    };
}
