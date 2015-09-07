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
            ServerActions.receiveGetExpenseCategories(json.event_expense_categories, params, null);
          } else {
            let errors = Utils.getErrors(res);
            ServerActions.receiveGetExpenseCategories(null, null, errors);
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
}

export default EventExpenseCategoryService;
