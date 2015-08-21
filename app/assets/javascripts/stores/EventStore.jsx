import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import {ActionTypes} from '../constants/AppConstants.jsx';
import BaseStore from './BaseStore';
import ViewStore from './ViewStore';
import CacheStore from './CacheStore';
import SessionStore from './SessionStore';
import UserStore from './UserStore';
import extend from 'extend';


class EventStore extends BaseStore {
  constructor() {
    super();
    this._cache = new CacheStore();
    this._events = [];
    this._searchResults = [];
    // used for pagination/sort/filter
    this._view = new ViewStore();
  }

  get searchResults() { return this._searchResults; }
  get eventsLoaded() { return this._view.itemsLoaded; }
  setSearchResults(results) { this._searchResults = results; }

  get viewEvents() {
    // this flattens array and sorts keys by page so
    // page 1 is displayed in order
    let viewEventIds = this._view.viewItems;
    return viewEventIds.map((id) => this._events[id]);
  }

  addEvents(events, params) {
    let isSearchQuery = !!params.search_query;
    let page = params.page;
    if (!isSearchQuery) this._cache.createContext(params);
    if (events.length > 0) {
      this._view.addPage(page);
      events.forEach((event) => {
        // add to global
        this._events[event.id] = event;
        this._view.addItemToPage(event.id, page);
        // then add to cache
        if (!isSearchQuery) this._cache.add(event.id, params);
      });
    } else this._view.itemsLoaded = true;
  }

  addCachedEvents(params) {
    let eventIds = this._cache.getItems(params);
    let page = params.page;
    if (eventIds && eventIds.length) {
      this._view.addItemsToPage(eventIds, page);
    } else this._view.itemsLoaded = true;
  }

  addEvent(event) {
    // clear cache since we have a new event
    this._cache.clear();
    this._events[event.id] = event;
  }

  getEvent(id) {
    return this._events[id];
  }

  resetView() { this._view.reset(); }

  isCached(params) {
    return !!this._cache.contextExists(params);
  }

  removeEvents(ids) {
    this._cache.clear();
    // remove from global event map
    ids.map((id) => {
      this._events.splice(id, 1);
    });

    this._view.remove(ids);
  }
}

let _eventStoreInstance = new EventStore();

_eventStoreInstance.dispatchToken = AppDispatcher.register((payload) => {
  AppDispatcher.waitFor([
    SessionStore.dispatchToken,
    UserStore.dispatchToken
  ]);
  let action = payload.action;

  switch(action.type) {
    case ActionTypes.GET_EVENTS_RESPONSE:
      if (action.events) {
        _eventStoreInstance.addEvents(action.events, action.params);
      }
      _eventStoreInstance.emitChange();
      break;
    case ActionTypes.GET_CACHED_EVENTS_RESPONSE:
      _eventStoreInstance.addCachedEvents(action.params);
      _eventStoreInstance.emitChange();
      break;
    case ActionTypes.SEARCH_EVENTS_RESPONSE:
      if (!action.errors) {
        _eventStoreInstance.setSearchResults(action.events);
        _eventStoreInstance.emitChange();
      }
      break;
    case ActionTypes.UPDATE_EVENT_RESPONSE:
    case ActionTypes.CREATE_EVENT_RESPONSE:
      let event = action.json && action.json.event;
      if (event) _eventStoreInstance.addEvent(event);
      _eventStoreInstance.emitChange();
      break;
    case ActionTypes.DELETE_EVENT_RESPONSE:
      if (!action.errors) {
        _eventStoreInstance.removeEvents(action.ids);
        _eventStoreInstance.emitChange();
      }
      break;
    default:
  }

  return true;
});

export default _eventStoreInstance;
