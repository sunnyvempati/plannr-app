import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import {ActionTypes} from '../constants/AppConstants.jsx';
import BaseStore from './BaseStore';

class SessionStore extends BaseStore {
  constructor() {
    super();
    this._sessionToken = null;
    this._userId = null;
    this._errors = [];

    this._autoLogin();
  }

  _autoLogin() {
    let token = localStorage.getItem("sessionToken");

    if (token) {
      let id = localStorage.getItem("userId");
      this._userId = id;
      this._sessionToken = token;
    }
  }

  get userId() {
    return this._userId;
  }

  get errors() {
    return this._errors;
  }

  isLoggedIn() {
    return !!this._sessionToken;
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
        let userId = action.json.user_session.user_id;
        _sessionStoreInstance._sessionToken = token;
        _sessionStoreInstance._userId = userId;
        localStorage.setItem('sessionToken', token);
        localStorage.setItem('userId', userId);
      }
      if (action.errors) {
        _sessionStoreInstance._errors = action.errors;
      }
      _sessionStoreInstance.emitChange();
      break;
    case ActionTypes.PROFILE_RESPONSE:
      if (action.errors) {
        _sessionStoreInstance._errors = action.errors;
      }
      _sessionStoreInstance.emitChange();
      break;
    case ActionTypes.RESET_PASSWORD_REQUEST_RESPONSE:
    case ActionTypes.RESET_PASSWORD_RESPONSE:
    case ActionTypes.SIGNUP_RESPONSE:
      _sessionStoreInstance._errors = action.errors;
      _sessionStoreInstance.emitChange();
      break;
    case ActionTypes.LOGOUT_RESPONSE:
      if (!action.errors) {
        _sessionStoreInstance._sessionToken = null;
        _sessionStoreInstance._userId = null;
        localStorage.removeItem('sessionToken');
        localStorage.removeItem('userId');
        _sessionStoreInstance.emitChange();
      }
      break;
    default:
  }

  return true;
})

export default _sessionStoreInstance;
