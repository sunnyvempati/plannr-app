import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import {ActionTypes} from '../constants/AppConstants.jsx';
import BaseStore from './BaseStore';

class PageTitleStore extends BaseStore {
  constructor() {
    super();
    this._skrollable = false;
    this._header = "";
  }

  get skrollable() { return this._skrollable; }
  set skrollable(val) { this._skrollable = val }
  get header() { return this._header; }
  set header(val) { this._header = val }
}

let _pageTitleStoreInstance = new PageTitleStore();

_pageTitleStoreInstance.dispatchToken = AppDispatcher.register((payload) => {
  let action = payload.action;
  switch (action.type) {
    case ActionTypes.SET_PAGE_TITLE:
      _pageTitleStoreInstance.skrollable = action.skrollable;
      _pageTitleStoreInstance.header = action.header;
      _pageTitleStoreInstance.emitChange();
      break;
    default:
  }

  return true;
})

export default _pageTitleStoreInstance;
