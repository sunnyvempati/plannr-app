import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import {ActionTypes} from '../constants/AppConstants.jsx';
import BaseStore from './BaseStore';
import CacheStore from './CacheStore';
import SessionStore from './SessionStore';
import UserStore from './UserStore';
import PaymentStore from './PaymentStore';
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
        this._cache.add(expense.id, params);
      });
    }
  }

  get(id) {
    return this._expenses[id];
  }

  add(expense) {
    this._expenses[expense.id] = expense;
    this._cache.clear();
  }

  addPayment(expenseId, payment) {
    let expense = this._expenses[expenseId]
    if (expense.payments) expense.payments.push(payment);
    else expense.payments = [payment];
  }

  updatePayment(expenseId, payment) {
    let expense = this._expenses[expenseId];
    expense.payments.forEach((p) => {
      if (p.id == payment.id) {
        p = extend({}, p, payment);
      }
    })
  }

  removePayment(expenseId, paymentId) {
    let expense = this._expenses[expenseId];
    let payments = expense.payments.filter((p) => {
      return p.id != paymentId;
    });
    this._expenses[expenseId].payments = payments;
  }

  remove(id) {
    delete this._expenses[id];
    this._cache.clear();
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
    UserStore.dispatchToken,
    PaymentStore.dispatchToken
  ]);
  let action = payload.action;

  switch(action.type) {
    case ActionTypes.GET_EXPENSES_RESPONSE:
      if (action.expenses) {
        _expenseStoreInstance.addExpenses(action.expenses, action.params);
      }
      _expenseStoreInstance.emitChange();
      break;
    case ActionTypes.UPDATE_EXPENSE_SUCCESS_RESPONSE:
    case ActionTypes.CREATE_EXPENSE_SUCCESS_RESPONSE:
      _expenseStoreInstance.add(action.entity);
      _expenseStoreInstance.emitChange();
      break;
    case ActionTypes.GET_EXPENSE_RESPONSE:
      let expense = action.json && action.json.expense;
      if (expense) _expenseStoreInstance.add(expense);
      _expenseStoreInstance.emitChange();
      break;
    case ActionTypes.DELETE_EXPENSE_RESPONSE:
      if (!action.errors) {
        _expenseStoreInstance.remove(action.id);
        _expenseStoreInstance.emitChange();
      }
      break;
    case ActionTypes.CREATE_PAYMENT_SUCCESS_RESPONSE:
      _expenseStoreInstance.addPayment(action.expenseId, action.entity);
      _expenseStoreInstance.emitChange();
      break;
    case ActionTypes.UPDATE_PAYMENT_SUCCESS_RESPONSE:
      _expenseStoreInstance.updatePayment(action.expenseId, action.entity);
      _expenseStoreInstance.emitChange();
      break;
    case ActionTypes.DELETE_PAYMENT_RESPONSE:
      if (!action.errors) {
        _expenseStoreInstance.removePayment(action.expenseId, action.paymentId);
        _expenseStoreInstance.emitChange();
      }
      break;
    case ActionTypes.LOGOUT_RESPONSE:
      if (!SessionStore.isLoggedIn()) _expenseStoreInstance.clear();
      break;
    default:
  }

  return true;
});

export default _expenseStoreInstance;
