import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import {ActionTypes} from '../constants/AppConstants.jsx';
import BaseStore from './BaseStore';
import CacheStore from './CacheStore';
import moment from 'moment';

class CommentStore extends BaseStore {
  constructor() {
    super();
    this._cache = new CacheStore();
    this._comments = [];
  }

  addComments(comments, params) {
    this._cache.createContext(params);
    if (comments.length > 0) {
      comments.forEach((comment) => {
        // add to global
        this._comments[comment.id] = comment;
        // then to cache
        this._cache.add(comment.id, params);
      });
    }
  }

  add(comment, params) {
    this._comments[comment.id] = comment;
    this._cache.add(comment.id, params);
  }

  update(comment) {
    this._comments[comment.id] = comment;
  }

  getFromCache(params) {
    // to do
    // get them in chronological order
    let commentIds = this._cache.getItems(params);
    let comments = commentIds.map((id) => {
      return this._comments[id];
    });

    return comments.sort(this._orderByCreatedAt);
  }

  _orderByCreatedAt(a, b) {
    return moment(b.created_at) - moment(a.created_at);
  }

  isCached(params) {
    return !!this._cache.contextExists(params);
  }

  remove(id, params) {
    // to do fix comments splice
    delete this._comments[id];
    this._cache.removeItem(id, params);
  }
}

let _commentStoreInstance = new CommentStore();

_commentStoreInstance.dispatchToken = AppDispatcher.register((payload) => {
  let action = payload.action;

  switch(action.type) {
    case ActionTypes.GET_COMMENTS_RESPONSE:
      if (action.comments) {
        _commentStoreInstance.addComments(action.comments, action.params);
      }
      _commentStoreInstance.emitChange();
      break;
    case ActionTypes.UPDATE_COMMENT_RESPONSE:
      let updatedComment = action.json && action.json.comment;
      if (updatedComment) _commentStoreInstance.update(updatedComment);
      _commentStoreInstance.emitChange();
      break;
    case ActionTypes.CREATE_COMMENT_RESPONSE:
      let comment = action.json && action.json.comment;
      if (comment) _commentStoreInstance.add(comment, action.params);
      _commentStoreInstance.emitChange();
      break;
    case ActionTypes.DELETE_COMMENT_RESPONSE:
      if (!action.errors) {
        _commentStoreInstance.remove(action.id, action.params);
        _commentStoreInstance.emitChange();
      }
      break;
    default:
  }

  return true;
});

export default _commentStoreInstance;
