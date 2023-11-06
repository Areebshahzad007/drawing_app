function LineToTool() {
    // Tool properties
    this.icon = "assets/lineTo.jpg";
    this.name = "LineTo";

    // Mouse and drawing state
    var startMouseX = -1;
    var startMouseY = -1;
    var drawing = false;

    // Default line size
    var lineSize = 1;

    // Draw the line to the screen
    this.draw = function () {
        push();
        // Only draw when mouse is clicked
        if (mouseIsPressed) {
            // If it's the start of drawing a new line
            if (startMouseX == -1) {
                startMouseX = mouseX;
                startMouseY = mouseY;
                drawing = true;

                // Save the current pixel Array
                loadPixels();
            } else {
                // Update the screen with the saved pixels to hide any previous
                // line between mouse pressed and released
                updatePixels();

                // Draw the line with the selected line size
                strokeWeight(lineSize);
                line(startMouseX, startMouseY, mouseX, mouseY);
            }
        } else if (drawing) {
            // Save the pixels with the most recent line and reset the
            // drawing bool and start locations
            loadPixels();
            drawing = false;
            startMouseX = -1;
            startMouseY = -1;
        }
        pop();
    };

    // Add an options menu to change the line size
    this.unselectTool = function () {
        // Clear options
        select(".options").html("");
    };

    this.populateOptions = function () {
        // Create slider for line size
        select(".options").html(
            "<label class='linelabel' for='lineSizeSlider'>Line Size:</label>" +
            "<input type='range' class='Sliders'  id='lineSizeSlider' min='1' max='10' value='" + lineSize + "'>" +
            "<br><br>"
        );

        // Update lineSize when slider value changes
        select("#lineSizeSlider").input(function () {
            lineSize = this.value();
        });
    };
};
