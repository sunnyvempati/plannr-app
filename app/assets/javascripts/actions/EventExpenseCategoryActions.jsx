import AppDispatcher from '../dispatcher/AppDispatcher';
import {ActionTypes} from '../constants/AppConstants';
import EventExpenseCategoryService from '../services/EventExpenseCategoryService';
import EventExpenseCategoryStore from '../stores/EventExpenseCategoryStore';

export default class EventExpenseCategoryActions {
  static getEventExpenseCategories(params) {
    AppDispatcher.handleAction({
      type: ActionTypes.GET_EVENT_EXPENSE_CATEGORY_REQUEST,
      params: params
    });
    EventExpenseCategoryService.getCategories(params);
  }

  static create(params) {
    AppDispatcher.handleAction({
      type: ActionTypes.CREATE_EVENT_EXPENSE_CATEGORY_REQUEST,
      params: params
    });
    EventExpenseCategoryService.create(params);
  }

  static update(id, params) {
    AppDispatcher.handleAction({
      type: ActionTypes.UPDATE_EVENT_EXPENSE_CATEGORY_REQUEST,
      id: id,
      params: params
    });
    EventExpenseCategoryService.update(id, params);
  }

  static remove(id) {
    AppDispatcher.handleAction({
      type: ActionTypes.DELETE_EVENT_EXPENSE_CATEGORY_REQUEST,
      id: id
    })
    EventExpenseCategoryService.remove(id);
  }

  static get(id) {
    AppDispatcher.handleAction({
      type: ActionTypes.GET_EVENT_EXPENSE_CATEGORY_REQUEST,
      id: id
    });
    EventExpenseCategoryService.get(id);
  }

  static search(params) {
    AppDispatcher.handleAction({
      type: ActionTypes.SEARCH_EVENT_EXPENSE_CATEGORIES_REQUEST,
      params: params
    });
    EventExpenseCategoryService.search(params);
  }
}
