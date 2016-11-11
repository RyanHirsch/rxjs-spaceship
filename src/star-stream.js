import Rx from 'rx';

const starNumber = 250;
const speed = 40;

export default function createStream({ height, width }) {
  return  Rx.Observable
  .range(0, starNumber)
  .map(generateStar(height, width))
  .toArray()
  .flatMap(function(starArray) {
    return Rx.Observable
      .interval(speed)
      .map(function() {
        starArray.forEach(updateStarPosition(height));
        return starArray;
      });
  });
}

function updateStarPosition(height) {
  return function(star) {
    if(star.y >= height) {
      star.y = 0;
    }
    star.y = star.y + star.size;
  };
}

function generateStar(height, width) {
  return function() {
    return {
      x: parseInt(Math.random() * width, 10),
      y: parseInt(Math.random() * height, 10),
      size: Math.random() * 3 + 1,
    };
  };
}
