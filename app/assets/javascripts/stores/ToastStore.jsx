import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import {ActionTypes} from '../constants/AppConstants.jsx';
import BaseStore from './BaseStore';

class ToastStore extends BaseStore {
  constructor() {
    super();
    this._message = null;
  }

  get message() {
    return this._message;
  }
}

let _toastStoreInstance = new ToastStore();

_toastStoreInstance.dispatchToken = AppDispatcher.register((payload) => {
  let action = payload.action;

  if (/REQUEST/.test(action.type)) {
    _toastStoreInstance._message = {loading: true};
    _toastStoreInstance.emitChange();
  }
  if (/RESPONSE/.test(action.type)) {
    _toastStoreInstance._message = null;
    _toastStoreInstance.emitChange();
  }

  switch (action.type) {
    case ActionTypes.TOAST_MESSAGE:
      _toastStoreInstance._message = {
        text: action.message,
        error: false
      }
      _toastStoreInstance.emitChange();
      break;
    case ActionTypes.TOAST_ERROR:
      _toastStoreInstance._message = {
        text: action.message,
        error: true
      }
      _toastStoreInstance.emitChange();
      break;
    case ActionTypes.CLOSE_TOAST:
      _toastStoreInstance._message = null;
      _toastStoreInstance.emitChange();
      break;
    default:
  }
})

export default _toastStoreInstance;
