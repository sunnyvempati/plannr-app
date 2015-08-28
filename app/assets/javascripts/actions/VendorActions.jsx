import AppDispatcher from '../dispatcher/AppDispatcher';
import {ActionTypes} from '../constants/AppConstants';
import VendorService from '../services/VendorService';
import VendorStore from '../stores/VendorStore';

export default class VendorActions {
  static getVendors(params) {
    AppDispatcher.handleAction({
      type: ActionTypes.GET_VENDORS_REQUEST,
      params: params
    });
    VendorService.getVendors(params);
  }

  static search(params) {
    AppDispatcher.handleAction({
      type: ActionTypes.SEARCH_VENDORS_REQUEST,
      params: params
    })
    VendorService.search(params);
  }

  static create(params) {
    AppDispatcher.handleAction({
      type: ActionTypes.CREATE_VENDOR_REQUEST,
      params: params
    });
    VendorService.create(params);
  }

  static update(id, params) {
    AppDispatcher.handleAction({
      type: ActionTypes.UPDATE_VENDOR_REQUEST,
      id: id,
      params: params
    });
    VendorService.update(id, params);
  }

  static get(id) {
    AppDispatcher.handleAction({
      type: ActionTypes.GET_VENDOR_REQUEST,
      id: id
    });
    VendorService.get(id);
  }

  static deleteVendors(ids) {
    AppDispatcher.handleAction({
      type: ActionTypes.DELETE_VENDORS_REQUEST,
      ids: ids
    })
    VendorService.delete(ids);
  }
}
