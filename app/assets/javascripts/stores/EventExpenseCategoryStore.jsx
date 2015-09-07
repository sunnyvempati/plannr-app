import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import {ActionTypes} from '../constants/AppConstants.jsx';
import BaseStore from './BaseStore';
import CacheStore from './CacheStore';
import SessionStore from './SessionStore';
import UserStore from './UserStore';
import extend from 'extend';


class EventExpenseCategory extends BaseStore {
  constructor() {
    super();
    this._cache = new CacheStore();
    this._eventExpenseCategories = [];
    this._searchResults = [];
  }

  get searchResults() { return this._searchResults; }
  setSearchResults(results) { this._searchResults = results; }

  getFromCache(params) {
    let categoryIds = this._cache.getItems(params);
    if (categoryIds) {
      return categoryIds.map((category) => {
        return this._eventExpenseCategories[category];
      });
    }
  }

  addCategories(categories, params) {
    this._cache.createContext(params);
    if (categories.length > 0) {
      categories.forEach((category) => {
        // add to global
        this._eventExpenseCategories[category.id] = category;
        // then add to cache
        this._cache.add(category.id, params);
      });
    }
  }

  add(eventExpenseCategory) {
    this._eventExpenseCategories[eventExpenseCategory.id] = eventExpenseCategory;
    this._cache.clear();
  }

  clear() {
    this._eventExpenseCategories = [];
    this._cache.clear();
  }
}

let _eventExpenseCategoryStoreInstance = new EventExpenseCategory();

_eventExpenseCategoryStoreInstance.dispatchToken = AppDispatcher.register((payload) => {
  AppDispatcher.waitFor([
    SessionStore.dispatchToken,
    UserStore.dispatchToken
  ]);
  let action = payload.action;

  switch(action.type) {
    case ActionTypes.GET_EVENT_EXPENSE_CATEGORIES_RESPONSE:
      if (action.expenseCategories) {
        _eventExpenseCategoryStoreInstance.addCategories(action.expenseCategories, action.params);
      }
      _eventExpenseCategoryStoreInstance.emitChange();
      break;
    case ActionTypes.LOGOUT_RESPONSE:
      if (!SessionStore.isLoggedIn()) _eventExpenseCategoryStoreInstance.clear();
      break;
    case ActionTypes.CREATE_EVENT_EXPENSE_CATEGORY_SUCCESS_RESPONSE:
      _eventExpenseCategoryStoreInstance.add(action.entity);
      _eventExpenseCategoryStoreInstance.emitChange();
      break;
    default:
  }

  return true;
});

export default _eventExpenseCategoryStoreInstance;
