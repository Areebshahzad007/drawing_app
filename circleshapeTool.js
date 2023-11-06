function CircleShapeTool() {
    // Properties of the tool
    this.icon = "assets/circle.jpg";
    this.name = "Circle";

    // Variables to keep track of mouse positions and whether the tool is currently drawing
    var startMouseX = -1;
    var startMouseY = -1;
    var drawing = false;

    // Options for the tool
    var fillShape = true; // whether to fill the circle or not
    var strokeWeightVal = 1; // the stroke weight of the circle

    // Draw the circle to the screen
    this.draw = function () {
        // Only draw when mouse is clicked
        if (mouseIsPressed) {
            // If it's the start of drawing a new circle
            if (startMouseX == -1) {
                // Record the start of the circle and start drawing
                startMouseX = mouseX;
                startMouseY = mouseY;
                drawing = true;
                // Save the current pixel Array so we can update the screen later
                loadPixels();
            } else {
                // Update the screen with the saved pixels to hide any previous circle
                updatePixels();
                // Draw the circle with fill or nofill and the selected stroke weight
                push(); // Save the current drawing settings
                strokeWeight(strokeWeightVal);
                if (fillShape) {
                    // Filled circle
                    ellipse(startMouseX, startMouseY, mouseX - startMouseX, mouseY - startMouseY);
                } else {
                    // Outlined circle
                    noFill();
                    ellipse(startMouseX, startMouseY, mouseX - startMouseX, mouseY - startMouseY);
                }
                pop(); // Restore the previous drawing settings
            }
        } else if (drawing) {
            // Save the pixels with the most recent circle and reset the
            // drawing bool and start locations
            loadPixels();
            drawing = false;
            startMouseX = -1;
            startMouseY = -1;
        }
    };

    // When the tool is deselected, update the pixels to just show the drawing and also clear options
    this.unselectTool = function () {
        // Update the screen to just show the drawing
        updatePixels();
        // Clear options
        select(".options").html("");
    };

    // Add options for the tool
    this.populateOptions = function () {
        // Add a button to toggle fill/no fill
        select(".options").html(
            "<button id='fillButton'>No Fill</button><br>" +
            "<label class='circlelabel' for='strokeSlider'>Stroke Weight:</label><br>" +
            "<input type='range' id='strokeSlider' min='1' max='20' value='1'>"
        );
        // When the fill button is clicked, toggle the fillShape variable and update the button text
        select("#fillButton").mouseClicked(function () {
            var button = select("#" + this.elt.id);
            fillShape = !fillShape; // toggle fillShape between true and false
            if (fillShape) {
                button.html('No Fill');
            } else {
                button.html('Fill');
            }
        });
        // When the stroke slider is changed, update the strokeWeightVal variable
        select("#strokeSlider").input(function () {
            strokeWeightVal = this.value();
        });
    };
};
