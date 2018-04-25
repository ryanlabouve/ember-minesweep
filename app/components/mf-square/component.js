import Component from '@ember/component';
import { get } from '@ember/object';

export default Component.extend({
  tagName: '',

  //passed in
  square: null,

  actions: {
    flagSquare(square, event) {
      event.preventDefault();
      square.flag();
    },

    checkSquare(square) {
      square.check();
    },
  },
});
