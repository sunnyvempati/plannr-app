import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import {ActionTypes} from '../constants/AppConstants.jsx';
import BaseStore from './BaseStore';
import CacheStore from './CacheStore';
import SessionStore from './SessionStore';
import UserStore from './UserStore';
import extend from 'extend';


class ExpenseStore extends BaseStore {
  constructor() {
    super();
    this._cache = new CacheStore();
    this._expenses = [];
  }

  getFromCache(params) {
    let expenseIds = this._cache.getItems(params);
    if (expenseIds) {
      return expenseIds.map((expense) => {
        return this._expenses[expense];
      });
    }
  }

  addExpenses(expenses, params) {
    this._cache.createContext(params);
    if (expenses.length > 0) {
      expenses.forEach((expense) => {
        // add to global
        this._expenses[expense.id] = expense;
        // then add to cache
        this._cache.add(event.id, params);
      });
    }
  }

  clear() {
    this._expenses = [];
    this._cache.clear();
  }
}

let _expenseStoreInstance = new ExpenseStore();

_expenseStoreInstance.dispatchToken = AppDispatcher.register((payload) => {
  AppDispatcher.waitFor([
    SessionStore.dispatchToken,
    UserStore.dispatchToken
  ]);
  let action = payload.action;

  switch(action.type) {
    case ActionTypes.GET_EXPENSES_RESPONSE:
      if (action.expenses) {
        _expenseStoreInstance.addExpenses(action.expenses, action.params);
      }
      _expenseStoreInstance.emitChange();
      break;
    case ActionTypes.LOGOUT_RESPONSE:
      if (!SessionStore.isLoggedIn()) _expenseStoreInstance.clear();
      break;
    default:
  }

  return true;
});

export default _expenseStoreInstance;
