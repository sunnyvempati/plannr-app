import AppDispatcher from '../dispatcher/AppDispatcher';
import {ActionTypes} from '../constants/AppConstants';
import AttachmentService from '../services/AttachmentService';

export default class AttachmentActions {
  static getEventContacts(params) {
    AppDispatcher.handleAction({
      type: ActionTypes.GET_EVENT_CONTACTS_REQUEST,
      params: params
    });
    EventContactService.getContacts(params);
  }

  // static search(params) {
  //   AppDispatcher.handleAction({
  //     type: ActionTypes.SEARCH_CONTACTS_REQUEST,
  //     params: params
  //   })
  //   EventContactService.search(params);
  // }

  static create(file) {
    AppDispatcher.handleAction({
      type: ActionTypes.CREATE_ATTACHMENT_REQUEST,
      file: file
    });
    AttachmentService.create(file);
  }

  // static get(id) {
  //   AppDispatcher.handleAction({
  //     type: ActionTypes.GET_CONTACT_REQUEST,
  //     id: id
  //   });
  //   EventContactService.get(id);
  // }
}
