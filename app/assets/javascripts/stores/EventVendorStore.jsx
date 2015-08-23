import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import {ActionTypes} from '../constants/AppConstants.jsx';
import BaseStore from './BaseStore';
import VendorStore from './VendorStore';
import ViewStore from './ViewStore';
import CacheStore from './CacheStore';

class EventVendorStore extends BaseStore {
  constructor() {
    super();
    this._searchResults = [];
    this._eventVendors = [];
    this._cache = new CacheStore();
    // use for pagination/sort/filter
    this._view = new ViewStore;
  }

  get eventVendorsLoaded() { return this._view.itemsLoaded; }
  get viewEventVendors() {
    let viewEventVendorIds = this._view.viewItems;
    return viewEventVendorIds.map((id) => this._eventVendors[id]);
  }
  get searchResults() { return this._searchResults; }
  setSearchResults(results) { this._searchResults = results; }

  addEventVendors(eventVendors, params) {
    let isSearchQuery = !!params.search_query;
    if (!isSearchQuery) this._cache.createContext(params);
    let page = params.page;
    if (eventVendors.length > 0) {
      if (page) this._view.addPage(page);
      eventVendors.forEach((eventVendor) => {
        // add to global
        this._eventVendors[eventVendor.id] = eventVendor;
        // only add it if pagination
        if (page) this._view.addItemToPage(eventVendor.id, page);
        // then add to cache
        if (!isSearchQuery) this._cache.add(eventVendor.id, params);
      });
    } else this._view.itemsLoaded = true;
  }

  getFromCache(params) {
    let eventVendorIds = this._cache.getItems(params);
    return eventVendorIds.map((id) => {
      return this._eventVendors[id].event;
    });
  }

  add(eventVendor) {
    this._eventVendors[eventVendor.id] = eventVendor;
    this._cache.clear();
  }

  addCachedEventVendorsToView(params) {
    let eventVendorIds = this._cache.getItems(params);
    let page = params.page;
    if (eventVendorIds && eventVendorIds.length) {
      this._view.addItemsToPage(eventVendorIds, page);
    } else this._view.itemsLoaded = true;
  }

  isCached(params) {
    return !!this._cache.contextExists(params);
  }

  removeEventVendors(ids) {
    this._cache.clear();
    // remove from global contact map
    ids.map((id) => {
      this._eventVendors.splice(id, 1);
    });
    // remove from view
    this._view.remove(ids);
  }
}

let _eventVendorStoreInstance = new EventVendorStore();

_eventVendorStoreInstance.dispatchToken = AppDispatcher.register((payload) => {
  AppDispatcher.waitFor([
    VendorStore.dispatchToken
  ]);

  let action = payload.action;

  switch (action.type) {
    case ActionTypes.GET_EVENT_VENDORS_RESPONSE:
      if (action.eventVendors) {
        _eventVendorStoreInstance.addEventVendors(action.eventVendors, action.params);
      }
      _eventVendorStoreInstance.emitChange();
      break;
    default:
  }
});

export default _eventVendorStoreInstance;
