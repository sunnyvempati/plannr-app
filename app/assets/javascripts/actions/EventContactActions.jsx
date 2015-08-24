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

  static create(eventId, contactId) {
    AppDispatcher.handleAction({
      type: ActionTypes.CREATE_EVENT_CONTACT_REQUEST,
      contactId: contactId,
      eventId: eventId
    });
    EventContactService.create(eventId, contactId);
  }

  static remove(ids) {
    AppDispatcher.handleAction({
      type: ActionTypes.DELETE_EVENT_CONTACTS_REQUEST,
      ids: ids
    })
    EventContactService.remove(ids);
  }
}
