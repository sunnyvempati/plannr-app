import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import {ActionTypes} from '../constants/AppConstants.jsx';
import BaseStore from './BaseStore';
import SessionStore from './SessionStore';
import ViewStore from './ViewStore';
import CacheStore from './CacheStore';

class UserStore extends BaseStore {
  constructor() {
    super();
    this._users = {};
    this._searchResults = [];
    this._cache = new CacheStore();
    // use for pagination/sort/filter
    this._view = new ViewStore;
  }

  get usersLoaded() { return this._view.itemsLoaded; }
  get viewUsers() {
    let viewUserIds = this._view.viewItems;
    return viewUserIds.map((id) => this._users[id]);
  }

  // getters
  get users() { return this._users; }
  get searchResults() { return this._searchResults; }
  set searchResults(val) { this._searchResults = val }

  addUsers(users, params) {
    let isSearchQuery = !!params.search_query;
    if (!isSearchQuery) this._cache.createContext(params);
    let page = params.page;
    if (users.length > 0) {
      this._view.addPage(page);
      users.forEach((user) => {
        // add to global
        this._users[user.id] = user;
        this._view.addItemToPage(user.id, page);
        // then add to cache
        if (!isSearchQuery) this._cache.add(user.id, params);
      });
    } else this._view.itemsLoaded = true;
  }

  add(user) {
    this._users[user.id] = user;
    this._cache.clear();
  }

  addCachedUsersToView(params) {
    let userIds = this._cache.getItems(params);
    let page = params.page;
    if (userIds && userIds.length) {
      this._view.addItemsToPage(userIds, page);
    } else this._view.itemsLoaded = true;
  }

  isCached(params) {
    return !!this._cache.contextExists(params);
  }

  removeUsers(ids) {
    this._cache.clear();
    // remove from global user map
    ids.map((id) => {
      delete this._users[id];
    });
    // remove from view
    this._view.remove(ids);
  }

  get(id) {
    return this._users[id];
  }

  get currentUser() {
    return this._users[SessionStore.userId];
  }

  clear() {
    this._searchResults = [];
    this._users = [];
    this._cache.clear();
    this._view.reset();
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
    case ActionTypes.UPDATE_USER_RESPONSE:
    case ActionTypes.GET_USER_RESPONSE:
      let user = action.json && action.json.user;
      if (user) _userStoreInstance.addUser(user);
      _userStoreInstance.emitChange();
      break;

    case ActionTypes.SEARCH_USERS_RESPONSE:
      if (!action.errors) {
        _userStoreInstance.searchResults = action.users;
        _userStoreInstance.emitChange();
      }
      break;
    case ActionTypes.GET_USERS_RESPONSE:
      if (action.users) {
        _userStoreInstance.addUsers(action.users, action.params);
      }
      _userStoreInstance.emitChange();
      break;
    case ActionTypes.DELETE_USERS_RESPONSE:
      if (!action.errors) {
        _userStoreInstance.removeUsers(action.ids);
        _userStoreInstance.emitChange();
      }
      break;
    case ActionTypes.LOGOUT_RESPONSE:
      if (!SessionStore.isLoggedIn()) _userStoreInstance.clear();
      break;
    default:
  }

  return true;
})

export default _userStoreInstance;
