// Draw Start Screen
function drawStart() {
  drawMainComponents();

  // Start Text
  ctx.font = `${document.documentElement.clientWidth * 0.05}px Consolas`;
  ctx.fillStyle = "lightblue";
  ctx.fillText(
    "PRESS TO START",
    window.innerWidth * 0.35,
    heli.y + heli.h - 70 + window.innerWidth * 0.05
  );
}

// Draw Game Elements
function runGame() {
  // Logic
  moveHeli();
  moveWalls();
  checkCollisions();

  // Draw
  drawGame();

  // Update distance
  distance++;
}

function moveHeli() {
  // Accelerate upward is mouse is pressed
  if (mouseIsPressed) {
    heli.speed += -1;
  }
  // Apply Gravity (acceleration)
  heli.speed += heli.accel;

  // Constrain Speed (acceleration)
  if (heli.speed > 5) {
    heli.speed = 5;
  } else if (heli.speed < -5) {
    heli.speed = -5;
  }

  // Move Heli by Speed
  heli.y += heli.speed;
}

function moveWalls() {
  // Increase speed
  wallSpeed -= 0.001;

  // Wall1
  wall1.x += wallSpeed;
  if (wall1.x + wall1.w < 0) {
    wall1.x = cnv.width;
    wall1.y = Math.random() * 300 + 100;
  }

  // Wall2
  wall2.x += wallSpeed;
  if (wall2.x + wall2.w < 0) {
    wall2.x = cnv.width;
    wall2.y = Math.random() * 300 + 100;
  }

  // Wall3
  wall3.x += wallSpeed;
  if (wall3.x + wall3.w < 0) {
    wall3.x = cnv.width;
    wall3.y = Math.random() * 300 + 100;
  }
}

function checkCollisions() {
  // Collision with Top and Bottom Green Bars
  if (heli.y < 50 || heli.y + heli.h > cnv.height - 50) {
    gameOver();
  } else if (
    (heli.x < wall1.x + wall1.w &&
      heli.x + heli.w > wall1.x &&
      heli.y < wall1.y + wall1.h &&
      heli.y + heli.h > wall1.y) ||
    (heli.x < wall2.x + wall2.w &&
      heli.x + heli.w > wall2.x &&
      heli.y < wall2.y + wall2.h &&
      heli.y + heli.h > wall2.y) ||
    (heli.x < wall3.x + wall3.w &&
      heli.x + heli.w > wall3.x &&
      heli.y < wall3.y + wall3.h &&
      heli.y + heli.h > wall3.y)
  ) {
    gameOver();
  }
}

function drawGame() {
  drawMainComponents();
  drawWalls();
}

// Draw Game Over Screen
function drawGameOver() {
  drawMainComponents();
  drawWalls();

  // Circle around Helicopter
  ctx.strokeStyle = "red";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(heli.x + heli.w / 2, heli.y + heli.h / 2, 70, 0, 2 * Math.PI);
  ctx.stroke();

  // Game Over Text
  ctx.font = "40px Consolas";
  ctx.fillStyle = "lightblue";
  ctx.fillText("GAME OVER", heli.x + heli.w / 2 + 100, heli.y + heli.h / 2);
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
    acceleration: 0.7,
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
    best = distance + 1;
  }
  setTimeout(reset, 1500);
}

function drawWalls() {
  let wallImg = document.createElement("img");
  wallImg.src = "img/istockphoto-519728237-170667a-removebg-preview.png";
  let wallHeight = ((wall1.h * 1.5) / wallImg.height) * wallImg.width;
  let wallWidth = wall1.w * 1.5;
  ctx.drawImage(wallImg, wall1.x, wall1.y, wallWidth, wallHeight);
  ctx.drawImage(wallImg, wall2.x, wall2.y, wallWidth, wallHeight);
  ctx.drawImage(wallImg, wall3.x, wall3.y, wallWidth, wallHeight);
}

// Define an array to store the blood drops
let bloodDrops = [];

function drawMainComponents() {
  // Background
  ctx.fillStyle = "#151515";
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  // Banner
  ctx.fillStyle = "red";
  ctx.fillRect(0, 0, cnv.width, 50);
  ctx.fillRect(0, cnv.height - 50, cnv.width, 50);

  // Green Bar Text
  ctx.font = "30px Consolas";
  ctx.fillStyle = "black";
  ctx.fillText("FLYING PIGGY", 25, 35);
  ctx.fillText("DISTANCE: " + Math.floor(distance), 25, cnv.height - 15);
  ctx.fillText("BEST: " + Math.floor(best), cnv.width - 250, cnv.height - 15);

  // Update and draw the blood drops
  for (let i = 0; i < bloodDrops.length; i++) {
    const drop = bloodDrops[i];
    drop.y += drop.speed;

    ctx.fillStyle = "red";
    drawCurvedShape(drop.x, drop.y, 30, 20); // Call custom function to draw a curved shape (adjust width to 15)

    // Remove blood drops that go beyond the canvas
    if (drop.y > cnv.height) {
      bloodDrops.splice(i, 1);
      i--;
    }
  }

  // Generate new blood drops randomly
  if (Math.random() < 0.05) {
    bloodDrops.push({
      x: Math.random() * cnv.width,
      y: 50,
      speed: Math.random() * 2 + 1, // Random speed between 1 and 3
    });
  }

  // Helicopter
  ctx.drawImage(PigImg, heli.x, heli.y, heli.w, heli.h);
}

// Custom function to draw a curved shape
function drawCurvedShape(x, y, width, height) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.bezierCurveTo(x + width / 2, y + height, x - width / 2, y + height, x, y);
  ctx.closePath();
  ctx.fill();
}
