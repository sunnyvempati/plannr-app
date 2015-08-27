import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import {ActionTypes} from '../constants/AppConstants.jsx';
import BaseStore from './BaseStore';
import ViewStore from './ViewStore';
import CacheStore from './CacheStore';

class EventAttachmentStore extends BaseStore {
  constructor() {
    super();
    this._eventAttachments = [];
    this._cache = new CacheStore();
    // use for pagination/sort/filter
    this._view = new ViewStore;
    this._loading = false;
  }

  get attachmentsLoading() { return this._loading; }
  set loading(val) { this._loading = val; }

  get eventAttachmentsLoaded() { return this._view.itemsLoaded; }
  get viewEventAttachments() {
    let viewEventAttachmentIds = this._view.viewItems;
    return viewEventAttachmentIds.map((id) => this._eventAttachments[id]);
  }

  addEventAttachments(eventAttachments, params) {
    this._loading = false;
    let isSearchQuery = !!params.search_query;
    if (!isSearchQuery) this._cache.createContext(params);
    let page = params.page;
    if (eventAttachments.length > 0) {
      if (page) this._view.addPage(page);
      eventAttachments.forEach((eventAttachment) => {
        // add to global
        this._eventAttachments[eventAttachment.id] = eventAttachment;
        // only add it if pagination
        if (page) this._view.addItemToPage(eventAttachment.id, page);
        // then add to cache
        if (!isSearchQuery) this._cache.add(eventAttachment.id, params);
      });
    } else {
      this._view.itemsLoaded = true;
    }
  }

  add(eventAttachment) {
    this._eventAttachments[eventAttachment.id] = eventAttachment;
    this._cache.clear();
  }

  addCachedEventAttachmentsToView(params) {
    let eventAttachmentIds = this._cache.getItems(params);
    let page = params.page;
    if (eventAttachmentIds && eventAttachmentIds.length) {
      this._view.addItemsToPage(eventAttachmentIds, page);
    } else this._view.itemsLoaded = true;
  }

  getFromCache(params) {
    let eventAttachmentIds = this._cache.getItems(params);
    return eventAttachmentIds.map((id) => {
      return this._eventAttachments[id];
    });
  }

  isCached(params) {
    return !!this._cache.contextExists(params);
  }

  removeEventAttachments(ids) {
    this._cache.clear();
    // remove from global attachments map
    ids.map((id) => {
      this._eventAttachments.splice(id, 1);
    });
    // remove from view
    this._view.remove(ids);
  }
}

let _eventAttachmentStoreInstance = new EventAttachmentStore();

_eventAttachmentStoreInstance.dispatchToken = AppDispatcher.register((payload) => {
  let action = payload.action;

  switch (action.type) {
    case ActionTypes.GET_ATTACHMENTS_REQUEST:
      _eventAttachmentStoreInstance.loading = true;
      break;
    case ActionTypes.GET_ATTACHMENTS_RESPONSE:
    _eventAttachmentStoreInstance.loading = false;
      let attachments = action.attachments;
      if (attachments) {
        _eventAttachmentStoreInstance.addEventAttachments(attachments, action.params);
      }
      _eventAttachmentStoreInstance.emitChange();
      break;
    case ActionTypes.CREATE_EVENT_ATTACHMENT_RESPONSE:
      let eventAttachment = action.json && action.json.attachment;
      if (eventAttachment) {
        _eventAttachmentStoreInstance.add(eventAttachment);
        _eventAttachmentStoreInstance.emitChange();
      }
      break;
    case ActionTypes.DELETE_ATTACHMENTS_RESPONSE:
      if (!action.errors) {
        _eventAttachmentStoreInstance.removeEventAttachments(action.ids);
        _eventAttachmentStoreInstance.emitChange();
      }
    default:
  }
});

export default _eventAttachmentStoreInstance;

