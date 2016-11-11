import Rx from 'rx';

export default function createMouseStream(canvas) {
  const heroY = canvas.height - 30;
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
