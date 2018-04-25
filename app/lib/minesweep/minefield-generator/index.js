import {DIFFICULTIES} from '../utils/difficulties';

export default class {
  constructor(opts = {}) {
    this.difficulty = opts.difficulty;
  }

  isBomb(seed, difficulty) {
    difficulty = difficulty || this.difficulty;
    seed = seed || Math.floor(Math.random() * 100);

    switch (difficulty) {
      case DIFFICULTIES[0]:
        return seed > 20;
      case DIFFICULTIES[1]:
        return seed > 40;
      case DIFFICULTIES[2]:
        return seed > 60;
      case DIFFICULTIES[3]:
        return seed > 80;
      default:
        return false;
    }
  }
}
