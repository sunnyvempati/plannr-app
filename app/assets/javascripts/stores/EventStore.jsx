import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import {ActionTypes} from '../constants/AppConstants.jsx';
import BaseStore from './BaseStore';
import CacheStore from './CacheStore';
import SessionStore from './SessionStore';
import UserStore from './UserStore';

class EventStore extends BaseStore {
  constructor() {
    super();
    this._cache = new CacheStore();
    this._events = [];
    this._currentParams = {};
    this._searchResults = [];
  }

  get searchResults() {
    return this._searchResults;
  }

  setSearchResults(results) {
    this._searchResults = results;
  }

  addEvents(events, params) {
    this._cache.createContext(params);
    if (events.length > 0) {
      events.forEach((event) => {
        // add to global
        this._events[event.id] = event;
        // then add to cache
        this._cache.add(event.id, params);
      });
    }
    this._currentParams = params;
  }

  addEvent(event) {
    // clear cache since we have a new event
    this._cache.clear();
    this._events[event.id] = event;
  }

  getEvents() {
    console.log("GET EVENTS", this._currentParams, this._cache);
    let eventIds = this._cache.getEvents(this._currentParams);
    if (eventIds) {
      return eventIds.map((id) => {
        return this._events[id];
      });
    } else return [];
  }

  isCached(params) {
    return !!this._cache.contextExists(params);
  }

  removeEvents(ids) {
    this._cache._spliceAndClear(ids);
    ids.map((id) => {
      this._events.splice(id, 1);
    });
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
      console.log("STORE", action.params);
      _eventStoreInstance._currentParams = action.params;
      _eventStoreInstance.emitChange();
      break;
    case ActionTypes.SEARCH_EVENTS_RESPONSE:
      if (!action.errors) {
        _eventStoreInstance.setSearchResults(action.events);
        _eventStoreInstance.emitChange();
      }
      break;
    case ActionTypes.CREATE_EVENT_RESPONSE:
      let event = action.json && action.json.event;
      if (event) _eventStoreInstance.addEvent(event);
      _eventStoreInstance.emitChange();
      break;
    case ActionTypes.DELETE_EVENT_RESPONSE:
      if (!action.errors) {
        _eventStoreInstance.removeEvents(action.ids);
      }
      break;
    default:
  }

  return true;
});

export default _eventStoreInstance;
