// this is used to cache filter sort pagination requests
class ViewStore {
  constructor() {
    this._viewItems = {};
    this._allItemsLoaded = false;
  }

  get itemsLoaded() { return this._allItemsLoaded; }
  set itemsLoaded(val) { this._allItemsLoaded = val; }

  get viewItems() {
    // this flattens array and sorts keys by page so
    // page 1 is displayed in order
    let keys = Object.keys(this._viewItems);
    let allItemIds = keys.map((key) => this._viewItems[key]);
    return [].concat.apply([], allItemIds);
  }

  addPage(page) {
    // if it's the first page, then reset the whole thing
    if (page == 1) this.reset();
    this._viewItems[page] = [];
  }

  addItemsToPage(items, page) {
    // this occurs when retrieving items from cache
    if (page == 1) this.reset();
    this._viewItems[page] = items;
  }

  addItemToPage(item, page) {
    this._viewItems[page].push(item);
  }

  remove(ids) {
    // remove from view
    Object.keys(this._viewItems).forEach((key) => {
      if (this._viewItems[key].length) {
        this._viewItems[key] = this._viewItems[key].filter((id) => ids.indexOf(id) == -1);
      }
    });
  }

  reset() {
    this._viewItems = {};
    this._allItemsLoaded = false;
  }
}

export default ViewStore;
