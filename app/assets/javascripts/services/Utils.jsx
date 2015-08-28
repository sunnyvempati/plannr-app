import GlobalStore from '../stores/GlobalStore.jsx';
import Intercept from 'superagent-intercept';
import Router from 'react-router';
import SessionActions from '../actions/SessionActions';
import ToastActions from '../actions/ToastActions';

export class Utils {
  static addAuthToken(request) {
    request.send({authenticity_token: GlobalStore.AuthToken});
  }

  static getErrors(res) {
    return JSON.parse(res.text);
  }
}

export let AuthIntercept = Intercept((err, res) => {
  switch (res.status) {
    case 401:
      SessionActions.errorAuthenticating();
      break;
    case 500:
      ToastActions.toastServerError();
      break;
    default:
  }
});
