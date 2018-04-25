import Component from '@ember/component';
import { computed, get, set } from '@ember/object';
import { task, timeout } from 'ember-concurrency';

export default Component.extend({
  game: null,
  resetGameAction: null,
  timeSpent: 0,

  didInsertElement() {
    get(this, 'countUp').perform(get(this, 'timeSpent'));
  },

  countUp: task(function * (t) {
    set(this, 'timeSpent', t += 1)

    yield timeout(1000);

    get(this, 'countUp').perform(get(this, 'timeSpent'));
  }),

  minesLeft: computed(
    'game.{numberOfFlaggedSquares,numberOfMines}',
    function() {

    return this.get('game.numberOfMines') - this.get('game.numberOfFlaggedSquares');
  }),

  actions: {
    resetGame() {
      let difficulty = get(this, 'game.opts.difficulty');
      let size = get(this, 'game.opts.width');

      get(this, 'resetGameAction')(difficulty, size);
      set(this, 'timeSpent', 0);
    }
  }
});
