import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import {ActionTypes} from '../constants/AppConstants.jsx';
import BaseStore from './BaseStore';
import EventStoreCache from './EventStoreCache';
import SessionStore from './SessionStore';
import UserStore from './UserStore';

class EventStore extends BaseStore {
  constructor() {
    super();
    this._cache = new EventStoreCache();
    this._events = [];
    this._currentParams = {};
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

  getEvents() {
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
      _eventStoreInstance._currentParams = action.params;
      _eventStoreInstance.emitChange();
    default:
  }

  return true;
});

export default _eventStoreInstance;
