import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import AppConstants from '../constants/AppConstants.jsx';
import ActionTypes = AppConstants.ActionTypes;

class ServerActions {
  receiveLogin(json, errors) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.LOGIN_RESPONSE,
      json: json,
      errors: errors
    });
  }
};

export default ServerActions;
