function FreehandTool() {
    //set an icon and a name for the object
    this.icon = "assets/freehand.jpg";
    this.name = "freehand";

    //to smoothly draw we'll draw a line from the previous mouse location
    //to the current mouse location. The following values store
    //the locations from the last frame. They are -1 to start with because
    //we haven't started drawing yet.
    var previousMouseX = -1;
    var previousMouseY = -1;

    //the stroke weight for the line
    var strokeWeightVal = 1;

    this.draw = function () {
        push();
        //set the stroke weight
        strokeWeight(strokeWeightVal);

        //if the mouse is pressed
        if (mouseIsPressed) {
            //check if the previousX and Y are -1. set them to the current
            //mouse X and Y if they are.
            if (previousMouseX == -1) {
                previousMouseX = mouseX;
                previousMouseY = mouseY;
            }
            //if we already have values for previousX and Y we can draw a line from 
            //there to the current mouse location
            else {
                line(previousMouseX, previousMouseY, mouseX, mouseY);
                previousMouseX = mouseX;
                previousMouseY = mouseY;
            }
        }
        //if the user has released the mouse we want to set the previousMouse values 
        //back to -1.
        else {
            previousMouseX = -1;
            previousMouseY = -1;
        }
        pop();
    };

    //function to update the stroke weight when the slider changes
    function updateStrokeWeightVal(val) {
        strokeWeightVal = val;
    };

    this.unselectTool = function () {
        //clear options
        select(".options").html("");
    };

    this.populateOptions = function () {
        select(".options").html(
            "<label class='freehandlabel' for='strokeWeightSlider'>Stroke Weight:</label>" +
            "<input type='range'  class='Sliders' id='strokeWeightSlider' min='1' max='10' value='" + strokeWeightVal + "'>" +
            "<br><br>"
        );

        select("#strokeWeightSlider").input(function () {
            updateStrokeWeightVal(this.value());
        });
    };
};
