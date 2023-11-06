// Define BrushTool object
function BrushTool() {
    // Set icon and name for BrushTool
    this.icon = "assets/brush.jpg";
    this.name = "Brush";

    // Set initial brush size
    var brushSize = 10;

    // Set variables for drawing brush strokes
    var previousMouseX = -1;
    var previousMouseY = -1;

    // Draw a brush stroke
    function drawBrush(x1, y1, x2, y2) {
        // Calculate the distance between two points
        var distance = dist(x1, y1, x2, y2);

        // Set number of segments based on distance
        var segments = int(distance / 4);

        // Set random curve variables
        var curveX = random(-brushSize / 4, brushSize / 4);
        var curveY = random(-brushSize / 4, brushSize / 4);
        var curveW = random(1, 3);

        // Draw the brush stroke
        push();
        strokeWeight(brushSize);
        strokeCap(ROUND);
        for (var i = 0; i <= segments; i++) {
            var px = lerp(x1, x2, i / segments) + curveX;
            var py = lerp(y1, y2, i / segments) + curveY;
            var pw = brushSize / curveW;
            if (i === 0) {
                line(px, py, px, py); // draw a single point at the beginning of the stroke
            } else {
                curve(x1, y1, px - pw, py - pw, px, py, x2, y2); // draw a curve between two points
            }
        }
        pop();
    };

    // Draw the brush stroke while the mouse is pressed
    this.draw = function () {
        if (mouseIsPressed) {
            // Check if previous X and Y are -1
            if (previousMouseX === -1) {
                // Set previous X and Y to current mouse X and Y
                previousMouseX = mouseX;
                previousMouseY = mouseY;
            } else {
                // Draw the brush stroke
                drawBrush(previousMouseX, previousMouseY, mouseX, mouseY);
                // Set previous X and Y to current mouse X and Y
                previousMouseX = mouseX;
                previousMouseY = mouseY;
            }
        } else {
            // Reset previous X and Y
            previousMouseX = -1;
            previousMouseY = -1;
        }
    };

    // Populate the options panel with a slider for adjusting brush size
    this.populateOptions = function () {
        select(".options").html(
            "<label class='brushlabel' for='brushSizeSlider'>Brush Size:</label>" +
            "<input type='range' class='Sliders' id='brushSizeSlider' min='1' max='50' value='" + brushSize + "'>" +
            "<br><br>"
        );

        // Update brush size when slider is moved
        select("#brushSizeSlider").elt.addEventListener("input", function () {
            brushSize = this.value;
        });
    };

    // Remove options panel
    this.unselectTool = function () {
        select(".options").html("");
    };
};
