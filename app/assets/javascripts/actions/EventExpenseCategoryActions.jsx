import AppDispatcher from '../dispatcher/AppDispatcher';
import {ActionTypes} from '../constants/AppConstants';
import EventExpenseCategoryService from '../services/EventExpenseCategoryService';
import EventExpenseCategoryStore from '../stores/EventExpenseCategoryStore';

export default class EventVendorActions {
  static getEventExpenseCategories(params) {
    AppDispatcher.handleAction({
      type: ActionTypes.GET_EVENT_EXPENSE_CATEGORY_REQUEST,
      params: params
    });
    EventExpenseCategoryService.getCategories(params);
  }
}
