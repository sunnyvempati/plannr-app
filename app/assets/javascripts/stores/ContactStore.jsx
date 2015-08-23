import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import {ActionTypes} from '../constants/AppConstants.jsx';
import BaseStore from './BaseStore';
import SessionStore from './SessionStore';
import UserStore from './UserStore';
import ViewStore from './ViewStore';
import CacheStore from './CacheStore';

class ContactStore extends BaseStore {
  constructor() {
    super();
    this._searchResults = [];
    this._contacts = [];
    this._cache = new CacheStore();
    // use for pagination/sort/filter
    this._view = new ViewStore;
  }

  get contactsLoaded() { return this._view.itemsLoaded; }
  get viewContacts() {
    let viewContactIds = this._view.viewItems;
    return viewContactIds.map((id) => this._contacts[id]);
  }
  get searchResults() { return this._searchResults; }
  setSearchResults(results) { this._searchResults = results; }

  addContacts(contacts, params) {
    let isSearchQuery = !!params.search_query;
    if (!isSearchQuery) this._cache.createContext(params);
    let page = params.page;
    if (contacts.length > 0) {
      this._view.addPage(page);
      contacts.forEach((contact) => {
        // add to global
        this._contacts[contact.id] = contact;
        this._view.addItemToPage(contact.id, page);
        // then add to cache
        if (!isSearchQuery) this._cache.add(contact.id, params);
      });
    } else this._view.itemsLoaded = true;
  }

  add(contact) {
    this._contacts[contact.id] = contact;
    this._cache.clear();
  }

  addCachedContactsToView(params) {
    let contactIds = this._cache.getItems(params);
    let page = params.page;
    if (contactIds && contactIds.length) {
      this._view.addItemsToPage(contactIds, page);
    } else this._view.itemsLoaded = true;
  }

  get(id) {
    return this._contacts[id];
  }

  isCached(params) {
    return !!this._cache.contextExists(params);
  }

  removeContacts(ids) {
    this._cache.clear();
    // remove from global contact map
    ids.map((id) => {
      this._contacts.splice(id, 1);
    });
    // remove from view
    this._view.remove(ids);
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
    case ActionTypes.GET_CONTACTS_RESPONSE:
      if (action.contacts) {
        _contactStoreInstance.addContacts(action.contacts, action.params);
      }
      _contactStoreInstance.emitChange();
      break;
    case ActionTypes.GET_CONTACT_RESPONSE:
      let contact = action.json && action.json.contact;
      if (!action.errors) _contactStoreInstance.add(contact);
      _contactStoreInstance.emitChange();
      break;
    case ActionTypes.UPDATE_CONTACT_SUCCESS_RESPONSE:
    case ActionTypes.CREATE_CONTACT_SUCCESS_RESPONSE:
      _contactStoreInstance.add(action.entity);
      _contactStoreInstance.emitChange();
      break;
    case ActionTypes.SEARCH_CONTACTS_RESPONSE:
      if (!action.errors) {
        _contactStoreInstance.setSearchResults(action.contacts);
        _contactStoreInstance.emitChange();
      }
      break;
    case ActionTypes.DELETE_CONTACTS_RESPONSE:
      if (!action.errors) {
        _contactStoreInstance.removeContacts(action.ids);
        _contactStoreInstance.emitChange();
      }
      break;
    default:
  }

  return true;
});

export default _contactStoreInstance;
