import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import {ActionTypes} from '../constants/AppConstants.jsx';
import BaseStore from './BaseStore';
import TaskStore from './TaskStore';
import keyMirror from 'keymirror';

class ModalStore extends BaseStore {
  get stateTypes() {
    return keyMirror({
      OPEN: null,
      CLOSE: null
    });
  }

  constructor() {
    super();
    this._modal = null;
    this._state = this.stateTypes.CLOSE;
  }

  get modal() { return this._modal; }
  set modal(val) { this._modal = val; }
  get state() { return this._state; }
  set state(val) { this._state = val; }

  clearAndClose() {
    this._modal = null;
    this._state = this.stateTypes.CLOSE;
  }
}

let _modalStoreInstance = new ModalStore();

_modalStoreInstance.dispatchToken = AppDispatcher.register((payload) => {
  AppDispatcher.waitFor([
    TaskStore.dispatchToken
  ]);

  let action = payload.action;

  switch (action.type) {
    case ActionTypes.OPEN_MODAL:
      _modalStoreInstance.modal = action.modal;
      _modalStoreInstance.state = _modalStoreInstance.stateTypes.OPEN;
      _modalStoreInstance.emitChange();
      break;
    case ActionTypes.DELETE_TASK_RESPONSE:
    case ActionTypes.CLOSE_MODAL:
      _modalStoreInstance.clearAndClose();
      _modalStoreInstance.emitChange();
      break;
    default:
  }
})

export default _modalStoreInstance;
