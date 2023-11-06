function BackgroundFillTool() {
    // Set the icon and name of the tool
    this.icon = "assets/backgroundfill.jpg";
    this.name = "background";

    // Declare a variable to store the color picker
    var colorPicker;

    // Define a function to populate the options panel with a color picker
    this.populateOptions = function () {
        // Clear the options panel
        select(".options").html("");

        // Create a new color picker input element and set its class and default value
        colorPicker = createInput(backgroundColor, "color");
        colorPicker.class("colorPicker");

        // Create a new label element, set its for attribute to the color picker's id, and add a class
        var label = createElement("label", "Background Color:");
        label.attribute("for", colorPicker.elt.id);
        label.class("colorPickerLabel");

        // Define an event listener for the color picker that sets the background color when the value is changed
        colorPicker.changed(function () {
            backgroundColor = colorPicker.value(); // set new background color
            background(backgroundColor);
        });

        // Add the label and color picker to the options panel
        select(".options").child(label);
        select(".options").child(colorPicker);
    };


    // Define a function to be called when the tool is selected
    this.draw = function () {
        // No action needed when the tool is selected
    };

    // Define a function to be called when the tool is unselected
    this.unselectTool = function () {
        // Remove the color picker from the options panel
        colorPicker.remove();
    };
};
