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