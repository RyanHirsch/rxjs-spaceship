import Rx from 'rx';

const SCORE_INCREASE = 10;
const scoreSubject = new Rx.BehaviorSubject(0);
const score = scoreSubject
  .scan((sum, curr) => sum + curr, 0);

const shootingSpeed = 15;
const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

export function renderScene({ enemies, heroShots, spaceship, stars }) {
  paintStars(stars);
  paintSpaceShip(spaceship.x, spaceship.y);
  paintEnemies(enemies);
  paintHeroShots(heroShots, enemies);
  paintScore(score);
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

    if(!enemy.isDead) {
      drawTriangle(enemy.x, enemy.y, 20, '#00FF00', 'down');
    }

    enemy.shots.forEach(shot => {
      shot.y = shot.y + shootingSpeed;
      drawTriangle(shot.x, shot.y, 5, '#00FFFF', 'down');
    });
  });
}

function paintHeroShots(shots, enemies) {
  shots.forEach(shot => {
    for(let l = 0; l < enemies.length; l++) { // eslint-disable-line no-plusplus
      const enemy = enemies[l];
      if(!enemy.isDead && collision(shot, enemy)) {
        scoreSubject.onNext(SCORE_INCREASE);
        enemy.isDead = true;
        shot.x = shot.y = -100;
        break;
      }
    }
    shot.y = shot.y - shootingSpeed;
    drawTriangle(shot.x, shot.y, 5, '#FFFF00', 'up');
  });
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function collision(target1, target2) {
  return (target1.x > target2.x - 20 && target1.x < target2.x + 20) &&
    (target1.y > target2.y - 20 && target1.y < target2.y + 20);
}

function paintScore(score) {
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 26px sans-serif';
  ctx.fillText(`Score: ${score}`, 40, 43);
}
