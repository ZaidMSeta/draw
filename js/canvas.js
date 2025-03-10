/**
 * Abderahman Mohammed, mohaa220, 400578814
 * Zaid Seta, setaz, 400591432
 * 
 * Created: 8/03/2025
 * 
 * 
 */

window.addEventListener('load', () => {

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const shapeSelector = document.getElementById("shape");
    const colorPicker = document.getElementById("color");
    const sizeSlider = document.getElementById("size");
    const sizeValue = document.getElementById("sizeValue"); 
    const undoButton = document.getElementById("undo");
    const clearButton = document.getElementById("clear");
    
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.7;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    let shapes = [];
    /**
     * This class stores all the constructor for each shape, dictating the position, size, actual shape and colour. 
     * It then draws them on the canvas using the draw method
     */
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

                const height = (Math.sqrt(3) / 2) * this.size; 

                ctx.moveTo(this.x, this.y - height / 2);
                ctx.lineTo(this.x - this.size / 2, this.y + height / 2);
                ctx.lineTo(this.x + this.size / 2, this.y + height / 2);
                ctx.closePath();
            }


            ctx.fill();
        }
    }
    /**
     * redrawCanvas() redraws the canvas using the array of shapes whenever needed
     * called for the undo button, clear button, and if the website is refreshed
     */
    function redrawCanvas() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        shapes.forEach(shape => shape.draw());
    }
    


    sizeSlider.addEventListener('input', () => {
        sizeValue.textContent = sizeSlider.value;
    });
    
    /**
     * This event listener calls the draw method when the canvas is clicked, using the values selected from the controls 
     */
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
    /**
     * This event listener removes the last shape from the array when the undo button is clicked, removing it from the canvas
     */
    undoButton.addEventListener("click", () => {
        shapes.pop();

        redrawCanvas();
        saveToLocalStorage();
    });
    /**
     * This event listener removes all shapes from the array when the clear button is clicked, clearing the canvas
     */
    clearButton.addEventListener("click", () => {
        shapes = [];
        redrawCanvas();
        saveToLocalStorage();

    });
    /**
     * This function stores the shapes array into the localStorage
     */
    function saveToLocalStorage() {
        localStorage.setItem("shapes", JSON.stringify(shapes));


    }
    /**
     * This function takes the json string of shapes from localStorage and rebuilds the shapes array using the Shape class
     */
    function loadFromLocalStorage() {
        const storedShapes = JSON.parse(localStorage.getItem("shapes"));
        if (storedShapes) {

            shapes = storedShapes.map(s => new Shape(s.x, s.y, s.size, s.color, s.type));
            redrawCanvas();
        }
    }
    
    loadFromLocalStorage(); 
});

