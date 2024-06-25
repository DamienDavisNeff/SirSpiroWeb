const maxGrid = [6,6,]; // Maximum Grid Size (Rows, Column)
const rotation = [-180,180]; // Starting Rotation Range (in Degrees)
const scale = [0.5,1.5]; // Scale Multiplier
const duration = 14000; // Duration (in Milleseconds)

var grid = [0,0];
var gridSize = [0,0];

function CalculateGrid() {
    // All Sorted As (Rows, Column)
    const _grid = [
        Math.floor(window.innerHeight/100),
        Math.floor(window.innerWidth/100),
    ]; // Temporary Grid To Calculate Ideal Grid
    grid = [
        (_grid[0] <= maxGrid[0]) ? _grid[0] : maxGrid[0],
        (_grid[1] <= maxGrid[1]) ? _grid[1] : maxGrid[1],
    ]; // Permament Grid Including Max Sizes
    gridSize = [
        Math.floor(window.innerHeight / grid[0]),
        Math.floor(window.innerWidth / grid[1]),
    ]; // Size of Each Grid Cell
}

// Function to create a floating triangle
function createTriangle(row, col) {

    const triangle = document.createElement('div');
    triangle.classList.add('triangle');

    triangle.style.top = `${row * gridSize[0] + random(-gridSize[0]/2, gridSize[0]/2)}px`;
    triangle.style.left = `${col * gridSize[1] + random(-gridSize[1]/2, gridSize[1]/2)}px`;
    triangle.style.rotate = `${random(rotation[0],rotation[1])}deg`;

    document.querySelector('.floating-triangles').appendChild(triangle);

    animateTriangle(triangle);

}

function animateTriangle(triangle) {
    anime({
        targets: triangle,
        translateX: () => `${random(-gridSize[0], gridSize[0])}px`,
        translateY: () => `${random(-gridSize[1], gridSize[1])}px`,
        rotate: () => `${random(rotation[0], rotation[1])}deg`,
        scale: () => random(scale[0], scale[1]),
        easing: 'easeInOutQuad',
        duration: () => duration,
        direction: 'alternate',
        loop: false,
        complete: () => animateTriangle(triangle),
    });
}

function CreateTriangles() {
    // Create triangles in a grid pattern
    for (let row = 0; row < grid[0]; row++) {
        for (let col = 0; col < grid[1]; col++) {
            createTriangle(row, col);
        }
    }
}

function ReCalculateTriangles() {
    ClearTriangles();
    CalculateGrid();
    CreateTriangles();
} ReCalculateTriangles();

function ClearTriangles() {
    const triangles = document.querySelectorAll(".triangle");
    triangles.forEach(element => {
        element.remove();
    });
}

window.addEventListener("resize", function() {
    ReCalculateTriangles();
});