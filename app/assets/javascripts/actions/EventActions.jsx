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

  static deleteEvents(ids) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.DELETE_EVENT_REQUEST,
      ids: ids
    })
    EventService.delete(ids);
  }
}

export default EventActions;
