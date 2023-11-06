function RectangleTool() {
    // Define properties of the RectangleTool object
    this.icon = "assets/rectangle.jpg";
    this.name = "Rectangle";

    // Define variables to store the starting mouse position, drawing state, fill shape state, and stroke weight
    var startMouseX = -1;
    var startMouseY = -1;
    var drawing = false;
    var fillShape = true;
    var strokeWeightVal = 1;

    // Define a method to draw the rectangle on the canvas
    this.draw = function () {

        // Only draw when the mouse is pressed
        if (mouseIsPressed) {
            // If it's the start of drawing a new rectangle
            if (startMouseX == -1) {
                startMouseX = mouseX;
                startMouseY = mouseY;
                drawing = true;

                // Save the current pixel array to be updated later
                loadPixels();
            } else {
                // Update the screen with the saved pixels to hide any previous rectangle
                updatePixels();

                // Draw the rectangle with fill or nofill and the selected stroke weight
                push();
                strokeWeight(strokeWeightVal);
                if (fillShape) {
                    rect(startMouseX, startMouseY, mouseX - startMouseX, mouseY - startMouseY);
                } else {
                    noFill();
                    rect(startMouseX, startMouseY, mouseX - startMouseX, mouseY - startMouseY);
                }
                pop();
            }
        } else if (drawing) {
            // Save the pixels with the most recent rectangle and reset the
            // drawing bool and start locations
            loadPixels();
            drawing = false;
            startMouseX = -1;
            startMouseY = -1;
        }
    };

    // Define a method to update the pixels and clear the options when the tool is deselected
    this.unselectTool = function () {
        updatePixels();
        // Clear options
        select(".options").html("");
    };

    // Define a method to populate the options for the RectangleTool
    this.populateOptions = function () {
        select(".options").html(
            "<button id='fillButton'>No Fill</button><br>" +
            "<label class='rectlabel' for='strokeSlider'>Stroke Weight:</label><br>" +
            "<input type='range' id='strokeSlider' min='1' max='20' value='1'>"
        );

        // Define a function for the button click event to toggle the fillShape variable
        select("#fillButton").mouseClicked(function () {
            var button = select("#" + this.elt.id);
            if (fillShape) {
                fillShape = false; // toggle fillShape to false
                button.html('Fill');
            } else {
                // toggle fillShape to true
                button.html('No Fill');
                fillShape = true;
            }
        });

        // Define a function for the input event of the stroke weight slider to update the strokeWeightVal variable
        select("#strokeSlider").input(function () {
            strokeWeightVal = this.value();
        });
    };
};
