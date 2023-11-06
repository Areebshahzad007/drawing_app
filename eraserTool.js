function EraserTool() {
    
    // Set an icon and a name for the object
    this.icon = "assets/eraser.jpg";
    this.name = "Eraser";

    // Initialize variables for tracking previous mouse position and eraser size
    var previousMouseX = -1;
    var previousMouseY = -1;
    var eraserSize = 20;

    // Define the draw function for the tool
    this.draw = function () {

        // If the mouse is pressed, draw a line with the background color
        if (mouseIsPressed) {
            if (previousMouseX == -1) { // if this is the first time the mouse is pressed
                previousMouseX = mouseX;
                previousMouseY = mouseY;
            } else { // if the mouse has been pressed before
                push();
                stroke(backgroundColor); // set stroke color to background color
                strokeWeight(eraserSize);
                line(previousMouseX, previousMouseY, mouseX, mouseY);
                previousMouseX = mouseX;
                previousMouseY = mouseY;
                pop();
            }
        } else { // if the mouse is not pressed, reset previous mouse position
            previousMouseX = -1;
            previousMouseY = -1;
        }
    };

    // Clear the options menu when the tool is unselected
    this.unselectTool = function () {
        select(".options").html("");
    };

    // Populate the options menu with a slider for eraser size
    this.populateOptions = function () {
        select(".options").html(
            "<label class='eraserlabel' for='eraserSizeSlider'>Eraser Size:</label>" +
            "<input type='range' class='Sliders' id='eraserSizeSlider' min='5' max='50' value='" + eraserSize + "'>" +
            "<br><br>"
        );
        

        // Update the eraser size variable when the slider is moved
        select("#eraserSizeSlider").input(function () {
            eraserSize = this.value();
        });
    };
};
