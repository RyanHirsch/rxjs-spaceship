import Rx from 'rx';

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const speed = 40;
const starNumber = 250;
const heroY = canvas.height - 30;

const starStream$ = Rx.Observable
  .range(0, starNumber)
  .map(generateStar)
  .toArray()
  .flatMap(function(starArray) {
    return Rx.Observable
      .interval(speed)
      .map(function() {
        starArray.forEach(updateStarPosition);
        return starArray;
      });
  });

const mouseMoves$ = Rx.Observable
  .fromEvent(canvas, 'mousemove')
  .map(function(mouseMoveEvent) {
    return {
      x: mouseMoveEvent.clientX,
      y: heroY,
    };
  })
  .startWith({
    x: canvas.width / 2,
    y: heroY,
  });

const game$ = Rx.Observable
  .combineLatest(starStream$, mouseMoves$, function(stars, spaceship) {
    return { spaceship, stars };
  });

game$.subscribe(renderScene);

function renderScene({ stars, spaceship }) {
  paintStars(stars);
  paintSpaceShip(spaceship.x, spaceship.y);
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

function updateStarPosition(star) {
  if(star.y >= canvas.height) {
    star.y = 0;
  }
  star.y = star.y + star.size;
}

function paintStars(stars) {
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#ffffff';
  stars.forEach(function(star) {
    ctx.fillRect(star.x, star.y, star.size, star.size);
  });
}

function generateStar() {
  return {
    x: parseInt(Math.random() * canvas.width, 10),
    y: parseInt(Math.random() * canvas.height, 10),
    size: Math.random() * 3 + 1,
  };
}
