// Game definitions

const games = [
    {
        name: 'Game 1',
        description: 'Description for Game 1',
        // additional properties...
    },
    {
        name: 'Game 2',
        description: 'Description for Game 2',
        // additional properties...
    },
    // Add more games as needed
];

// Improved error handling for the close button
const closeButton = document.getElementById('close-button');

if (closeButton) {
    closeButton.addEventListener('click', () => {
        // Logic to close the modal or perform the desired action
        console.log('Close button clicked!');
    });
} else {
    console.warn('Close button does not exist.');
}
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 600;

let player = {
  x: 180,
  y: 550,
  width: 40,
  height: 40,
  speed: 5
};

let blocks = [];
let score = 0;
let gameOver = false;

// controls
let keys = {};
document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

// create blocks
function spawnBlock() {
  let size = 30 + Math.random() * 30;
  blocks.push({
    x: Math.random() * (canvas.width - size),
    y: -size,
    width: size,
    height: size,
    speed: 2 + score / 200
  });
}

// collision check
function isColliding(a, b) {
  return a.x < b.x + b.width &&
         a.x + a.width > b.x &&
         a.y < b.y + b.height &&
         a.y + a.height > b.y;
}

// game loop
function update() {
  if (gameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // move player
  if (keys["ArrowLeft"] && player.x > 0) player.x -= player.speed;
  if (keys["ArrowRight"] && player.x < canvas.width - player.width) player.x += player.speed;

  // draw player
  ctx.fillStyle = "lime";
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // spawn blocks
  if (Math.random() < 0.03) spawnBlock();

  // update blocks
  blocks.forEach((block, i) => {
    block.y += block.speed;

    ctx.fillStyle = "red";
    ctx.fillRect(block.x, block.y, block.width, block.height);

    // collision
    if (isColliding(player, block)) {
      gameOver = true;
      alert("Game Over! Score: " + score);
      location.reload();
    }

    // remove off screen
    if (block.y > canvas.height) {
      blocks.splice(i, 1);
      score++;
    }
  });

  document.getElementById("score").innerText = "Score: " + score;

  requestAnimationFrame(update);
}

update();

// Additional script logic...
