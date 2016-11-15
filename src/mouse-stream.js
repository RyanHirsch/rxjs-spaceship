import Rx from 'rx';

export default function createMouseStream(canvas, heroY) {
  return Rx.Observable
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
}
