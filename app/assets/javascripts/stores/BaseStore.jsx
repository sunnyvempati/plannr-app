import {EventEmitter} from 'events';

var CHANGE_EVENT = 'change';

class BaseStore extends EventEmitter {
  constructor() {
    super();
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
}

// dispatch token is to identify each of the stores
// when we use waitFor
BaseStore.dispatchToken = null;

export default BaseStore;
