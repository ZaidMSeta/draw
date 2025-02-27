// canvas-app.js: A simple drawing app using HTML5 Canvas

// Select elements
window.addEventListener("load", function () {

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const shapeSelector = document.getElementById("shape");
    const colorPicker = document.getElementById("color");
    const size = document.getElementById("size");
    const undoButton = document.getElementById("undo");
    const clearButton = document.getElementById("clear");

    // Canvas settings
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.5;
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Store drawn shapes
    let shapes = [];

    // Shape class
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

    function color() {


    }
    // Draw all stored shapes
    function redrawCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        shapes.forEach(shape => shape.draw());
    }

    // Add shape on click
    canvas.addEventListener("click", (e) => {
        const size = parseInt(size.value);
        const color = colorPicker.value;
        const type = shapeSelector.value;
        const x = e.offsetX;
        const y = e.offsetY;
        
        const shape = new Shape(x, y, size, color, type);
        shapes.push(shape);
        shape.draw();
        saveToLocalStorage();
    });

    // Undo last action
    undoButton.addEventListener("click", () => {
        shapes.pop();
        redrawCanvas();
        saveToLocalStorage();
    });

    // Clear canvas
    clearButton.addEventListener("click", () => {
        shapes = [];
        redrawCanvas();
        saveToLocalStorage();
    });

    // Save to local storage
    function saveToLocalStorage() {
        localStorage.setItem("shapes", JSON.stringify(shapes));
    }

    // Load from local storage
    function loadFromLocalStorage() {
        const storedShapes = JSON.parse(localStorage.getItem("shapes"));
        if (storedShapes) {
            shapes = storedShapes.map(s => new Shape(s.x, s.y, s.size, s.color, s.type));
            redrawCanvas();
        }
    }

    // Load stored data on page load
    window.onload = loadFromLocalStorage;
})