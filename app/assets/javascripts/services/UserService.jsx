import request from 'superagent';
import {Utils, AuthIntercept} from './Utils';
import ServerActions from '../actions/ServerActions';
import ToastActions from '../actions/ToastActions';
import {APIEndpoints} from '../constants/AppConstants';

class UserService {
  static get(id) {
    request
      .get(APIEndpoints.GET_USER + id)
      .use(AuthIntercept)
      .end((error, res) => {
        let json = error ? null : JSON.parse(res.text);
        ServerActions.receiveUser(json, error);
      });
  }

  static search(params) {
    request
      .get(APIEndpoints.GET_USERS)
      .query(params)
      .set('Accept', 'application/json')
      .end((error, res) => {
        if (res) {
          if (!error) {
            let json = JSON.parse(res.text);
            ServerActions.receiveUserSearch(json.users);
          } else {
            let errors = Utils.getErrors(res);
            ServerActions.receiveUserSearch(null, errors);
          }
        }
      });
  }

  static invite(email) {
    request
      .post(APIEndpoints.INVITE_USER)
      .send({invitation: {email: email}})
      .use(Utils.addAuthToken)
      .end((error, res) => {
        if (!error) {
          let json = JSON.parse(res.text);
          ToastActions.toast(json.invitation.email + " has been successfully invited to join your company!");
        } else ToastActions.errorToast('Something went wrong.  Try again or let us know if problem persists!');
        ServerActions.receiveInviteUser();
      });
  }

  static update(id, params) {
    request
      .put(APIEndpoints.UPDATE_USER + id)
      .send(params)
      .use(Utils.addAuthToken)
      .end((error, res) => {
        if (res) {
          if (!error) {
            let json = JSON.parse(res.text);
            ServerActions.receiveUpdateUser(json);
          } else {
            let errors = Utils.getErrors(res);
            ServerActions.receiveUpdateUser(null, errors);
          }
        }
      });
  }

  static delete(ids) {
    request
      .post(APIEndpoints.DELETE_USERS)
      .send({destroy_opts: {ids: ids}})
      .use(Utils.addAuthToken)
      .set('Accept', 'application/json')
      .end((error, res) => {
        let errors = null;
        if (res && error) errors = Utils.getErrors(res);
        if (!error) { ToastActions.toast(ids.length + " user(s) successfully deleted!") }
        ServerActions.receiveDeleteUsers(ids, errors);
      });
  }

  static getUsers(params) {
    request
      .get(APIEndpoints.GET_USERS)
      .query(params)
      .set('Accept', 'application/json')
      .end((error, res) => {
        if (res) {
          if (!error) {
            let json = JSON.parse(res.text);
            ServerActions.receiveGetUsers(json.users, params, null);
          } else {
            let errors = Utils.getErrors(res);
            ServerActions.receiveGetUsers(null, null, errors);
          }
        }
      });
  }
}

export default UserService;
