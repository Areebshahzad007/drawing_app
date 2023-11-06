function StampTool() {
    //set an icon and a name for the object
    this.icon = "assets/stamp.jpg";
    this.name = "stamp";

    //the image to use as the stamp
    var stampImg = null;

    //boolean flag to check if stamp has already been drawn
    var stampDrawn = false;

    //function to load the stamp image
    this.loadStampImg = function (imgPath) {
        stampImg = loadImage(imgPath, function () {
            stampDrawn = false; //reset stampDrawn flag when a new stamp is selected
        });
    };

    //function to draw the stamp at the mouse location
    this.drawStamp = function () {
        if (stampImg && !stampDrawn) {
            image(stampImg, mouseX, mouseY, stampImg.width / 4, stampImg.height / 4);
            stampDrawn = true;
        }
    };

    this.draw = function () {
        //draw the stamp if the mouse is pressed
        if (mouseIsPressed) {
            this.drawStamp();
        }
        //reset stampDrawn flag when mouse is released
        if (!mouseIsPressed) {
            stampDrawn = false;
        }
    };

    this.unselectTool = function () {
        //clear options
        select(".options").html("");
    };

    this.populateOptions = function () {
        select(".options").html(
            "<label class='stamplabel' for='stampSelector'>Select Stamp:</label>" +
            "<select  id='stampSelector'>" +
            "<option value='assets/cat.png'>Cat</option>" +
            "<option value='assets/airplane.png'>Airplane</option>" +
            "<option value='assets/mickeymouse.png'>Mickeymouse</option>" +
            "</select>" +
            "<br><br>"
        );

        //load the selected stamp image
        var that = this; //save a reference to the current object
        that.loadStampImg(select("#stampSelector").value()); //load the selected stamp image on the first click
        select("#stampSelector").changed(function () {
            that.loadStampImg(this.value());
        });
    };
};
