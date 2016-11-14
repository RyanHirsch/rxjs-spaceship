const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

export function renderScene({ enemies, stars, spaceship }) {
  paintStars(stars);
  paintSpaceShip(spaceship.x, spaceship.y);
  paintEnemies(enemies);
}

export function initialize() {
  document.body.appendChild(canvas);
  return canvas;
}

function paintSpaceShip(x, y) {
  drawTriangle(x, y, 20, '#ff0000', 'up');
}

// eslint-disable-next-line max-params
function drawTriangle(x, y, width, color, direction) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x - width, y);
  ctx.lineTo(x, direction === 'up' ? y - width : y + width);
  ctx.lineTo(x + width, y);
  ctx.lineTo(x - width, y);
  ctx.fill();
}

function paintStars(stars) {
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#ffffff';
  stars.forEach(function(star) {
    ctx.fillRect(star.x, star.y, star.size, star.size);
  });
}

function paintEnemies(enemies) {
  enemies.forEach(enemy => {
    enemy.y = enemy.y + 5;
    enemy.x = enemy.x + getRandomInt(-15, 15);
    drawTriangle(enemy.x, enemy.y, 20, '#00FF00', 'down');
  });
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
