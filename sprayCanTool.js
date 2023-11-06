//Constructor function for SprayCanTool
function SprayCanTool() {

    this.name = "sprayCanTool";
    this.icon = "assets/sprayCan.jpg";

    // default values for spray can options
    var points = 13;
    var spread = 10;
    var spraySize = 10;

    // clear options when unselecting tool
    this.unselectTool = function () {
        select(".options").html("");
    };

    // check if mouse press is on canvas
    function mousePressOnCanvas() {
        if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
            return true;
        }
        return false;
    };

    // create sliders for spray can options
    this.populateOptions = function () {
        select(".options").html(
            "<label class='spraylabel1' for='spraySizeSlider'>Spray Size:</label>" +
            "<input type='range' class='Sliders' id='spraySizeSlider' min='1' max='20' value='" + spraySize + "'>" +
            "<br><br>" +
            "<label class='spraylabel2'for='spreadSlider'>Spread:</label>" +
            "<input type='range' class='Sliders' id='spreadSlider' min='1' max='20' value='" + spread + "'>" +
            "<br><br>"
        );

        // update spraySize and spread when slider values change
        select("#spraySizeSlider").input(function () {
            spraySize = this.value();
        });
        select("#spreadSlider").input(function () {
            spread = this.value();
        });
    };

    // draw the spray can
    this.draw = function () {
        if (mouseIsPressed && mousePressOnCanvas()) {
            for (var i = 0; i < points; i++) {
                var x = random(mouseX - spread, mouseX + spread);
                var y = random(mouseY - spread, mouseY + spread);
                ellipse(x, y, spraySize, spraySize);
            }
        }
    };
};
