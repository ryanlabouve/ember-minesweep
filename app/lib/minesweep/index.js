import Square from './square';
import MinefieldGenerator from './minefield-generator';
import {DIFFICULTIES} from './utils/difficulties';
import {set} from '@ember/object';

const DEFAULT_OPTS = {
  width: 9,
  height: 9,
  difficulty: DIFFICULTIES[0],
};

export default class {
  constructor(opts) {
    this.lost = false;
    this.won = false;
    this.opts = Object.assign({}, DEFAULT_OPTS, opts);
    this.minefieldGenerator = new MinefieldGenerator(this.opts);
    this.totalNumberOfSquares = this.height * this.width;
    this.lostGame = () => {
      set(this, 'lost', true);
    };
    this.checkGameWon = () => {
      set(this, 'numberOfSquaresRevealed', this.checkNumberOfRevealed());
      return (
        this.numberOfMines + this.numberOfSquaresRevealed ===
        this.totalNumberOfSquares
      );
    };
    this.minefield = this._setupMinefieldNeighbors(this._generateMinefield());
    this.numberOfMines = this.minefield.reduce((acc, row) => {
      return (acc += row.filter(square => square.isBomb === true).length);
    }, 0);
    this.numberOfSquaresRevealed = 0;
  }

  checkNumberOfRevealed() {
    return this.minefield.reduce((acc, row) => {
      return (acc += row.filter(square => square.isRevealed === true).length);
    }, 0);
  }

  _generateMinefield() {
    let {width, height} = this.opts;
    let emptyField = Array(width).fill(Array(height).fill(0));

    return emptyField.map(row =>
      row.map(
        () =>
          new Square({
            isBomb: this.minefieldGenerator.isBomb(),
            lostGame: this.lostGame,
            checkGameWon: this.checkGameWon,
          }),
      ),
    );
  }

  _setupMinefieldNeighbors(minefield) {
    let mf = minefield;

    mf.forEach((row, rowIndex) => {
      mf.forEach((square, colIndex) => {
        let ri = rowIndex;
        let ci = colIndex;
        mf[ri][ci].neighbors = [
          mf[ri - 1] && mf[ri - 1][ci - 1],
          mf[ri - 1] && mf[ri - 1][ci],
          mf[ri - 1] && mf[ri - 1][ci + 1],
          mf[ri] && mf[ri][ci - 1],
          mf[ri] && mf[ri][ci + 1],
          mf[ri + 1] && mf[ri + 1][ci - 1],
          mf[ri + 1] && mf[ri + 1][ci],
          mf[ri + 1] && mf[ri + 1][ci + 1],
        ].filter(m => !!m);
      });
    });

    return minefield;
  }
}
