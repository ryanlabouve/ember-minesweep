import {module, test} from 'qunit';
import {
  visit,
  click,
  currentURL,
  findAll,
  pauseTest,
} from '@ember/test-helpers';
import {setupApplicationTest} from 'ember-qunit';

module('Acceptance | play game', function(hooks) {
  setupApplicationTest(hooks);

  test('starting a new game', async function(assert) {
    await visit('/');
    await click('[data-test-new-game]');
    assert.equal(findAll('[data-test-minesweep-game]').length, 1);
    assert.equal(findAll('[data-test-minesweep-minefield]').length, 1);
  });
});
