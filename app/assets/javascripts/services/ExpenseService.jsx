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
            console.log("EXPENSE", json);
            ServerActions.receiveExpenses(json.expenses, params, null);
          } else {
            let errors = Utils.getErrors(res);
            ServerActions.receiveExpenses(null, null, errors);
          }
        }
      });
  }
}

export default ExpenseService;
