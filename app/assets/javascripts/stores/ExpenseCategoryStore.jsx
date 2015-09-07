import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import {ActionTypes} from '../constants/AppConstants.jsx';
import BaseStore from './BaseStore';
import CacheStore from './CacheStore';
import SessionStore from './SessionStore';
import UserStore from './UserStore';
import extend from 'extend';

class ExpenseCategoryStore extends BaseStore {
  constructor() {
    super();
    this._searchResults = [];
    this._expenseCategories = [];
  }

  get searchResults() { return this._searchResults; }
  setSearchResults(results) { this._searchResults = results; }

  add(expenseCategory) {
    this._expenseCategories[expenseCategory.id] = expenseCategory;
  }
}

let _expenseCategoryStoreInstance = new ExpenseCategoryStore();

_expenseCategoryStoreInstance.dispatchToken = AppDispatcher.register((payload) => {
  AppDispatcher.waitFor([
    SessionStore.dispatchToken,
    UserStore.dispatchToken
  ]);
  let action = payload.action;

  switch(action.type) {
    case ActionTypes.SEARCH_EXPENSE_CATEGORIES_RESPONSE:
      if (!action.errors) {
        _expenseCategoryStoreInstance.setSearchResults(action.expenseCategories);
        _expenseCategoryStoreInstance.emitChange();
      }
      break;
    case ActionTypes.GET_EXPENSE_CATEGORY_RESPONSE:
      let expenseCategory = action.json && action.json.expense_category;
      if (!action.errors) _expenseCategoryStoreInstance.add(expenseCategory);
      _expenseCategoryStoreInstance.emitChange();
      break;
    case ActionTypes.CREATE_EXPENSE_CATEGORY_SUCCESS_RESPONSE:
      _expenseCategoryStoreInstance.add(action.entity);
      _expenseCategoryStoreInstance.emitChange();
      break;
    default:
  }

  return true;
});

export default _expenseCategoryStoreInstance;
