import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import {ActionTypes} from '../constants/AppConstants.jsx';

class FormActions {
  static reset() {
    AppDispatcher.handleAction({
      type: ActionTypes.RESET
    });
  }
};

export default FormActions;
