import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import {ActionTypes} from '../constants/AppConstants.jsx';
import BaseStore from './BaseStore';
import SessionStore from './SessionStore';
import UserStore from './UserStore';
import ViewStore from './ViewStore';
import CacheStore from './CacheStore';

class VendorStore extends BaseStore {
  constructor() {
    super();
    this._searchResults = [];
    this._vendors = [];
    this._cache = new CacheStore();
    // use for pagination/sort/filter
    this._view = new ViewStore;
  }

  get vendorsLoaded() { return this._view.itemsLoaded; }
  get viewVendors() {
    let viewVendorIds = this._view.viewItems;
    return viewVendorIds.map((id) => this._vendors[id]);
  }
  get searchResults() { return this._searchResults; }
  setSearchResults(results) { this._searchResults = results; }

  addVendors(vendors, params) {
    let isSearchQuery = !!params.search_query;
    if (!isSearchQuery) this._cache.createContext(params);
    let page = params.page;
    if (vendors.length > 0) {
      this._view.addPage(page);
      vendors.forEach((vendor) => {
        // add to global
        this._vendors[vendor.id] = vendor;
        this._view.addItemToPage(vendor.id, page);
        // then add to cache
        if (!isSearchQuery) this._cache.add(vendor.id, params);
      });
    } else this._view.itemsLoaded = true;
  }

  add(vendor) {
    this._vendors[vendor.id] = vendor;
    this._cache.clear();
  }

  addCachedVendorsToView(params) {
    let vendorIds = this._cache.getItems(params);
    let page = params.page;
    if (vendorIds && vendorIds.length) {
      this._view.addItemsToPage(vendorIds, page);
    } else this._view.itemsLoaded = true;
  }

  get(id) {
    return this._vendors[id];
  }

  isCached(params) {
    return !!this._cache.contextExists(params);
  }

  removeVendors(ids) {
    this._cache.clear();
    // remove from global vendor map
    ids.map((id) => {
      this._vendors.splice(id, 1);
    });
    // remove from view
    this._view.remove(ids);
  }
}

let _vendorStoreInstance = new VendorStore();

_vendorStoreInstance.dispatchToken = AppDispatcher.register((payload) => {
  AppDispatcher.waitFor([
    SessionStore.dispatchToken,
    UserStore.dispatchToken
  ]);

  let action = payload.action;

  switch(action.type) {
    case ActionTypes.GET_VENDORS_RESPONSE:
      if (action.vendors) {
        _vendorStoreInstance.addVendors(action.vendors, action.params);
      }
      _vendorStoreInstance.emitChange();
      break;
    case ActionTypes.GET_VENDOR_RESPONSE:
      let vendor = action.json && action.json.vendor;
      if (!action.errors) _vendorStoreInstance.add(vendor);
      _vendorStoreInstance.emitChange();
      break;
    case ActionTypes.UPDATE_VENDOR_SUCCESS_RESPONSE:
    case ActionTypes.CREATE_VENDOR_SUCCESS_RESPONSE:
      _vendorStoreInstance.add(action.entity);
      _vendorStoreInstance.emitChange();
      break;
    case ActionTypes.SEARCH_VENDORS_RESPONSE:
      if (!action.errors) {
        _vendorStoreInstance.setSearchResults(action.vendors);
        _vendorStoreInstance.emitChange();
      }
      break;
    case ActionTypes.DELETE_VENDORS_RESPONSE:
      if (!action.errors) {
        _vendorStoreInstance.removeVendors(action.ids);
        _vendorStoreInstance.emitChange();
      }
      break;
    default:
  }

  return true;
});

export default _vendorStoreInstance;
