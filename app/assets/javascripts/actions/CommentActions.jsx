import AppDispatcher from '../dispatcher/AppDispatcher';
import {ActionTypes} from '../constants/AppConstants';
import CommentService from '../services/CommentService';

class CommentActions {
  static getComments(params) {
    AppDispatcher.handleAction({
      type: ActionTypes.GET_COMMENTS_REQUEST,
      params: params
    });
    CommentService.getComments(params);
  }

  static update(id, params) {
    AppDispatcher.handleAction({
      type: ActionTypes.UPDATE_COMMENT_REQUEST,
      id: id,
      params: params
    });
    CommentService.update(id, params);
  }

  static delete(id, params) {
    AppDispatcher.handleAction({
      type: ActionTypes.DELETE_COMMENT_REQUEST,
      id: id,
      params: params
    })
    CommentService.delete(id, params);
  }

  static create(comment, params) {
    AppDispatcher.handleAction({
      type: ActionTypes.CREATE_COMMENT_REQUEST,
      comment: comment,
      params: params
    })
    CommentService.create(comment, params);
  }
}

export default CommentActions;
