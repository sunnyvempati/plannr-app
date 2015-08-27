import request from 'superagent';
import {Utils} from './Utils';
import ServerActions from '../actions/ServerActions';
import ToastActions from '../actions/ToastActions';
import {APIEndpoints} from '../constants/AppConstants';

class SessionService {
  static login(email, password) {
    request
      .post(APIEndpoints.LOGIN)
      .send({user_session: {email: email, password: password}})
      .use(Utils.addAuthToken)
      .end((error, res) => {
        if (res) {
          if (res.error) {
            var errorMsgs = Utils.getErrors(res);
            ServerActions.receiveLogin(null, errorMsgs);
          } else {
            let json = JSON.parse(res.text);
            ServerActions.receiveLogin(json, null);
          }
        }
      });
  }

  static signup(data) {
    request
      .post(APIEndpoints.REGISTER)
      .send(data)
      .use(Utils.addAuthToken)
      .end((error, res) => {
        if (res) {
          if (res.error) {
            var errorMsgs = Utils.getErrors(res);
            ServerActions.receiveSignup(null, errorMsgs);
          } else {
            let json = JSON.parse(res.text);
            ServerActions.receiveSignup(json, null);
          }
        }
      });
  }

  static resendVerify(email) {
    request
      .post(APIEndpoints.RESEND_VERIFY)
      .send({email: email})
      .use(Utils.addAuthToken)
      .end((error, res) => {
        if (res) {
          if (res.error) {
            let error = res.status == 404 ? {email: 'not found'} : Utils.getErrors(res);
            ServerActions.receiveResendVerify(null, error);
          } else {
            let json = JSON.parse(res.text);
            ServerActions.receiveResendVerify(json, null);
          }
        }
      });
  }

  static verify(token) {
    request
      .post(APIEndpoints.VERIFY)
      .send({id: token})
      .use(Utils.addAuthToken)
      .end((error, res) => {
        if (res) {
          let errors = null;
          if (res.error) {
            ServerActions.receiveVerify("User not found.  Try requesting a new confirmation email.");
          } else {
            ServerActions.receiveVerify(null);
            ToastActions.toast("You're verified!  Login to get started!");
          }
        }
      })
  }

  static resetPasswordRequest(email) {
    request
      .post(APIEndpoints.RESET_PASSWORD_REQUEST)
      .send({email: email})
      .use(Utils.addAuthToken)
      .end((error, res) => {
        if (res) {
          if (res.error) {
            var errorMsgs = Utils.getErrors(res);
            ServerActions.receiveResetRequest(null, errorMsgs);
          } else {
            let json = JSON.parse(res.text);
            ServerActions.receiveResetRequest(json, null);
          }
        }
      })
  }

  static resetPassword(data) {
    request
      .post(APIEndpoints.RESET_PASSWORD)
      .send(data)
      .use(Utils.addAuthToken)
      .end((error, res) => {
        if (res) {
          if (res.error) {
            var errorMsgs = Utils.getErrors(res);
            ServerActions.receiveResetPassword(null, errorMsgs);
          } else {
            let json = JSON.parse(res.text);
            ServerActions.receiveResetPassword(json, null);
          }
        }
      })
  }

  static logout() {
    request
      .del(APIEndpoints.LOGOUT)
      .use(Utils.addAuthToken)
      .end((error, res) => {
        if (res) {
          let errors = res.error ? Utils.getErrors(res) : null;
          ServerActions.receiveLogout(errors);
        }
      });
  }

  static updateProfile(first_name, last_name) {
    request
      .post(APIEndpoints.PROFILE)
      .send({profile: {first_name: first_name, last_name: last_name}})
      .use(Utils.addAuthToken)
      .end((error, res) => {
        if (res) {
          if (res.error) {
            ServerActions.receiveProfile(null, Utils.getErrors(res));
          } else {
            let json = JSON.parse(res.text);
            ServerActions.receiveProfile(json, null);
          }
        }
      });
  }
}

export default SessionService;
