import AppDispatcher from '../dispatcher/AppDispatcher';
import {ActionTypes} from '../constants/AppConstants';
import ContactService from '../services/ContactService';
import ContactStore from '../stores/ContactStore';

export default class ContactActions {
  static getContacts(params) {
    AppDispatcher.handleAction({
      type: ActionTypes.GET_CONTACTS_REQUEST,
      params: params
    });
    ContactService.getContacts(params);
  }

  static search(params) {
    AppDispatcher.handleAction({
      type: ActionTypes.SEARCH_CONTACTS_REQUEST,
      params: params
    })
    ContactService.search(params);
  }

  static create(params) {
    AppDispatcher.handleAction({
      type: ActionTypes.CREATE_CONTACT_REQUEST,
      params: params
    });
    ContactService.create(params);
  }

  static update(id, params) {
    AppDispatcher.handleAction({
      type: ActionTypes.UPDATE_CONTACT_REQUEST,
      id: id,
      params: params
    });
    ContactService.update(id, params);
  }

  static get(id) {
    AppDispatcher.handleAction({
      type: ActionTypes.GET_CONTACT_REQUEST,
      id: id
    });
    ContactService.get(id);
  }

  static deleteContacts(ids) {
    AppDispatcher.handleAction({
      type: ActionTypes.DELETE_CONTACTS_REQUEST,
      ids: ids
    })
    ContactService.delete(ids);
  }
}
