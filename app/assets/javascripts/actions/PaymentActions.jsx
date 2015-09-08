import AppDispatcher from '../dispatcher/AppDispatcher';
import {ActionTypes} from '../constants/AppConstants';
import PaymentService from '../services/PaymentService';
import PaymentStore from '../stores/PaymentStore';

class PaymentActions {
  static create(expenseId, params) {
    AppDispatcher.handleAction({
      type: ActionTypes.CREATE_PAYMENT_REQUEST,
      expenseId: expenseId,
      params: params
    });
    PaymentService.create(expenseId, params);
  }

  static update(id, expenseId, params) {
    AppDispatcher.handleAction({
      type: ActionTypes.UPDATE_PAYMENT_REQUEST,
      id: id,
      expenseId: expenseId,
      params: params
    });
    ExpenseService.update(id, expenseId, params);
  }

  static remove(id, expenseId) {
    AppDispatcher.handleAction({
      type: ActionTypes.DELETE_PAYMENT_REQUEST,
      id: id,
      expenseId: expenseId
    })
    ExpenseService.remove(id, expenseId);
  }
}

export default PaymentActions;
