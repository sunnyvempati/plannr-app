import request from 'superagent';
import {Utils} from './Utils';
import ServerActions from '../actions/ServerActions';
import {APIEndpoints} from '../constants/AppConstants';
import ToastActions from '../actions/ToastActions';

class EventExpenseCategoryService {
  static getCategories(params) {
    request
      .get(APIEndpoints.GET_EVENT_EXPENSE_CATEGORIES)
      .query(params)
      .set('Accept', 'application/json')
      .end((error, res) => {
        if (res) {
          if (!error) {
            let json = JSON.parse(res.text);
            let eventExpenseCategories = json.event_expense_categories || [];
            ServerActions.receiveGetExpenseCategories(eventExpenseCategories, params, null);
          } else {
            let errors = Utils.getErrors(res);
            ServerActions.receiveGetExpenseCategories(null, null, errors);
          }
        }
      });
  }

  static search(params) {
    request
      .get(APIEndpoints.GET_EVENT_EXPENSE_CATEGORIES)
      .query(params)
      .set('Accept', 'application/json')
      .end((error, res) => {
        if (res) {
          if (!error) {
            let json = JSON.parse(res.text);
            let expenseCategories = json.event_expense_categories || [];
            ServerActions.receiveSearchEventExpenseCategories(expenseCategories);
          } else {
            let errors = Utils.getErrors(res);
            ServerActions.receiveSearchEventExpenseCategories(null, errors);
          }
        }
      });
  }

  static create(params) {
    request
      .post(APIEndpoints.CREATE_EVENT_EXPENSE_CATEGORY)
      .send(params)
      .use(Utils.addAuthToken)
      .end((error, res) => {
        if (res) {
          if (!error) {
            let json = JSON.parse(res.text);
            ServerActions.receiveCreateEventExpenseCategory(json);
          } else {
            let errors = Utils.getErrors(res);
            ServerActions.receiveCreateEventExpenseCategory(null, errors);
          }
        }
      });
  }

  static get(id) {
    request
      .get(APIEndpoints.GET_EVENT_EXPENSE_CATEGORY + id)
      .set('Accept', 'application/json')
      .end((error, res) => {
        let json = error ? null : JSON.parse(res.text);
        ServerActions.receiveGetEventExpenseCategory(json, error);
      });
  }

  static update(id, params) {
    request
      .put(APIEndpoints.UPDATE_EVENT_EXPENSE_CATEGORY + id)
      .send(params)
      .use(Utils.addAuthToken)
      .end((error, res) => {
        if (res) {
          if (!error) {
            let json = JSON.parse(res.text);
            ServerActions.receiveUpdateEventExpenseCategory(json);
          } else {
            let errors = Utils.getErrors(res);
            ServerActions.receiveUpdateEventExpenseCategory(null, errors);
          }
        }
      });
  }

  static remove(id) {
    request
      .del(APIEndpoints.DELETE_EVENT_EXPENSE_CATEGORY + id)
      .use(Utils.addAuthToken)
      .set('Accept', 'application/json')
      .end((error, res) => {
        let errors = null;
        if (res && error) errors = Utils.getErrors(res);
        if (!error) { ToastActions.toast("Budget Category removed successfully from event!") }
        ServerActions.receiveDeleteEventExpenseCategory(id, errors);
      });
  }
}

export default EventExpenseCategoryService;
