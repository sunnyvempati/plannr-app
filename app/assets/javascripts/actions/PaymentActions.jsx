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
    PaymentService.update(id, expenseId, params);
  }

  static delete(id, expenseId) {
    AppDispatcher.handleAction({
      type: ActionTypes.DELETE_PAYMENT_REQUEST,
      id: id,
      expenseId: expenseId
    })
    PaymentService.delete(id, expenseId);
  }
}

export default PaymentActions;
