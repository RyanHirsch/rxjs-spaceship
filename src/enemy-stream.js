import Rx from 'rx';

const spawnSpeed = 1500;

export default function createStream({ width }) {
  return Rx.Observable
    .interval(spawnSpeed)
    .scan(function(enemyArray) {
      enemyArray.push({
        x: parseInt(Math.random() * width, 10),
        y: -30,
      });
      return enemyArray;
    }, []);
}
