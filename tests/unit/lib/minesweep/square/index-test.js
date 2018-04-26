import {module, test} from 'qunit';
import {setupTest} from 'ember-qunit';
import Square from 'ember-minesweep/lib/minesweep/square';

module('Unit | Lib | minesweep | square', function(hooks) {
  setupTest(hooks);

  test('a new square', function(assert) {
    let s = new Square();
    assert.equal(s.isBomb, false, 'a new square is not a bomb by default');
    assert.equal(s.isFlagged, false, 'a new square is not flagged by default');
    assert.equal(
      s.isRevealed,
      false,
      'a new square is not revealed by default',
    );
  });

  test('a new square, marked as bomb', function(assert) {
    let s = new Square({isBomb: true});

    assert.equal(s.isBomb, true, 'a new square is a bomb when set as one');
    assert.equal(s.isFlagged, false, 'a new square is not flagged by default');
    assert.equal(
      s.isRevealed,
      false,
      'a new square is not revealed by default',
    );
  });

  test('#check', function(assert) {
    let s = new Square({checkGameWon: function(){}});
    s.check();
    assert.equal(s.isRevealed, true, 'after checking, a square is revealed');

    // TODO must send knock signals to neighbors
  });

  test('#flag', function(assert) {
    let s = new Square({
      updateFlaggedSquares: function(){},
      checkGameWon: function(){}
    });

    s.flag();
    assert.equal(s.isFlagged, true, 'after flagging, a square is flagged');
    s.check();
    assert.equal(
      s.isRevealed,
      false,
      'after flagging, when checking a square nothing happens',
    );
  });

  test('#knock, no neighbors are bombs', function(assert) {
    let neighbors = [new Square()];

    let s = new Square({
      neighbors,
    });

    s.knock();

    assert.equal(s.isRevealed, true, 'We have reveald this square');
    assert.equal(s.neighboringBombCount, 0, 'We have no neighboring bombs');
  });

  test('#knock - one neighbor is a bomb', function(assert) {
    let neighbors = [new Square({isBomb: true}), new Square()];

    let s = new Square({
      neighbors,
    });

    s.knock();

    assert.equal(s.isRevealed, true, 'We have reveald this square');
    assert.equal(s.neighboringBombCount, 1, 'We have no neighboring bombs');
  });

  test('#knock - many neighbor is a bomb', function(assert) {
    let neighbors = [
      new Square({isBomb: true}),
      new Square({isBomb: true}),
      new Square({isBomb: true}),
      new Square({isBomb: true}),
      new Square({isBomb: true}),
      new Square({isBomb: true}),
    ];

    let s = new Square({
      neighbors,
    });

    s.knock();

    assert.equal(s.isRevealed, true, 'We have reveald this square');
    assert.equal(s.neighboringBombCount, 6, 'We have no neighboring bombs');
  });

  test('#knock - one neighbor is a bomb', function(assert) {
    let neighbors = [new Square({isBomb: true}), new Square()];

    let s = new Square({
      isBomb: true,
      neighbors,
    });

    s.knock();

    assert.equal(s.isRevealed, false, 'We have reveald this square');
    assert.equal(
      s.neighboringBombCount,
      null,
      'We did not see if the neighbors are bombs',
    );
  });
});
