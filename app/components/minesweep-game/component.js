import Component from '@ember/component';
import { computed, get, set } from '@ember/object';
import { later } from '@ember/runloop';

export default Component.extend({
  game: null,
  resetGameAction: null,
  timeSpent: 0,

  didInsertElement() {
    this.countUp();
  },

  countUp() {
    later(this, () => {
      let t = this.get('timeSpent')
      this.set('timeSpent', t += 1)
      this.countUp();
    }, 1000);
  },

  minesLeft: computed(
    'game.{numberOfFlaggedSquares,numberOfMines}',
    function() {

    return this.get('game.numberOfMines') - this.get('game.numberOfFlaggedSquares');
  }),

  actions: {
    resetGame() {
      get(this, 'resetGameAction')();
      set(this, 'timeSpent', 0);
    }
  }
});
