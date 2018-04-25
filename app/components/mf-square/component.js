import Component from '@ember/component';
import {get, computed} from '@ember/object';

export default Component.extend({
  tagName: '',

  //passed in
  square: null,

  color: computed('square.neighboringBombCount', function() {
    let count = get(this, 'square.neighboringBombCount');
    switch (count) {
      case 0:
        return '#bbbabb';
      case 1:
        return '#0022ED';
      case 2:
        return '#4A772B';
      case 3:
        return '#D3422A';
      case 4:
        return '#001371';
      case 5:
        return '#EFCF65';
      case 6:
        return '#91DD81';
      case 7:
        return '#5251B2';
      case 8:
        return '#bada55';
    }
  }).readOnly(),

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
