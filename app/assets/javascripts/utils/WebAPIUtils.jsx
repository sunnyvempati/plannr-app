import ServerActions from '../actions/ServerActions.jsx';
import AppConstants from '../constants/AppConstants.jsx';
import GlobalStore from '../stores/GlobalStore.jsx';
import request from 'superagent';

const endpoints = AppConstants.APIEndpoints;

function _getErrors(res) {
  var errorMsgs = ["Something went wrong, please try again"];
  if ((json = JSON.parse(res.text))) {
    if (json['errors']) {
      errorMsgs = json['errors'];
    } else if (json['error']) {
      errorMsgs = [json['error']];
    }
  }
  return errorMsgs;
}

class Utils {
  static login(email, password) {
    request
      .post(endpoints.LOGIN)
      .send({user_session: {email: email, password: password}, authenticity_token: GlobalStore.AuthToken})
      .end((error, res) => {
        if (res) {
          if (res.error) {
            var errorMsgs = _getErrors(res);
            ServerActions.receiveLogin(null, errorMsgs);
          } else {
            let json = JSON.parse(res.text);
            ServerActions.receiveLogin(json, null);
          }
        }
      });
  }
}

export default Utils;
