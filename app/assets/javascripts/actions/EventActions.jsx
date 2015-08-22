import AppDispatcher from '../dispatcher/AppDispatcher';
import {ActionTypes} from '../constants/AppConstants';
import EventService from '../services/EventService';
import EventStore from '../stores/EventStore';

class EventActions {
  static getEvents(params) {
    AppDispatcher.handleAction({
      type: ActionTypes.GET_EVENTS_REQUEST,
      params: params
    })
    if (EventStore.isCached(params)) {
      AppDispatcher.handleAction({
        type: ActionTypes.GET_CACHED_EVENTS_RESPONSE,
        params: params
      })
    } else {
      EventService.getEvents(params);
    }
  }

  static update(id, params) {
    AppDispatcher.handleAction({
      type: ActionTypes.UPDATE_EVENT_REQUEST,
      id: id,
      params: params
    });
    EventService.update(id, params);
  }

  static deleteEvents(ids) {
    AppDispatcher.handleAction({
      type: ActionTypes.DELETE_EVENT_REQUEST,
      ids: ids
    })
    EventService.delete(ids);
  }

  static search(params) {
    AppDispatcher.handleAction({
      type: ActionTypes.SEARCH_EVENTS_REQUEST,
      params: params
    })
    EventService.search(params);
  }

  static create(params) {
    AppDispatcher.handleAction({
      type: ActionTypes.CREATE_EVENT_REQUEST,
      params: params
    })
    EventService.create(params);
  }

  static get(id) {
    AppDispatcher.handleAction({
      type: ActionTypes.GET_EVENT_REQUEST,
      id: id
    });
    EventService.get(id);
  }
}

export default EventActions;
