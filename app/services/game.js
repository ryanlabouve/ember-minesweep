import Service from '@ember/service';
import {set, get, computed} from '@ember/object';
import Minesweep from 'ember-minesweep/lib/minesweep';

export default Service.extend({
  currentGame: null,
  viewGame: false,

  // actions
  startNewGame() {
    let ms = new Minesweep({
      difficulty: 'easy',
    });
    set(this, 'currentGame', ms);
    set(this, 'somethingElse', true);
  },
});
