import AppDispatcher from '../dispatcher/AppDispatcher';
import {ActionTypes} from '../constants/AppConstants';
import ExpenseService from '../services/ExpenseService';
import ExpenseStore from '../stores/ExpenseStore';

class ExpenseActions {
  static getExpenses(params) {
    AppDispatcher.handleAction({
      type: ActionTypes.GET_EXPENSES_REQUEST,
      params: params
    });
    ExpenseService.getExpenses(params);
  }

  static create(params) {
    AppDispatcher.handleAction({
      type: ActionTypes.CREATE_EXPENSE_REQUEST,
      params: params
    });
    ExpenseService.create(params);
  }

  static update(id, params) {
    AppDispatcher.handleAction({
      type: ActionTypes.UPDATE_EXPENSE_REQUEST,
      id: id,
      params: params
    });
    ExpenseService.update(id, params);
  }

  static remove(id) {
    AppDispatcher.handleAction({
      type: ActionTypes.DELETE_EXPENSE_REQUEST,
      id: id
    })
    ExpenseService.remove(id);
  }

  static get(id) {
    AppDispatcher.handleAction({
      type: ActionTypes.GET_EXPENSE_REQUEST,
      id: id
    });
    ExpenseService.get(id);
  }
}

export default ExpenseActions;
