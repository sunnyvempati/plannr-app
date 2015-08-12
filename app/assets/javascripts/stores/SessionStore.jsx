import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import {ActionTypes} from '../constants/AppConstants.jsx';
import BaseStore from './BaseStore';

class SessionStore extends BaseStore {
  constructor() {
    super();
    this._sessionToken = null;
    this._user = {};
    this._errors = [];

    this._autoLogin();
  }

  _autoLogin() {
    let token = localStorage.getItem("sessionToken");

    if (token) {
      let user = JSON.parse(localStorage.getItem("user"));
      this._user = user;
      this._sessionToken = token;
    }
  }

  get user() {
    return this._user;
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
        let user = action.json.user_session.user;
        _sessionStoreInstance._sessionToken = token;
        _sessionStoreInstance._user = user;
        localStorage.setItem('sessionToken', token);
        localStorage.setItem('user', JSON.stringify(user));
      }
      if (action.errors) {
        _sessionStoreInstance._errors = action.errors;
      }
      _sessionStoreInstance.emitChange();
      break;
    case ActionTypes.PROFILE_RESPONSE:
      let profile = action.json && action.json.profile;
      if (profile) {
        _sessionStoreInstance._user.first_name = profile.first_name;
        _sessionStoreInstance._user.last_name = profile.last_name;
        localStorage.setItem('user', JSON.stringify(_sessionStoreInstance._user));
      }
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
        _sessionStoreInstance._user = null;
        localStorage.removeItem('sessionToken');
        localStorage.removeItem('user');
        _sessionStoreInstance.emitChange();
      }
      break;
    default:
  }

  return true;
})

export default _sessionStoreInstance;
