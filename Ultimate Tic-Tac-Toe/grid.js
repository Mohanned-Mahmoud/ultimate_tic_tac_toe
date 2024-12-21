// JavaScript for Highlighting Grids Only
document.addEventListener('DOMContentLoaded', () => {
    const outerBoard = document.getElementById('outer-board');
    let currentGrid = null; // Active grid

    // Generate 9 mini-grids
    for (let i = 1; i <= 9; i++) {
        const miniGrid = document.createElement('div');
        miniGrid.classList.add('mini-grid');
        miniGrid.id = `grid-${i}`;

        // Generate 9 cells for each mini-grid
        for (let j = 1; j <= 9; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.cell = `${i}-${j}`; // Unique identifier for each cell
            cell.addEventListener('click', handleCellClick);
            miniGrid.appendChild(cell);
        }

        // Append the mini-grid to the outer board
        outerBoard.appendChild(miniGrid);
    }

    // Handle cell click (highlight grids)
    function handleCellClick(e) {
        const cell = e.target;
        const parentGrid = cell.closest('.mini-grid');

        // Highlight the active grid (current grid)
        if (currentGrid) {
            currentGrid.classList.remove('active-grid');
        }
        currentGrid = parentGrid;
        currentGrid.classList.add('active-grid');

        // Highlight the next grid based on the clicked cell
        const nextGridIndex = cell.dataset.cell.split('-')[1];
        highlightNextGrid(nextGridIndex);
    }

    // Highlight the next playable grid
    function highlightNextGrid(nextGridIndex) {
        // Remove the "next-grid" class from all grids
        const allGrids = document.querySelectorAll('.mini-grid');
        allGrids.forEach(grid => grid.classList.remove('next-grid'));

        // Highlight the next grid
        const nextGrid = document.getElementById(`grid-${nextGridIndex}`);
        if (nextGrid) {
            nextGrid.classList.add('next-grid');
        }
    }

    // Restart the game
    const restartButton = document.getElementById('restart-button');
    restartButton.addEventListener('click', restartGame);

    function restartGame() {
        // Clear all highlights
        const allGrids = document.querySelectorAll('.mini-grid');
        allGrids.forEach(grid => {
            grid.classList.remove('active-grid', 'next-grid');
        });

        currentGrid = null; // Reset the active grid
    }
});
