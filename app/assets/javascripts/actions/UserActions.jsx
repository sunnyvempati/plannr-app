import AppDispatcher from '../dispatcher/AppDispatcher';
import {ActionTypes} from '../constants/AppConstants';
import UserService from '../services/UserService';

class UserActions {
  static get(userId) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.GET_USER_REQUEST,
      id: userId
    });
    UserService.get(userId);
  }
};

export default UserActions;
