import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import {ActionTypes} from '../constants/AppConstants.jsx';
import BaseStore from './BaseStore';
import SessionStore from './SessionStore';
import UserStore from './UserStore';

class ContactStore extends BaseStore {
  constructor() {
    super();
    this._searchResults = [];
  }

  get searchResults() { return this._searchResults; }
  setSearchResults(results) { this._searchResults = results; }
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
    case ActionTypes.SEARCH_CONTACTS_RESPONSE:
      if (!action.errors) {
        _eventStoreInstance.setSearchResults(action.events);
        _eventStoreInstance.emitChange();
      }
      break;
    default:
  }

  return true;
});

export default _contactStoreInstance;
