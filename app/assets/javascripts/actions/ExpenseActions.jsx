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
}

export default ExpenseActions;
