import Rx from 'rx';

const spawnSpeed = 1500;
const shootingFreq = 750;

export default function createStream({ width, height }) {
  const isVisible = isVisibleFn(width, height);
  return Rx.Observable
    .interval(spawnSpeed)
    .scan(function(enemyArray) {
      const enemy = {
        x: parseInt(Math.random() * width, 10),
        y: -30,
        shots: [],
      };

      Rx.Observable
        .interval(shootingFreq)
        .subscribe(() => {
          enemy.shots.push({
            x: enemy.x,
            y: enemy.y,
          });
        });

      return [ ...enemyArray, enemy ].filter(isVisible);
    }, []);
}

function isVisibleFn(width, height) {
  return function (obj) {
    return obj.x > -40 && obj.x < width + 40 &&
      obj.y > -40 && obj.y < height + 40;
  };
}
