import Rx from 'rx';

const shootingSpeed = 200;
export default function createStream(canvas) {
  return Rx.Observable
    .merge(
      Rx.Observable.fromEvent(canvas, 'click'),
      Rx.Observable.fromEvent(document, 'keypress')
        .filter(event => event.keyCode === 32)
    )
    .startWith({})
    .sample(shootingSpeed)
    .timestamp();
}
