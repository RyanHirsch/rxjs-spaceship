import Rx from 'rx';
import createStarStream from './star-stream';
import createMouseStream from './mouse-stream';
import createEnemyStream from './enemy-stream';
import createShotStream from './shot-stream';
import createHeroShotStream from './hero-shot-stream';
import { initialize, renderScene } from './render';

const speed = 40;
const canvas = initialize();
const heroY = canvas.height - 30;

const stars$ = createStarStream(canvas);
const mouseMove$ = createMouseStream(canvas, heroY);
const enemies$ = createEnemyStream(canvas);
const shot$ = createShotStream(canvas);
const heroShot$ = createHeroShotStream(shot$, mouseMove$, heroY);

const game$ = Rx.Observable
  .combineLatest(
    stars$,
    mouseMove$,
    enemies$,
    heroShot$,
    function(stars, spaceship, enemies, heroShots) { // eslint-disable-line max-params
      return { spaceship, stars, enemies, heroShots };
    }
  )
  .sample(speed);

game$.subscribe(renderScene);
