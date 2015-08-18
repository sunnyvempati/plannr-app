import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import {ActionTypes} from '../constants/AppConstants.jsx';
import BaseStore from './BaseStore';
import SessionStore from './SessionStore';
import UserStore from './UserStore';

class ContactStore extends BaseStore {
  constructor() {
    super();
    this._searchResults = [];
    this._contacts = [];
  }

  get searchResults() { return this._searchResults; }
  setSearchResults(results) { this._searchResults = results; }

  addContact(contact) {
    this._contacts[contact.id] = contact;
  }

  getContact(id) {
    return this._contacts[id];
  }
}

let _contactStoreInstance = new ContactStore();

_contactStoreInstance.dispatchToken = AppDispatcher.register((payload) => {
  AppDispatcher.waitFor([
    SessionStore.dispatchToken,
    UserStore.dispatchToken
  ]);

  let action = payload.action;

  switch(action.type) {
    // case ActionTypes.GET_EVENTS_RESPONSE:
    //   if (action.events) {
    //     _eventStoreInstance.addEvents(action.events, action.params);
    //   }
    //   _eventStoreInstance.emitChange();
    //   break;
    // case ActionTypes.GET_CACHED_EVENTS_RESPONSE:
    //   _eventStoreInstance._currentParams = action.params;
    //   _eventStoreInstance.emitChange();
    //   break;
    case ActionTypes.GET_EVENT_CLIENT_RESPONSE:
    case ActionTypes.CREATE_EVENT_CLIENT_RESPONSE:
      let contact = action.json && action.json.contact;
      if (contact) {
        _contactStoreInstance.addContact(contact);
      }
      _contactStoreInstance.emitChange();
      break;
    case ActionTypes.SEARCH_CONTACTS_RESPONSE:
      if (!action.errors) {
        _contactStoreInstance.setSearchResults(action.contacts);
        _contactStoreInstance.emitChange();
      }
      break;
    default:
  }

  return true;
});

export default _contactStoreInstance;
