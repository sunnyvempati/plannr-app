import AppDispatcher from '../dispatcher/AppDispatcher';
import {ActionTypes} from '../constants/AppConstants';
import EventVendorService from '../services/EventVendorService';
import VendorStore from '../stores/VendorStore';

export default class EventVendorActions {
  static getEventVendors(params) {
    AppDispatcher.handleAction({
      type: ActionTypes.GET_EVENT_VENDORS_REQUEST,
      params: params
    });
    EventVendorService.getVendors(params);
  }

  static create(eventId, vendorId) {
    AppDispatcher.handleAction({
      type: ActionTypes.CREATE_EVENT_VENDOR_REQUEST,
      vendorId: vendorId,
      eventId: eventId
    });
    EventVendorService.create(eventId, vendorId);
  }

  static remove(ids) {
    AppDispatcher.handleAction({
      type: ActionTypes.DELETE_EVENT_VENDORS_REQUEST,
      ids: ids
    })
    EventVendorService.remove(ids);
  }

  static search(params) {
    AppDispatcher.handleAction({
      type: ActionTypes.SEARCH_EVENT_VENDORS_REQUEST,
      params: params
    })
    EventVendorService.search(params);
  }

  static get(id) {
    AppDispatcher.handleAction({
      type: ActionTypes.GET_EVENT_VENDOR_REQUEST,
      id: id
    });
    EventVendorService.get(id);
  }
}
