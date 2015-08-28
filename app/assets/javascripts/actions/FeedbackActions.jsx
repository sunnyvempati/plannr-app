import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import {ActionTypes} from '../constants/AppConstants.jsx';
import FeedbackService from '../services/FeedbackService';

class FeedbackActions {
  static create(params) {
    AppDispatcher.handleAction({
      type: ActionTypes.CREATE_FEEDBACK_REQUEST,
      params: params
    });
    FeedbackService.create(params);
  }
};

export default FeedbackActions;
