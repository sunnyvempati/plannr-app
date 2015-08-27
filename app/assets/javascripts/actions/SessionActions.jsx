import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import {ActionTypes} from '../constants/AppConstants.jsx';
import SessionService from '../services/SessionService.jsx';


class SessionActions {
  static signup(data) {
    AppDispatcher.handleAction({
      type: ActionTypes.SIGNUP_REQUEST,
      data: data
    });
    SessionService.signup(data);
  }

  static login(email, password) {
    AppDispatcher.handleAction({
      type: ActionTypes.LOGIN_REQUEST,
      email: email,
      password: password
    });
    SessionService.login(email, password);
  }

  static verify(token) {
    AppDispatcher.handleAction({
      type: ActionTypes.VERIFY_REQUEST,
      token: token
    });
    SessionService.verify(token);
  }

  static resendVerify(email) {
    AppDispatcher.handleAction({
      type: ActionTypes.RESEND_VERIFY_REQUEST,
      email: email
    });
    SessionService.resendVerify(email);
  }

  static resetPasswordRequest(email) {
    AppDispatcher.handleAction({
      type: ActionTypes.RESET_PASSWORD_REQUEST,
      email: email
    });
    SessionService.resetPasswordRequest(email);
  }

  static resetPassword(data) {
    AppDispatcher.handleAction({
      type: ActionTypes.RESET_PASSWORD
    });
    SessionService.resetPassword(data);
  }

  static logout() {
    AppDispatcher.handleAction({
      type: ActionTypes.LOGOUT_REQUEST
    });
    SessionService.logout();
  }

  static setProfile(first, last) {
    AppDispatcher.handleAction({
      type: ActionTypes.PROFILE_REQUEST,
      name: name
    });
    SessionService.updateProfile(first, last);
  }

  static errorAuthenticating() {
    AppDispatcher.handleAction({
      type: ActionTypes.UNAUTHORIZED_REQUEST
    });
  }
}

export default SessionActions;
