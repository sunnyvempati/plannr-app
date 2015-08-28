import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import {ActionTypes} from '../constants/AppConstants.jsx';
import BaseStore from './BaseStore';
import ContactStore from './ContactStore';
import ViewStore from './ViewStore';
import CacheStore from './CacheStore';

class EventContactStore extends BaseStore {
  constructor() {
    super();
    this._searchResults = [];
    this._eventContacts = [];
    this._cache = new CacheStore();
    // use for pagination/sort/filter
    this._view = new ViewStore;
  }

  get eventContactsLoaded() { return this._view.itemsLoaded; }
  get viewEventContacts() {
    let viewEventContactIds = this._view.viewItems;
    return viewEventContactIds.map((id) => {
      let contact = this._eventContacts[id].contact;
      return {
        id: id,
        name: contact.name,
        phone: contact.phone,
        email: contact.email,
        company: contact.company,
        type: contact.type
      }
    });
  }
  get searchResults() { return this._searchResults; }
  setSearchResults(results) { this._searchResults = results; }

  getContact(id) {
    return this._eventContacts[id].contact;
  }

  addEventContacts(eventContacts, params) {
    let isSearchQuery = !!params.search_query;
    if (!isSearchQuery) this._cache.createContext(params);
    let page = params.page;
    if (eventContacts.length > 0) {
      if (page) this._view.addPage(page);
      eventContacts.forEach((eventContact) => {
        // add to global
        this._eventContacts[eventContact.id] = eventContact;
        // only add it if pagination
        if (page) this._view.addItemToPage(eventContact.id, page);
        // then add to cache
        if (!isSearchQuery) this._cache.add(eventContact.id, params);
      });
    } else this._view.itemsLoaded = true;
  }

  getFromCache(params) {
    let eventContactIds = this._cache.getItems(params);
    return eventContactIds.map((id) => {
      return this._eventContacts[id].event;
    });
  }

  add(eventContact) {
    this._eventContacts[eventContact.id] = eventContact;
    this._cache.clear();
  }

  addCachedEventContactsToView(params) {
    let eventContactIds = this._cache.getItems(params);
    let page = params.page;
    if (eventContactIds && eventContactIds.length) {
      this._view.addItemsToPage(eventContactIds, page);
    } else this._view.itemsLoaded = true;
  }

  isCached(params) {
    return !!this._cache.contextExists(params);
  }

  removeEventContacts(ids) {
    this._cache.clear();
    // remove from global contact map
    ids.map((id) => {
      delete this._eventContacts[id];
    });
    // remove from view
    this._view.remove(ids);
  }
}

let _eventContactStoreInstance = new EventContactStore();

_eventContactStoreInstance.dispatchToken = AppDispatcher.register((payload) => {
  AppDispatcher.waitFor([
    ContactStore.dispatchToken
  ]);

  let action = payload.action;

  switch (action.type) {
    case ActionTypes.GET_EVENT_CONTACTS_RESPONSE:
      if (action.eventContacts) {
        _eventContactStoreInstance.addEventContacts(action.eventContacts, action.params);
      }
      _eventContactStoreInstance.emitChange();
      break;
    case ActionTypes.CREATE_EVENT_CONTACT_RESPONSE:
      let eventContact = action.json && action.json.event_contact;
      if (eventContact) {
        _eventContactStoreInstance.add(eventContact);
        _eventContactStoreInstance.emitChange();
      }
      break;
    case ActionTypes.DELETE_EVENT_CONTACTS_RESPONSE:
      if (!action.errors) {
        _eventContactStoreInstance.removeEventContacts(action.ids);
        _eventContactStoreInstance.emitChange();
      }
    default:
  }
});

export default _eventContactStoreInstance;
