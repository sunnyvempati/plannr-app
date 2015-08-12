import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import {ActionTypes} from '../constants/AppConstants.jsx';
import SessionService from '../services/SessionService.jsx';


class SessionActions {
  static signup(data) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.SIGNUP_REQUEST,
      data: data
    });
    SessionService.signup(data);
  }

  static login(email, password) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.LOGIN_REQUEST,
      email: email,
      password: password
    });
    SessionService.login(email, password);
  }

  static verify(token) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.VERIFY_REQUEST,
      token: token
    });
    SessionService.verify(token);
  }

  static resetPasswordRequest(email) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.RESET_PASSWORD_REQUEST,
      email: email
    });
    SessionService.resetPasswordRequest(email);
  }

  static resetPassword(data) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.RESET_PASSWORD
    });
    SessionService.resetPassword(data);
  }

  static logout() {
    AppDispatcher.handleViewAction({
      type: ActionTypes.LOGOUT_REQUEST
    });
    SessionService.logout();
  }

  static setProfile(first, last) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.PROFILE_REQUEST,
      name: name
    });
    SessionService.updateProfile(first, last);
  }
}

export default SessionActions;
