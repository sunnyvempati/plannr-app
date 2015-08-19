import AppDispatcher from '../dispatcher/AppDispatcher';
import {ActionTypes} from '../constants/AppConstants';
import EventService from '../services/EventService';
import EventStore from '../stores/EventStore';

class EventActions {
  static getEvents(params) {
    if (EventStore.isCached(params)) {
      AppDispatcher.handleServerAction({
        type: ActionTypes.GET_CACHED_EVENTS_RESPONSE,
        params: params
      })
    } else {
      EventService.getEvents(params);
    }
  }

  static update(id, params) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.GET_EVENT_CLIENT_REQUEST,
      id: id,
      params: params
    });
    EventService.update(id, params);
  }

  static deleteEvents(ids) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.DELETE_EVENT_REQUEST,
      ids: ids
    })
    EventService.delete(ids);
  }

  static search(params) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.SEARCH_EVENTS_REQUEST,
      params: params
    })
    EventService.search(params);
  }

  static create(params) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.CREATE_EVENT_REQUEST,
      params: params
    })
    EventService.create(params);
  }
}

export default EventActions;
