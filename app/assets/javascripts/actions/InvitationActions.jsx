import AppDispatcher from '../dispatcher/AppDispatcher';
import {ActionTypes} from '../constants/AppConstants';
import InvitationService from '../services/InvitationService';

export default class InvitationActions {
  static get(token) {
    AppDispatcher.handleAction({
      type: ActionTypes.GET_INVITATION_REQUEST,
      token: token
    });
    InvitationService.get(token);
  }

  static create(email) {
    AppDispatcher.handleAction({
      type: ActionTypes.CREATE_INVITATION_REQUEST,
      email: email
    });
    InvitationService.create(email);
  }
}
