import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import {ActionTypes} from '../constants/AppConstants.jsx';
import BaseStore from './BaseStore';
import ContactStore from './ContactStore';

class EventContactStore extends BaseStore {
  constructor() {
    super();
    this._eventContacts = [];
    this._eventClient = {};
  }

  get eventClient() { return this._eventClient; }

  setEventClient(client) {
    this._eventClient = {contact_id: client.id};
  }
}

let _eventContactStore = new EventContactStore();

_eventContactStore.dispatchToken = AppDispatcher.register((payload) => {
  AppDispatcher.waitFor([
    ContactStore.dispatchToken
  ]);

  let action = payload.action;

  switch (action.type) {
    // This is used when a template event is chosen,
    // and we go grab the event client for the template event.
    case ActionTypes.GET_EVENT_CLIENT_RESPONSE:
    // This is used when a new event client is created
    // from event form
    case ActionTypes.CREATE_EVENT_CLIENT_RESPONSE:
      let contact = action.json && action.json.contact;
      if (contact) {
        _eventContactStore.setEventClient(contact);
      }
      _eventContactStore.emitChange();
      break;
    default:
  }
});

export default _eventContactStore;
