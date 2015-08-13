import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import {ActionTypes} from '../constants/AppConstants.jsx';
import BaseStore from './BaseStore';
import SessionStore from './SessionStore';

class UserStore extends BaseStore {
  constructor() {
    super();
    this._users = {};
  }

  // getters
  get users() { return this._users; }
  getUser(id) {
    return this._users[id];
  }

  get currentUser() {
    return this._users[SessionStore.userId];
  }

  addUser(user) {
    this._users[user.id] = user;
  }
}

let _userStoreInstance = new UserStore();

_userStoreInstance.dispatchToken = AppDispatcher.register((payload) => {
  AppDispatcher.waitFor([
    SessionStore.dispatchToken
  ]);

  let action = payload.action;

  switch (action.type) {
    case ActionTypes.LOGIN_RESPONSE:
      if (action.json &&
          action.json.user_session) {
        let userId = action.json.user_session.user_id;
        _userStoreInstance.addUser({id: userId});
      }
      _userStoreInstance.emitChange();
      break;

    case ActionTypes.GET_USER_RESPONSE:
      let user = action.json && action.json.user;
      if (user) _userStoreInstance.addUser(user);
      _userStoreInstance.emitChange();
      break;

    default:
  }

  return true;
})

export default _userStoreInstance;
