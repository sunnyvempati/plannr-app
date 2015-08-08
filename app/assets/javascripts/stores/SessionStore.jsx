import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import {ActionTypes} from '../constants/AppConstants.jsx';
import BaseStore from './BaseStore';

class SessionStore extends BaseStore {
  construction() {
    super();
  }

  isLoggedIn() {
    return !!this._user;
  }

  getUser: function() {
    return this._user;
  }
}

let sessionStoreInstance = new SessionStore();

sessionStoreInstance.dispatchToken = AppDispatcher.register(action => {
  switch (action) {
    case ActionTypes.LOGIN_RESPONSE:
      console.log(action.json);
      SessionStore.emitChange();
      break;
    case ActionTypes.LOGOUT:
      console.log(action.json);
      SessionStore.emitChange();
      break;
    default:
  }

  return true;
})

export default SessionStore;
