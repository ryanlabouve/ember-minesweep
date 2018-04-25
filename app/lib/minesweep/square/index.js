let id = 0;
const Square = class {
  constructor(opts = {}) {
    this.isBomb = opts.isBomb || false;
    this.isFlagged = false;
    this.isRevealed = false;
    this.neighboringBombCount = null;
    this.id = ++id;

    this.neighbors = opts.neighbors || [];
  }

  check() {
    if (!this.isFlagged) {
      this.isRevealed = true;
    }
  }

  flag() {
    this.isFlagged = !this.isFlagged;
  }

  knock() {
    if (this.isBomb) {
      return;
    }

    this.isRevealed = true;

    this.neighboringBombCount =
      this.neighboringBombCount || this.getNeighborBombCount();
    this.neighbors.map(n => n.knock());
  }

  getNeighborBombCount() {
    return this.neighbors.reduce((acc, curr) => {
      return (acc += curr.isBomb ? 1 : 0);
    }, 0);
  }
};

export default Square;
