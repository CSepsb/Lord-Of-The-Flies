// Set up canvas and graphics context
let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");
cnv.width = document.documentElement.clientWidth;
cnv.height = 600;

// Global Variables
let PigImg = document.createElement("img");
PigImg.src = "img/images-removebg-preview.png";

let death = document.createElement("audio");
death.src = "sound/080190_pig-86603.mp3";

let propeller = document.createElement("audio");
propeller.src = "sound/pigeons-flying-6351.wav";

let mouseIsPressed = false;

let distance = 0;

let best = 0;

let wallSpeed = -3;

let state;
let heli;
let wall1, wall2, wall3;
reset();

// Draw Function
window.addEventListener("load", draw);

function draw() {
  if (state === "start") {
    drawStart();
  } else if (state === "gameon") {
    runGame();
  } else if (state === "gameover") {
    drawGameOver();
  }
  // Request Animation Frame
  requestAnimationFrame(draw);
}

// Event for mouse
document.addEventListener("mousedown", mousedownHandler);
document.addEventListener("mouseup", mouseupHandler);

function mousedownHandler(event) {
  const rect = cnv.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  const pageHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  );

  if (
    mouseX >= 0 &&
    mouseX <= cnv.width &&
    mouseY >= 197 &&
    mouseY <= pageHeight
  ) {
    // Helicopter sound
    propeller.currentTime = 0;
    propeller.play();

    mouseIsPressed = true;

    // Start Game on Mousedown
    if (state === "start") {
      state = "gameon";
    }
  }
}

function mouseupHandler() {
  mouseIsPressed = false;
  propeller.pause();
}

// Helper Functions
function reset() {
  state = "start";
  heli = {
    x: 200,
    y: 250,
    w: 90,
    h: 83.5,
    speed: 0,
    accel: 0.7,
  };
  wall1 = {
    x: cnv.width,
    y: Math.random() * 300 + 100,
    w: 50,
    h: 100,
  };
  wall2 = {
    x: cnv.width + 500,
    y: Math.random() * 300 + 100,
    w: 50,
    h: 100,
  };
  wall3 = {
    x: cnv.width + 1000,
    y: Math.random() * 300 + 100,
    w: 50,
    h: 100,
  };

  distance = 0; // Reset the distance to 0 here
}

function gameOver() {
  wallSpeed = -3;
  death.play();
  state = "gameover";
  if (distance > best) {
    best = distance;
  }
  setTimeout(reset, 1500);
}
