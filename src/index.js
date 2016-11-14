import Rx from 'rx';
import createStarStream from './star-stream';
import createMouseStream from './mouse-stream';
import createEnemyStream from './enemy-stream';
import { initialize, renderScene } from './render';

const canvas = initialize();
const stars$ = createStarStream(canvas);
const mouseMoves$ = createMouseStream(canvas);
const enemies$ = createEnemyStream(canvas);

const game$ = Rx.Observable
  .combineLatest(stars$, mouseMoves$, enemies$, function(stars, spaceship, enemies) {
    return { spaceship, stars, enemies };
  });

game$.subscribe(renderScene);

