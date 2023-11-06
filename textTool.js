userInput = ""; // Create an empty string to store user input
let texts = []; // Create an empty array to store texts
let isDragging = false; // A flag to check if the mouse is dragging
let isTyping = false; // A flag to check if the user is typing
let textX = 700; // The X position of the text
let textY = 300; // The Y position of the text
let dragOffsetX = 0; // The X offset between the mouse and the text when dragging
let dragOffsetY = 0; // The Y offset between the mouse and the text when dragging
let selectedTextIndex = -1; // The index of the selected text

// Define the TextTool object
function TextTool() {
    // Set an icon and a name for the object
    this.name = "text";
    this.icon = "assets/textTool.jpg";

    // Define the draw function for the object
    this.draw = function () {
        // Set the text properties
        updatePixels();
        textSize(32);
        textAlign(CENTER, CENTER);
        strokeWeight(1);


        // Write the text on the canvas
        for (let i = 0; i < texts.length; i++) {
            text(texts[i].text, texts[i].x, texts[i].y);
        }
        // If the user is typing, display the text they are typing on the canvas
        if (isTyping) {
            text(userInput, textX, textY + texts.length * 40);
        }
    };
}

// When a key is pressed
function keyPressed() {
    if (keyCode === ENTER) {
        // Finish typing current word
        isTyping = false;
        // Save the word to the canvas
        texts.push({
            text: userInput,
            x: textX,
            y: textY + texts.length * 40
        });
        // Reset userInput to an empty string
        userInput = "";
    }
}

// When a key is typed (excluding enter key)
function keyTyped() {
    if (keyCode !== ENTER) {
        // If user starts typing, set isTyping to true and reset userInput to an empty string
        if (!isTyping) {
            userInput = "";
            isTyping = true;
        }
        // If user presses backspace key, remove last character from userInput
        if (keyCode === BACKSPACE) {
            userInput = userInput.slice(0, -1);
        } else {
            // Otherwise, add the typed key to the userInput string
            userInput += key;
        }
    }
}

// This function is called when the mouse is presse
function mousePressed() {
    //Check if the mouse is over any text in the array of texts
    for (let i = 0; i < texts.length; i++) {
        // Calculate the distance between the mouse and the center of the text
        let d = dist(mouseX, mouseY, texts[i].x, texts[i].y);
        // If the distance is less than the size of the text, set the text as the selected text for dragging
        if (d < textSize(texts[i].text)) {
            isDragging = true;
            selectedTextIndex = i;
            //Calculate the offset between the mouse and the center of the text for smooth dragging
            dragOffsetX = mouseX - texts[i].x;
            dragOffsetY = mouseY - texts[i].y;
            break;
        }
    }
    // If the user is currently typing, check if the mouse is over the user input box
    if (isTyping) {
        let d = dist(mouseX, mouseY, textX, textY + texts.length * 40);
        // If the distance is less than the size of the user input text, set the user input box as the selected text for dragging
        if (d < textSize(userInput)) {
            isDragging = true;
            selectedTextIndex = texts.length;
            dragOffsetX = mouseX - textX;
            dragOffsetY = mouseY - (textY + texts.length * 40);
        }
    }
};

// This function is called when the mouse is being dragged
function mouseDragged() {
    if (isDragging) {
        // If the selected text is a text in the array of texts
        if (selectedTextIndex >= 0 && selectedTextIndex < texts.length) {
            // Update the position of the selected text based on the mouse position and the offset
            texts[selectedTextIndex].x = mouseX - dragOffsetX;
            texts[selectedTextIndex].y = mouseY - dragOffsetY;
            // If the selected text is the user input box
        } else if (selectedTextIndex === texts.length) {
            // Update the position of the user input box based on the mouse position and the offset
            textX = mouseX - dragOffsetX;
            textY = mouseY - dragOffsetY - texts.length * 40;
        }

    }
};

// This function is called when the mouse is released
function mouseReleased() {
    // Stop dragging any text
    isDragging = false;
    // Reset the selected text index
    selectedTextIndex = -1;
};
