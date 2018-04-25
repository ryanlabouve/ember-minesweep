import Square from './square';
import MinefieldGenerator from './minefield-generator';
import {DIFFICULTIES} from './utils/difficulties';

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
    this.minefieldGenerator = new MinefieldGenerator(this.ops);
    this.minefield = this._setupMinefieldNeighbors(this._generateMinefield());
  }

  _generateMinefield() {
    let {width, height} = this.opts;
    let emptyField = Array(width).fill(Array(height).fill(0));

    return emptyField.map(row =>
      row.map(
        () =>
          new Square({
            _isBomb: this.minefieldGenerator.isBomb(),
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
