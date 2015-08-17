import AppDispatcher from '../dispatcher/AppDispatcher';
import {ActionTypes} from '../constants/AppConstants';
import EventService from '../services/EventService';
import EventStore from '../stores/EventStore';

class EventActions {
  static getEvents(params) {
    console.log("GET EVENTS", params);
    if (EventStore.isCached(params)) {
      AppDispatcher.handleServerAction({
        type: ActionTypes.GET_CACHED_EVENTS_RESPONSE,
        params: params
      })
    } else {
      EventService.getEvents(params);
    }
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
}

export default EventActions;
