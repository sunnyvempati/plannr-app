import request from 'superagent';
import {Utils} from './Utils';
import ServerActions from '../actions/ServerActions';
import {APIEndpoints} from '../constants/AppConstants';
import ToastActions from '../actions/ToastActions';

class ExpenseCategoryService {
  static search(params) {
    request
      .get(APIEndpoints.GET_EXPENSE_CATEGORIES)
      .query(params)
      .set('Accept', 'application/json')
      .end((error, res) => {
        if (res) {
          if (!error) {
            let json = JSON.parse(res.text);
            let expenseCategories = json.expense_categories || [];
            ServerActions.receiveExpenseCategoriesSearch(expenseCategories);
          } else {
            let errors = Utils.getErrors(res);
            ServerActions.receiveExpenseCategoriesSearch(null, errors);
          }
        }
      });
  }

  static get(id) {
    request
      .get(APIEndpoints.GET_EXPENSE_CATEGORY + id)
      .end((error, res) => {
        if (res) {
          if (!error) {
            let json = JSON.parse(res.text);
            ServerActions.receiveGetExpenseCategory(json);
          } else {
            let errors = Utils.getErrors(res);
            ServerActions.receiveGetExpenseCategory(null, errors);
          }
        }
      });
  }

  static create(params) {
    request
      .post(APIEndpoints.CREATE_EXPENSE_CATEGORY)
      .send(params)
      .use(Utils.addAuthToken)
      .end((error, res) => {
        if (res) {
          if (!error) {
            let json = JSON.parse(res.text);
            ServerActions.receiveCreateExpenseCategory(json);
          } else {
            let errors = Utils.getErrors(res);
            ServerActions.receiveCreateExpenseCategory(null, errors);
          }
        }
      });
  }
}

export default ExpenseCategoryService;
