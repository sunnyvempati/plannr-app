import request from 'superagent';
import {Utils} from './Utils';
import ServerActions from '../actions/ServerActions';
import ToastActions from '../actions/ToastActions';
import {APIEndpoints} from '../constants/AppConstants';

class PaymentService {
  static create(expenseId, params) {
    request
      .post(APIEndpoints.CREATE_PAYMENT)
      .send(params)
      .use(Utils.addAuthToken)
      .end((error, res) => {
        if (res) {
          let json=null, errors=null;
          if (!error) {
            json = JSON.parse(res.text);
          } else {
            errors = Utils.getErrors(res);
          }
          ServerActions.receiveCreatePayment(expenseId, json, errors);
        }
      });
  }

  static update(id, expenseId, params) {
    request
      .put(APIEndpoints.UPDATE_PAYMENT + id)
      .send(params)
      .use(Utils.addAuthToken)
      .end((error, res) => {
        if (res) {
          let json=null, errors=null;
          if (!error) {
            json = JSON.parse(res.text);
          } else {
            errors = Utils.getErrors(res);
          }
          ServerActions.receiveUpdatePayment(expenseId, json, errors);
        }
      });
  }

  static remove(id, expenseId) {
    request
      .del(APIEndpoints.DELETE_PAYMENT + id)
      .use(Utils.addAuthToken)
      .set('Accept', 'application/json')
      .end((error, res) => {
        let errors = null;
        if (res && error) errors = Utils.getErrors(res);
        if (!error) { ToastActions.toast("Payment deleted successfully from expense!") }
        ServerActions.receiveDeletePayment(expenseId, id, errors);
      });
  }
}

export default PaymentService;
