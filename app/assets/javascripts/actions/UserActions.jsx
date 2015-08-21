import AppDispatcher from '../dispatcher/AppDispatcher';
import {ActionTypes} from '../constants/AppConstants';
import UserService from '../services/UserService';

class UserActions {
  static get(userId) {
    AppDispatcher.handleAction({
      type: ActionTypes.GET_USER_REQUEST,
      id: userId
    });
    UserService.get(userId);
  }

  static search(params) {
    AppDispatcher.handleAction({
      type: ActionTypes.SEARCH_USERS_REQUEST,
      params: params
    })
    UserService.search(params);
  }
};

export default UserActions;
