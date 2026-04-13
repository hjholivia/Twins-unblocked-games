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

// FIX: real resolution for canvas
canvas.width = 400;
canvas.height = 600;

let player, blocks, score, gameOver, highScore = 0;

// controls
let moveLeft = false;
let moveRight = false;

// keyboard
document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft") moveLeft = true;
  if (e.key === "ArrowRight") moveRight = true;
});
document.addEventListener("keyup", e => {
  if (e.key === "ArrowLeft") moveLeft = false;
  if (e.key === "ArrowRight") moveRight = false;
});

// TOUCH CONTROLS (iPad fix)
canvas.addEventListener("touchstart", e => {
  let x = e.touches[0].clientX;
  if (x < window.innerWidth / 2) moveLeft = true;
  else moveRight = true;
});

canvas.addEventListener("touchend", () => {
  moveLeft = false;
  moveRight = false;
});

function startGame() {
  player = {
    x: 180,
    y: 550,
    width: 40,
    height: 40,
    speed: 6
  };

  blocks = [];
  score = 0;
  gameOver = false;
}

function spawnBlock() {
  let size = 20 + Math.random() * 40;
  blocks.push({
    x: Math.random() * (canvas.width - size),
    y: -size,
    width: size,
    height: size,
    speed: 2 + score / 150
  });
}

function isColliding(a, b) {
  return a.x < b.x + b.width &&
         a.x + a.width > b.x &&
         a.y < b.y + b.height &&
         a.y + a.height > b.y;
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!gameOver) {

    // movement
    if (moveLeft && player.x > 0) player.x -= player.speed;
    if (moveRight && player.x < canvas.width - player.width) player.x += player.speed;

    // player
    ctx.fillStyle = "lime";
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // spawn blocks
    if (Math.random() < 0.04) spawnBlock();

    // blocks
    blocks.forEach((block, i) => {
      block.y += block.speed;

      ctx.fillStyle = "red";
      ctx.fillRect(block.x, block.y, block.width, block.height);

      if (isColliding(player, block)) {
        gameOver = true;
        if (score > highScore) highScore = score;
      }

      if (block.y > canvas.height) {
        blocks.splice(i, 1);
        score++;
      }
    });

    document.getElementById("score").innerText = "Score: " + score;
    document.getElementById("highscore").innerText = "High Score: " + highScore;

  } else {
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText("GAME OVER", 120, 300);
  }

  requestAnimationFrame(update);
}

function restartGame() {
  startGame();
}

startGame();
update();
