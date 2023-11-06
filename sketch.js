// Global variables that will store the toolbox colour palette
// and the helper functions.
var toolbox = null; // Declare variable to store the toolset
var colourP = null; // Declare variable to store the color palette
var helpers = null; // Declare variable to store the helper functions
var backgroundColor = '#ffffff'; // Declare variable to store the background color

function setup() {
    canvasContainer = select('#content'); // Select the container where the canvas will be placed
    var c = createCanvas(canvasContainer.size().width, canvasContainer.size().height); // Create a canvas with the width and height of the container
    c.parent("content"); // Place the canvas inside the container

    helpers = new HelperFunctions(); // Create an instance of the helper functions
    colourP = new ColourPalette(); // Create an instance of the color palette
    toolbox = new Toolbox(); // Create an instance of the toolset

    // Add all the tools to the toolset
    toolbox.addTool(new FreehandTool());
    toolbox.addTool(new LineToTool());
    toolbox.addTool(new SprayCanTool());
    toolbox.addTool(new MirrorDrawTool());
    toolbox.addTool(new RectangleTool());
    toolbox.addTool(new CircleShapeTool());
    toolbox.addTool(new EditableshapeTool());
    toolbox.addTool(new BrushTool());
    toolbox.addTool(new BackgroundFillTool());
    toolbox.addTool(new TextTool());
    toolbox.addTool(new EraserTool());
    toolbox.addTool(new StampTool());
    toolbox.addTool(new SpirographTool());

    background(backgroundColor); // Set the initial background color
    loadPixels(); // Load the pixel data for the canvas
}

function draw() {
    // Call the draw method of the selected tool in the toolset
    if (toolbox.selectedTool.hasOwnProperty("draw")) {
        toolbox.selectedTool.draw();
    } else {
        alert("it doesn't look like your tool has a draw method!");
    }
};
