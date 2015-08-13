import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import {ActionTypes} from '../constants/AppConstants.jsx';

class ServerActions {
  static receiveLogin(json, errors) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.LOGIN_RESPONSE,
      json: json,
      errors: errors
    });
  }

  static receiveSignup(json, errors) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.SIGNUP_RESPONSE,
      json: json,
      errors: errors
    });
  }

  static receiveVerify(errors) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.VERIFY_RESPONSE,
      errors: errors
    });
  }

  static receiveResetRequest(json, errors) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RESET_PASSWORD_REQUEST_RESPONSE,
      json: json,
      errors: errors
    });
  }

  static receiveResetPassword(json, errors) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RESET_PASSWORD_RESPONSE,
      json: json,
      errors: errors
    });
  }

  static receiveLogout(errors) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.LOGOUT_RESPONSE,
      errors: errors
    })
  }

  static receiveProfile(json, errors) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.PROFILE_RESPONSE,
      json: json,
      errors: errors
    })
  }

  static receiveUser(json, errors) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.GET_USER_RESPONSE,
      json: json,
      errors: errors
    })
  }
};

export default ServerActions;
