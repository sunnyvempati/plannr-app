// this is used to cache filter sort pagination requests
class CacheStore {
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

  getItems(params) {
    return this._contexts[JSON.stringify(params)];
  }

  removeItem(id, params) {
    let items = this._contexts[JSON.stringify(params)];
    items.forEach((item, i) => {
      if (item == id) items.splice(i, 1);
    });
    return items;
  }

  spliceAndClear(params) {
    let contextIds = this._contexts[JSON.stringify(params)];
    ids.map((id) => {
      contextIds.splice(id, 1);
    });
    this.clear();
  }

  clear() {
    this._contexts = {};
  }
}

export default CacheStore;
