import {module, test} from 'qunit';
import {setupTest} from 'ember-qunit';
import Minesweep from 'ember-minesweep/lib/minesweep';

module('Unit | Lib | minesweep', function(hooks) {
  setupTest(hooks);

  test('a new game of default size', function(assert) {
    let minesweep = new Minesweep();
    assert.equal(minesweep.lost, false, 'the game starts out not lost');
    assert.equal(minesweep.won, false, 'the game starts out not won');
    assert.equal(
      minesweep.minefield.length,
      9,
      'minefield is the correct default width',
    );
    assert.equal(
      minesweep.minefield[0].length,
      9,
      'minefield is the correct default height',
    );
  });

  test('a small game', function(assert) {
    let minesweep = new Minesweep({
      width: 3,
      height: 3,
    });

    assert.equal(
      minesweep.minefield.length,
      3,
      'minefield is the correct default width',
    );
    assert.equal(
      minesweep.minefield[0].length,
      3,
      'minefield is the correct default height',
    );

    assert.deepEqual(
      [
        [
          minesweep.minefield[0][0].neighbors.length,
          minesweep.minefield[0][1].neighbors.length,
          minesweep.minefield[0][2].neighbors.length,
        ],
        [
          minesweep.minefield[1][0].neighbors.length,
          minesweep.minefield[1][1].neighbors.length,
          minesweep.minefield[1][2].neighbors.length,
        ],
        [
          minesweep.minefield[2][0].neighbors.length,
          minesweep.minefield[2][1].neighbors.length,
          minesweep.minefield[2][2].neighbors.length,
        ],
      ],
      [[3, 5, 3], [5, 8, 5], [3, 5, 3]],
    );
  });

  test('a game of a custom size', function(assert) {
    let minesweep = new Minesweep({
      height: 24,
      width: 24,
    });
    assert.equal(minesweep.lost, false, 'the game starts out not lost');
    assert.equal(minesweep.won, false, 'the game starts out not won');
    assert.equal(
      minesweep.minefield.length,
      24,
      'minefield is the correct width',
    );
    assert.equal(
      minesweep.minefield[0].length,
      24,
      'minefield is the correct height',
    );
  });
});
