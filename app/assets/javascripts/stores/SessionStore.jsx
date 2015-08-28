import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import {ActionTypes} from '../constants/AppConstants.jsx';
import BaseStore from './BaseStore';

class SessionStore extends BaseStore {
  constructor() {
    super();
    this._sessionToken = null;
    this._userId = null;
    this._error = null;

    this._autoLogin();
  }

  set error(val) { this._error = val; }
  get error() { return this._error; }

  _autoLogin() {
    let token = localStorage.getItem("sessionToken");

    if (token) {
      let id = localStorage.getItem("userId");
      this._userId = id;
      this._sessionToken = token;
    }
  }

  login(token, userId) {
    this._sessionToken = token;
    this._userId = userId;
    localStorage.setItem('sessionToken', token);
    localStorage.setItem('userId', userId);
  }

  logout() {
    this._sessionToken = null;
    this._userId = null;
    localStorage.removeItem('sessionToken');
    localStorage.removeItem('userId');
  }

  get userId() {
    return this._userId;
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
        _sessionStoreInstance.login(token, userId);
      }
      _sessionStoreInstance.emitChange();
      break;
    case ActionTypes.LOGOUT_RESPONSE:
      if (!action.errors) {
        _sessionStoreInstance.logout();
        _sessionStoreInstance.emitChange();
      }
      break;
    case ActionTypes.UNAUTHORIZED_REQUEST:
      _sessionStoreInstance.logout();
      break;
    case ActionTypes.VERIFY_RESPONSE:
      if (action.error) {
        _sessionStoreInstance.error = action.error;
      } else _sessionStoreInstance.error = null;
      _sessionStoreInstance.emitChange();
      break;
    default:
  }

  return true;
})

export default _sessionStoreInstance;
