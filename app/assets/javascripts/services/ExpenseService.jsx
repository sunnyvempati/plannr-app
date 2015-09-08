import request from 'superagent';
import {Utils} from './Utils';
import ServerActions from '../actions/ServerActions';
import ToastActions from '../actions/ToastActions';
import {APIEndpoints} from '../constants/AppConstants';

class ExpenseService {
  static getExpenses(params) {
    request
      .get(APIEndpoints.GET_EXPENSES)
      .query(params)
      .set('Accept', 'application/json')
      .end((error, res) => {
        if (res) {
          if (!error) {
            let json = JSON.parse(res.text);
            ServerActions.receiveExpenses(json.expenses, params, null);
          } else {
            let errors = Utils.getErrors(res);
            ServerActions.receiveExpenses(null, null, errors);
          }
        }
      });
  }

  static create(params) {
    request
      .post(APIEndpoints.CREATE_EXPENSE)
      .send(params)
      .use(Utils.addAuthToken)
      .end((error, res) => {
        if (res) {
          if (!error) {
            let json = JSON.parse(res.text);
            ServerActions.receiveCreateExpense(json);
          } else {
            let errors = Utils.getErrors(res);
            ServerActions.receiveCreateExpense(null, errors);
          }
        }
      });
  }

  static get(id) {
    request
      .get(APIEndpoints.GET_EXPENSE + id)
      .set('Accept', 'application/json')
      .end((error, res) => {
        let json = error ? null : JSON.parse(res.text);
        ServerActions.receiveGetExpense(json, error);
      });
  }

  static update(id, params) {
    request
      .put(APIEndpoints.UPDATE_EXPENSE + id)
      .send(params)
      .use(Utils.addAuthToken)
      .end((error, res) => {
        if (res) {
          if (!error) {
            let json = JSON.parse(res.text);
            ServerActions.receiveUpdateExpense(json);
          } else {
            let errors = Utils.getErrors(res);
            ServerActions.receiveUpdateExpense(null, errors);
          }
        }
      });
  }

  static remove(id) {
    request
      .del(APIEndpoints.DELETE_EXPENSE + id)
      .use(Utils.addAuthToken)
      .set('Accept', 'application/json')
      .end((error, res) => {
        let errors = null;
        if (res && error) errors = Utils.getErrors(res);
        if (!error) { ToastActions.toast("Expense deleted successfully from event!") }
        ServerActions.receiveDeleteExpense(id, errors);
      });
  }
}

export default ExpenseService;
