import {set} from '@ember/object';

let id = 0;
const Square = class {
  constructor(opts = {}) {
    this.isBomb = opts.isBomb || false;
    this.isFlagged = false;
    this.isRevealed = false;
    this.neighboringBombCount = null;
    this.id = ++id;
    this.lostGame = opts.lostGame || function() {};
    this.neighbors = opts.neighbors || [];
    this.checkGameWon = opts.checkGameWon;
    this.updateFlaggedSquares = opts.updateFlaggedSquares;
  }

  flag() {
    set(this, 'isFlagged', !this.isFlagged);
    this.updateFlaggedSquares();
  }

  check() {
    if (this.isBomb) {
      this.lostGame();
    } else {
      this.knock();
      this.checkGameWon();
    }
  }

  knock() {
    if (this.isBomb || this.isFlagged || this.isRevealed) {
      return;
    }

    set(this, 'isRevealed', true);

    set(
      this,
      'neighboringBombCount',
      this.neighboringBombCount || this.getNeighborBombCount(),
    );

    if (!this.neighboringBombCount) {
      this.neighbors.map(n => n.knock());
    }
  }

  getNeighborBombCount() {
    return this.neighbors.reduce((acc, curr) => {
      return (acc += curr.isBomb ? 1 : 0);
    }, 0);
  }
};

export default Square;
