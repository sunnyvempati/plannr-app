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

  // static search(params) {
  //   AppDispatcher.handleAction({
  //     type: ActionTypes.SEARCH_CONTACTS_REQUEST,
  //     params: params
  //   })
  //   EventVendorService.search(params);
  // }

  // static create(params) {
  //   AppDispatcher.handleAction({
  //     type: ActionTypes.CREATE_CONTACT_REQUEST,
  //     params: params
  //   });
  //   EventVendorService.create(params);
  // }

  // static get(id) {
  //   AppDispatcher.handleAction({
  //     type: ActionTypes.GET_CONTACT_REQUEST,
  //     id: id
  //   });
  //   EventVendorService.get(id);
  // }
}
