import request from 'superagent';
import {Utils} from './Utils';
import ServerActions from '../actions/ServerActions';
import ToastActions from '../actions/ToastActions';
import {APIEndpoints} from '../constants/AppConstants';
import extend from 'extend';

class CommentService {
  static getComments(params) {
    request
      .get(APIEndpoints.GET_COMMENTS)
      .query(params)
      .set('Accept', 'application/json')
      .end((error, res) => {
        if (res) {
          if (!error) {
            let json = JSON.parse(res.text);
            ServerActions.receiveComments(json.comments, params, null);
          } else {
            let errors = Utils.getErrors(res);
            ServerActions.receiveComments(null, null, errors);
          }
        }
      });
  }

  static update(id, params) {
    request
      .put(APIEndpoints.UPDATE_COMMENT + id)
      .send(params)
      .use(Utils.addAuthToken)
      .end((error, res) => {
        if (res) {
          if (!error) {
            let json = JSON.parse(res.text);
            ServerActions.receiveUpdateComment(json);
          } else {
            let errors = Utils.getErrors(res);
            ServerActions.receiveUpdateComment(null, errors);
          }
        }
      });
  }

  static delete(id, params) {
    request
      .del(APIEndpoints.DELETE_COMMENT + id)
      .use(Utils.addAuthToken)
      .set('Accept', 'application/json')
      .end((error, res) => {
        let errors = null;
        if (res && error) errors = Utils.getErrors(res);
        if (!error) { ToastActions.toast("Comment successfully deleted!") }
        ServerActions.receiveDeleteComment(id, params, errors);
      });
  }

  static create(comment, params) {
    request
      .post(APIEndpoints.CREATE_COMMENT)
      .send(extend({}, params, {comment: comment}))
      .use(Utils.addAuthToken)
      .end((error, res) => {
        if (res) {
          if (!error) {
            let json = JSON.parse(res.text);
            ServerActions.receiveCreateComment(json, params, null);
          } else {
            let errors = Utils.getErrors(res);
            ServerActions.receiveCreateComment(null, null, errors);
          }
        }
      });
  }
}

export default CommentService;
