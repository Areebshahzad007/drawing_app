// Declare an array to store the current shape being drawn
var currentShape = [];

// Define the FreeshapeTool object
function EditableshapeTool() {

    // Set an icon and a name for the object
    this.icon = "assets/freeshape.jpg";
    this.name = "freeshape";

    // Declare variables to manage editing mode and shape storage
    var editMode = false;
    var shapes = [];

    // Define a function to draw the tool
    this.draw = function () {
        // Update the canvas and check for mouse input
        updatePixels();
        if (mousePressOnCanvas() && mouseIsPressed) {
            if (!editMode) {
                // Add a vertex to the currentShape array when in adding mode
                currentShape.push({
                    x: mouseX,
                    y: mouseY
                });
            } else {
                // Move a vertex to the mouse position when in editing mode
                for (var i = 0; i < currentShape.length; i++) {
                    if (dist(currentShape[i].x, currentShape[i].y, mouseX, mouseY) < 15) {
                        currentShape[i].x = mouseX;
                        currentShape[i].y = mouseY;
                    }
                }
            }
        }
        push();
        // Draw the current shape and highlight vertices if in editing mode
        noFill();
        beginShape();
        for (var i = 0; i < currentShape.length; i++) {
            vertex(currentShape[i].x, currentShape[i].y);
            if (editMode) {
                fill('red');
                ellipse(currentShape[i].x, currentShape[i].y, 10);
                noFill();
            }
        }
        endShape();
        pop();
    };

    // Define a function to clear the options when the tool is deselected
    this.unselectTool = function () {
        // Add the completed shape to the shapes array and reset the current shape
        if (currentShape.length > 0) {
            shapes.push(currentShape);
            currentShape = [];
        }
        // Clear the options panel
        select(".options").html("");
    };

    // Define a function to check if the mouse is pressed on the canvas
    function mousePressOnCanvas() {
        // Check if the mouse is within the bounds of the canvas
        if (mouseX > 0 && mouseX < (width) && mouseY > 0 && mouseY < (height)) {
            return true;
        }
        return false;
    }

    // Define a function to populate the options panel
    this.populateOptions = function () {
        // Add buttons to switch between editing and adding mode and to finish the shape
        select(".options").html(
            "<button id='editButton'>Edit Shape</button>" +
            "<button id='finishButton'>Finish</button>"
        );

        // Click handler for the finish button
        select("#finishButton").mouseClicked(function () {
            // Finish editing the shape and reset the current shape
            editMode = false;
            currentShape = [];
            loadPixels();
        });

        // Click handler for the direction button
        select("#editButton").mouseClicked(function () {
            var button = select("#" + this.elt.id);
            if (editMode) {
                // Switch to vertex adding mode and update the button text
                editMode = false;
                button.html("Edit Shape");
            } else {
                // Switch to vertex editing mode and update the button text
                editMode = true;
                button.html("Add Vertices");
            }
        });
    };
};
