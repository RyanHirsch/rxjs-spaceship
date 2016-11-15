import Rx from 'rx';

export default function createStream(shot$, mouseMove$, heroY) {
  return Rx.Observable
    .combineLatest(
      shot$,
      mouseMove$,
      function(shotEvent, spaceShip) {
        return {
          timestamp: shotEvent.timestamp,
          x: spaceShip.x,
        };
      }
    )
    .distinctUntilChanged(shot => shot.timestamp)
    .scan(function(shotArray, shot) {
      return [ ...shotArray, { x: shot.x, y: heroY } ];
    }, []);
}
