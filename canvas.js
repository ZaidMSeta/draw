
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const shapeSelector = document.getElementById("shape");
const colorPicker = document.getElementById("color");
const sizeSlider = document.getElementById("size");
const undoButton = document.getElementById("undo");
const clearButton = document.getElementById("clear");


canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.7;
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);


let shapes = [];

class Shape {
    constructor(x, y, size, color, type) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.type = type;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        if (this.type === "circle") {
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        } else if (this.type === "square") {
            ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
        } else if (this.type === "triangle") {
            ctx.moveTo(this.x, this.y - this.size);
            ctx.lineTo(this.x - this.size, this.y + this.size);
            ctx.lineTo(this.x + this.size, this.y + this.size);
            ctx.closePath();
        }
        ctx.fill();
    }
}

function redrawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    shapes.forEach(shape => shape.draw());
}

canvas.addEventListener("click", (e) => {
    const size = parseInt(sizeSlider.value);
    const color = colorPicker.value;
    const type = shapeSelector.value;
    const x = e.offsetX;
    const y = e.offsetY;
    
    const shape = new Shape(x, y, size, color, type);
    shapes.push(shape);
    shape.draw();
    saveToLocalStorage();
});

undoButton.addEventListener("click", () => {
    shapes.pop();
    redrawCanvas();
    saveToLocalStorage();
});

clearButton.addEventListener("click", () => {
    shapes = [];
    redrawCanvas();
    saveToLocalStorage();
});

function saveToLocalStorage() {
    localStorage.setItem("shapes", JSON.stringify(shapes));
}

function loadFromLocalStorage() {
    const storedShapes = JSON.parse(localStorage.getItem("shapes"));
    if (storedShapes) {
        shapes = storedShapes.map(s => new Shape(s.x, s.y, s.size, s.color, s.type));
        redrawCanvas();
    }
}

window.onload = loadFromLocalStorage;


