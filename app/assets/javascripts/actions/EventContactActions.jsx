import AppDispatcher from '../dispatcher/AppDispatcher';
import {ActionTypes} from '../constants/AppConstants';
import EventContactService from '../services/EventContactService';
import ContactStore from '../stores/ContactStore';

export default class EventContactActions {
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

  // static create(params) {
  //   AppDispatcher.handleAction({
  //     type: ActionTypes.CREATE_CONTACT_REQUEST,
  //     params: params
  //   });
  //   EventContactService.create(params);
  // }

  // static get(id) {
  //   AppDispatcher.handleAction({
  //     type: ActionTypes.GET_CONTACT_REQUEST,
  //     id: id
  //   });
  //   EventContactService.get(id);
  // }
}
