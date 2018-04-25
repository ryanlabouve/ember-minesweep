import {DIFFICULTIES} from '../utils/difficulties';

export default class {
  constructor(opts = {}) {
    this.difficulty = opts.difficulty;
  }

  isBomb(seed, difficulty) {
    difficulty = difficulty || this.difficulty;
    seed = seed || Math.floor(Math.random() * 100);

    if (DIFFICULTIES.indexOf(difficulty) === 0) {
      return seed > 80;
    }
    if (DIFFICULTIES.indexOf(difficulty) === 1) {
      return seed > 60;
    }
    if (DIFFICULTIES.indexOf(difficulty) === 2) {
      return seed > 40;
    }
    if (DIFFICULTIES.indexOf(difficulty) === 3) {
      return seed > 20;
    }
  }
}
