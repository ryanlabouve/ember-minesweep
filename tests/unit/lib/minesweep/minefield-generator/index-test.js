import {module, test} from 'qunit';
import {setupTest} from 'ember-qunit';
import MinefieldGenerator from 'ember-minesweep/lib/minesweep/minefield-generator';

module('Unit | Lib | minesweep | minefield-generator', function(hooks) {
  setupTest(hooks);

  test('#isBomb', function(assert) {
    let mg = new MinefieldGenerator();

    assert.equal(mg.isBomb(80, 'easy'), false);
    assert.equal(mg.isBomb(81, 'easy'), true);

    assert.equal(mg.isBomb(70, 'medium'), false);
    assert.equal(mg.isBomb(71, 'medium'), true);

    assert.equal(mg.isBomb(60, 'hard'), false);
    assert.equal(mg.isBomb(61, 'hard'), true);

    assert.equal(mg.isBomb(50, 'brutal'), false);
    assert.equal(mg.isBomb(51, 'brutal'), true);
  });
});
