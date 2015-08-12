import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import {ActionTypes} from '../constants/AppConstants.jsx';

class ToastActions {
  static toast(message) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.TOAST_MESSAGE,
      message: message
    });
  }

  static toastError(message) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.TOAST_ERROR,
      message: message
    });
  }

  static loading() {
    AppDispatcher.handleServerAction({
      type: ActionTypes.TOAST_LOADING
    });
  }

  static close() {
    AppDispatcher.handleServerAction({
      type: ActionTypes.CLOSE_TOAST
    })
  }
};

export default ToastActions;
