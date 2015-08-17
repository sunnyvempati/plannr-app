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
    EventService.search(params);
  }
}
