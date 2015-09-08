import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import {ActionTypes} from '../constants/AppConstants.jsx';
import BaseStore from './BaseStore';
import CacheStore from './CacheStore';

class PaymentStore extends BaseStore {
  constructor() {
    super();
    this._payments = [];
  }

  addPayments(payments) {
    payments.forEach((payment) => {
      this._payments[payment.id] = payment;
    });
  }

  get(id) {
    return this._payments[id];
  }

  add(payment) {
    this._payments[payment.id] = payment;
  }

  remove(id) {
    delete this._payments[id];
  }

  clear() {
    this._payments = [];
  }
}

let _paymentStoreInstance = new PaymentStore();

_paymentStoreInstance.dispatchToken = AppDispatcher.register((payload) => {
  let action = payload.action;

  switch(action.type) {
    case ActionTypes.GET_EXPENSES_RESPONSE:
      if (action.expenses) {
        action.expenses.forEach((e) => {
          _paymentStoreInstance.addPayments(e.payments);
        });
      }
      _paymentStoreInstance.emitChange();
      break;
    case ActionTypes.GET_EXPENSE_RESPONSE:
      let expense = action.json && action.json.expense;
      if (expense) _paymentStoreInstance.addPayments(expense.payments);
      _paymentStoreInstance.emitChange();
      break;
    case ActionTypes.UPDATE_PAYMENT_SUCCESS_RESPONSE:
    case ActionTypes.CREATE_PAYMENT_SUCCESS_RESPONSE:
      _paymentStoreInstance.add(action.entity);
      _paymentStoreInstance.emitChange();
      break;
    case ActionTypes.DELETE_PAYMENT_RESPONSE:
      if (!action.errors) {
        _paymentStoreInstance.remove(action.id);
      }
      _paymentStoreInstance.emitChange();
      break;
    case ActionTypes.LOGOUT_RESPONSE:
      if (!SessionStore.isLoggedIn()) _paymentStoreInstance.clear();
      break;
    default:
  }

  return true;
});

export default _paymentStoreInstance;
