import request from 'superagent';
import {Utils, AuthIntercept} from './Utils';
import ServerActions from '../actions/ServerActions';
import ToastActions from '../actions/ToastActions';
import {APIEndpoints} from '../constants/AppConstants';

class InvitationService {
  static get(token) {
    request
      .get(APIEndpoints.GET_INVITE)
      .query({token: token})
      .end((error, res) => {
        let json = error ? null : JSON.parse(res.text);
        ServerActions.receiveInvitation(json, error);
      });
  }

  static create(email) {
    request
      .post(APIEndpoints.CREATE_INVITE)
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
}

export default InvitationService;
