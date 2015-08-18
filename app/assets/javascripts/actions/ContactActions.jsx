import AppDispatcher from '../dispatcher/AppDispatcher';
import {ActionTypes} from '../constants/AppConstants';
import ContactService from '../services/ContactService';
import ContactStore from '../stores/ContactStore';

export default class ContactActions {
  static search(params) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.SEARCH_CONTACTS_REQUEST,
      params: params
    })
    ContactService.search(params);
  }

  static create(params) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.CREATE_EVENT_CLIENT_REQUEST,
      params: params
    });
    ContactService.create(params);
  }

  static getEventClient(id) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.GET_EVENT_CLIENT_REQUEST,
      id: id
    });
    ContactService.getEventClient(id);
  }
}
