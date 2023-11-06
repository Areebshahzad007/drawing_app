//helper function for even listeners 
function HelperFunctions() {
    // Attach an event listener to the "clearButton" element in the HTML file that listens for a "click" event.
    select("#clearButton").mouseClicked(function () {
        // Clear the canvas by setting the background color to white.
        background(255, 255, 255);
        // Set the background color variable to white as well.
        backgroundColor = '#ffffff';
        // Clear any saved texts.
        texts = [];
        // Clear any saved user input.
        userInput = "";
        // Clear any saved shapes.
        currentShape = [];

        // Update pixels to reflect the changes made to the canvas.
        loadPixels();
    });

    // Attach an event listener to the "saveImageButton" element in the HTML file that listens for a "click" event.
    select("#saveImageButton").mouseClicked(function () {
        // Save the current canvas as a JPG file named "myPicture".
        saveCanvas("myPicture", "jpg");
    });
};
