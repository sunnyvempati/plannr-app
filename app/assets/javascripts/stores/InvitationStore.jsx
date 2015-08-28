import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import {ActionTypes} from '../constants/AppConstants.jsx';
import BaseStore from './BaseStore';
import CacheStore from './CacheStore';
import SessionStore from './SessionStore';

class InvitationStore extends BaseStore {
  constructor() {
    super();
    this._invitations = [];
    this._error = null;
  }

  set error(val) { this._error = val; }
  get error() { return this._error; }

  add(invitation) {
    this._invitations[invitation.token] = invitation;
  }

  get(token) {
    return this._invitations[token];
  }

  clear() {
    this._invitations = [];
    this._error = null;
  }
}

let _invitationStoreInstance = new InvitationStore();

_invitationStoreInstance.dispatchToken = AppDispatcher.register((payload) => {
  AppDispatcher.waitFor([
    SessionStore.dispatchToken
  ]);
  let action = payload.action;

  switch(action.type) {
    case ActionTypes.GET_INVITATION_RESPONSE:
      let invitation = action.json && action.json.invitation
      if (invitation) _invitationStoreInstance.add(invitation);
      else _invitationStoreInstance.error = action.error;
      _invitationStoreInstance.emitChange();
      break;
    case ActionTypes.LOGOUT_RESPONSE:
      if (!SessionStore.isLoggedIn()) _invitationStoreInstance.clear();
      break;
    default:
  }

  return true;
});

export default _invitationStoreInstance;
