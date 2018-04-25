import Controller from '@ember/controller';
import {inject as service} from '@ember/service';
import {get} from '@ember/object';

export default Controller.extend({
  game: service(),
  actions: {
    startNewGame() {
      let game = get(this, 'game');
      get(game, 'startNewGame').apply(game, arguments);
    },
  }
});
