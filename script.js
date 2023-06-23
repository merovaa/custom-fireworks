const numCircles = 5;
let circles = [];
let explosion = 0;


function preload() { // loads the font choices
  pacificoFont = loadFont("pacifico.ttf");
  lexendFont = loadFont("lexend.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  centerX = 0;
  centerY = 0;
  for (let i = 0; i < numCircles; i++) { // goes through each circle
    let circle = { // assigns attributes to circles of firework
      xValue: centerX,
      yValue: centerY,
      diameter: 10,
      colour: {
        r: 255,
        g: 255,
        b: 255,
      }
    }
    circles.push(circle); // pushes circles into array
    centerX += 10;
    centerY += 10;
  }
}

function draw() {
  background(0, 0, 30);
  explode();
  drawFirework();
  displayMessage();
  changeColour();
  changeFont();
}

function explode() {
  if (frameCount % 4 == 0) { // increases explosion every 20 frames
    explosion++;
    if (explosion > numCircles - 1) { // resets explosion
      explosion = 0
    }
  }
}

function drawFirework() {
  noStroke()
  if (frameCount % 20 == 0) { // draws new firework every 100 frames
    centerX = random(width);
    centerY = random(-200, 200);
  }
  let angles = [0, 45, 90, 135, 180, 225, 270, 315]; // stores angles
  translate(centerX, centerY); // changes origin to center of firework
  for (let i = 0; i < angles.length; i++) { // goes through each angle
    rotate(angles[i]); // rotates line of circles to create firework shape
    for (let j = 0; j < numCircles; j++) {
      circle = circles[j]
      if (j < explosion) { // draws circles on canvas
        if (centerY < windowHeight && centerY > 0) {
          fill(circle.colour.r, circle.colour.g, circle.colour.b)
          ellipse(circle.xValue, circle.yValue, circle.diameter);
        }
      }
    }
  }
}

function displayMessage() {
  let message = document.getElementById("message-field").value // retrieves user's message
  document.getElementById("messageInput").innerText = message // sets text in html to the user's message
}

function changeColour() {
  let selectedColour = document.getElementById("colour-menu") // retrieves the chosen colour
  let index = selectedColour.selectedIndex;
  let currentColour = selectedColour[index].value;
  for (let i = 0; i < numCircles; i++) { // goes through each circle
    if (currentColour == "pink") { // changes to pink
      circles[i].colour.r = 255
      circles[i].colour.g = 105
      circles[i].colour.b = 180
    } else if (currentColour == "gold") { // changes to gold
      circles[i].colour.r = 255
      circles[i].colour.g = 215
      circles[i].colour.b = 0
    } else if (currentColour == "red") { // changes to red
      circles[i].colour.r = 255
      circles[i].colour.g = 0
      circles[i].colour.b = 0
    } else {
      circles[i].colour.r = 0
      circles[i].colour.g = 0
      circles[i].colour.b = 30
    }
  }
}

function changeFont() {
  let fonts = document.getElementsByName("font"); // array of font choices
  for (let i = 0; i < fonts.length; i++) {
    if (fonts[i].checked) {
      let selectedFont = fonts[i].id
      messageInput.style.fontFamily = selectedFont // sets message to selected font
    }
  }
}
