import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import {ActionTypes} from '../constants/AppConstants.jsx';
import BaseStore from './BaseStore';

class SessionStore extends BaseStore {
  constructor() {
    super();
    this._sessionToken = sessionStorage.getItem('sessionToken');
    this._email = sessionStorage.getItem('email');
    this._errors = [];
  }

  isLoggedIn() {
    return !!this._sessionToken;
  }

  getErrors() {
    return this._errors;
  }
}

let _sessionStoreInstance = new SessionStore();

_sessionStoreInstance.dispatchToken = AppDispatcher.register((payload) => {
  let action = payload.action;
  switch (action.type) {
    case ActionTypes.LOGIN_RESPONSE:
      if (action.json &&
          action.json.user_session &&
          action.json.user_session.token) {
        let token = action.json.user_session.token;
        let email = action.json.user_session.user_email;
        _sessionStoreInstance._sessionToken = token;
        _sessionStoreInstance._email = email;
        sessionStorage.setItem('sessionToken', token);
        sessionStorage.setItem('email', email);
      }
      if (action.errors) {
        _sessionStoreInstance._errors = action.errors;
      }
      _sessionStoreInstance.emitChange();
      break;
    case ActionTypes.LOGOUT:
      _sessionStoreInstance._sessionToken = null;
      _sessionStoreInstance._email = null;
      sessionStorage.removeItem('sessionToken');
      sessionStorage.removeItem('email');
      _sessionStoreInstance.emitChange();
      break;
    default:
  }

  return true;
})

export default _sessionStoreInstance;
