import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import {ActionTypes} from '../constants/AppConstants.jsx';
import BaseStore from './BaseStore';

let _sessionToken = sessionStorage.getItem('sessionToken');
let _email = sessionStorage.getItem('email');

class SessionStore extends BaseStore {
  constructor() {
    super();
  }

  isLoggedIn() {
    return !!this._user;
  }
}

let sessionStoreInstance = new SessionStore();

sessionStoreInstance.dispatchToken = AppDispatcher.register((payload) => {
  let action = payload.action;
  switch (action.type) {
    case ActionTypes.LOGIN_RESPONSE:
      if (action.json &&
          action.json.user_session &&
          action.json.user_session.token) {
        _sessionToken = action.json.user_session.token;
        _email = action.json.email;
        sessionStorage.setItem('sessionToken', _sessionToken);
        sessionStorage.setItem('email', _email);
      }
      sessionStoreInstance.emitChange();
      break;
    case ActionTypes.LOGOUT:
      _sessionToken = null;
      _email = null;
      sessionStorage.removeItem('sessionToken');
      sessionStorage.removeItem('email');
      sessionStoreInstance.emitChange();
      break;
    default:
  }

  return true;
})

export default sessionStoreInstance;
