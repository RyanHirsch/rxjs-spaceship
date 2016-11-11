import Rx from 'rx';
import createStarStream from './star-stream';
import createMouseStream from './mouse-stream';
import { initialize, renderScene } from './render';

const canvas = initialize();
const starStream$ = createStarStream(canvas);
const mouseMoves$ = createMouseStream(canvas);

const game$ = Rx.Observable
  .combineLatest(starStream$, mouseMoves$, function(stars, spaceship) {
    return { spaceship, stars };
  });

game$.subscribe(renderScene);

