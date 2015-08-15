// this is used to cache filter sort pagination requests
class EventStoreCache {
  constructor() {
    this._contexts = {};
  }

  add(id, params) {
    this._contexts[JSON.stringify(params)].push(id);
  }

  createContext(params, keys=[]) {
    this._contexts[JSON.stringify(params)] = keys;
  }

  contextExists(params) {
    return !!this._contexts[JSON.stringify(params)]
  }

  getEvents(params) {
    return this._contexts[JSON.stringify(params)];
  }

  clearWithParams(params) {
    // to do
    this._contexts = {}
  }

  clear() {
    this._contexts = {};
  }

  _stringParams(params) {
    return JSON.stringify(params);
  }
}

export default EventStoreCache;
