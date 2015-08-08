import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import AppConstants from '../constants/AppConstants.jsx';

var ActionTypes = AppConstants.ActionTypes;

class SessionActions {
  signup(email, password, passwordConfirmation) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.SIGNUP_REQUEST,
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation
    });
    WebAPIUtils.signup(email, password, passwordConfirmation);
  }

  login(email, password) {
    SmallAppDispatcher.handleViewAction({
      type: ActionTypes.LOGIN_REQUEST,
      email: email,
      password: password
    });
    WebAPIUtils.login(email, password);
  }

  logout() {
    SmallAppDispatcher.handleViewAction({
      type: ActionTypes.LOGOUT
    });
  }
}

export default SessionActions;

