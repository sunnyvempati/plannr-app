import AppDispatcher from '../dispatcher/AppDispatcher';
import {ActionTypes} from '../constants/AppConstants';
import ExpenseCategoryService from '../services/ExpenseCategoryService';
import ExpenseCategoryStore from '../stores/ExpenseCategoryStore';

export default class EventCategoryActions {
  static search(params) {
    AppDispatcher.handleAction({
      type: ActionTypes.SEARCH_EXPENSE_CATEGORIES_REQUEST,
      params: params
    });
    ExpenseCategoryService.search(params);
  }

  static get(id) {
    AppDispatcher.handleAction({
      type: ActionTypes.GET_EXPENSE_CATEGORY_REQUEST,
      id: id
    });
    ExpenseCategoryService.get(id);
  }

  static create(params) {
    AppDispatcher.handleAction({
      type: ActionTypes.CREATE_EXPENSE_CATEGORY_REQUEST,
      params: params
    });
    ExpenseCategoryService.create(params);
  }
}
