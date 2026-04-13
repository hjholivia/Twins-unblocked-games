alert("Game loading...");

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 600;

let player = { x: 180, y: 550, w: 40, h: 40 };
let blocks = [];

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // player
  ctx.fillStyle = "lime";
  ctx.fillRect(player.x, player.y, player.w, player.h);

  // blocks
  ctx.fillStyle = "red";
  blocks.forEach(b => {
    b.y += 3;
    ctx.fillRect(b.x, b.y, b.w, b.h);
  });

  requestAnimationFrame(draw);
}

// spawn blocks
setInterval(() => {
  blocks.push({
    x: Math.random() * 360,
    y: 0,
    w: 40,
    h: 40
  });
}, 1000);

draw();
