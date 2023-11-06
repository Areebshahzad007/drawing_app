// Spirograph Tool Constructor
function SpirographTool() {
    // Set an icon and a name for the object
    this.icon = "assets/spirograph.jpg";
    this.name = "spirograph";

    // Initialize the radius, number of teeth, stroke width, shape, and angle variables
    let radius = 100; // radius of the spirograph or the size of the square
    let numTeeth = 20; // number of teeth in the spirograph
    let strokeWidth = 1; // stroke width of the spirograph or the square
    let shape = "spirograph"; // default shape is spirograph
    let angle = 0; // angle for the rotation of the square

    // Define the draw function for the tool
    this.draw = function () {
        if (shape === "spirograph") {
            if (mouseIsPressed && mousePressOnCanvas()) { // Draw only if mouse is pressed
                // Set the stroke weight
                strokeWeight(strokeWidth);

                // Translate to the mouse position
                translate(mouseX, mouseY);

                // Iterate through 360 degrees and draw each tooth
                for (let i = 0; i < 360; i += 360 / numTeeth) {
                    let r = sin(angle + i) * radius; // calculate the radius for each tooth
                    let x = r * cos(i); // calculate the x coordinate for the tooth
                    let y = r * sin(i); // calculate the y coordinate for the tooth
                    point(x, y); // draw the tooth
                }

                // Increment the angle
                angle += 0.05;
            }
        } else if (shape === "square") {
            if (mouseIsPressed && mousePressOnCanvas()) { // Draw only if mouse is pressed
                push();
                noFill();
                strokeWeight(strokeWidth);
                if (mouseIsPressed) { // Add this check to ensure the square is only drawn when the mouse is pressed
                    translate(mouseX, mouseY);
                }
                rotate(angle);
                let rectX = (mouseX / 30); // calculate the size of the square based on the mouseX position
                rect(-rectX, rectX, 60, 60); // draw the square
                pop();

                // Increment the angle
                angle += 0.05;
            }
        } else if (shape === "flower") {
            if (mouseIsPressed && mousePressOnCanvas()) { // Draw only if mouse is pressed
                push();
                strokeWeight(strokeWidth);
                noFill();
                if (mouseIsPressed) { // Add this check to ensure the flower is only drawn when the mouse is pressed
                    translate(mouseX, mouseY);
                }
                rotate(angle);
                let petalSize = (mouseX / 30); // calculate the size of the petals based on the mouseX position
                for (let i = 0; i < 10; i++) { // draw 10 petals
                    curve(0, petalSize * 2, petalSize, petalSize, petalSize * 2, petalSize * 2, 0, 0); // draw the petal using a Bezier curve
                    rotate(PI / 5); // rotate by 36 degrees for the next petal
                }
                pop();

                // Increment the angle
                angle += 0.05;
            }
        }
    };


    // check if mouse press is on canvas
    function mousePressOnCanvas() {
        if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
            return true;
        }
        return false;
    };


    // Populate the options menu with sliders for radius, number of teeth, and stroke width
    // and three options to select the shape
    this.populateOptions = function () {
        select(".options").html(
            "<label class='spirolabel' for='radiusSlider'>Radius:</label>" +
            "<input type='range' class='Sliders' id='radiusSlider' min='50' max='200' value='" + radius + "'>" +
            "<br><br>" +
            "<label class='spirolabel' for='teethSlider'>Number of Teeth:</label>" +
            "<input  class='Sliders' type='range' id='teethSlider' min='5' max='50' value='" + numTeeth + "'>" +
            "<br><br>" +
            "<label class='spirolabel3' for='strokeWidthSlider'>Stroke Width:</label>" +
            "<input type='range' class='Sliders3' id='strokeWidthSlider' min='1' max='10' value='" + strokeWidth + "'>" +
            "<br><br>" +
            "<label  class='label' for='shapeSelect'>Shape:</label>" +
            "<br>" +
            "<select id='shapeSelect'>" +
            "<option value='spirograph'>Spirograph</option>" +
            "<option value='square'>Square</option>" +
            "<option value='flower'>Flower</option>" +
            "</select>"
        );

        // Update the radius, number of teeth, and stroke width variables when the sliders are moved
        select("#radiusSlider").input(function () {
            radius = this.value();
        });

        select("#teethSlider").input(function () {
            numTeeth = this.value();
        });
        select("#strokeWidthSlider").input(function () {
            strokeWidth = this.value();
        });

        // Update the selected shape when the option is changed
        select("#shapeSelect").changed(function () {
            shape = this.value();
        });
    };

    // Clear the options menu when the tool is unselected
    this.unselectTool = function () {
        select(".options").html("");
        shape = "spirograph";
    };
};
