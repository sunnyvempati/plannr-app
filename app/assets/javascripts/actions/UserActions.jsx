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

  static getUsers(params) {
    AppDispatcher.handleAction({
      type: ActionTypes.GET_USERS_REQUEST,
      params: params
    });
    UserService.getUsers(params);
  }

  static update(id, params) {
    AppDispatcher.handleAction({
      type: ActionTypes.UPDATE_USER_REQUEST,
      id: id,
      params: params
    });
    UserService.update(id, params);
  }

  static deleteUsers(ids) {
    AppDispatcher.handleAction({
      type: ActionTypes.DELETE_USERS_REQUEST,
      ids: ids
    })
    UserService.delete(ids);
  }
};

export default UserActions;
