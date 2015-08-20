import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import {ActionTypes} from '../constants/AppConstants.jsx';

class ServerActions {
  static receiveLogin(json, errors) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.LOGIN_RESPONSE,
      json: json,
      errors: errors
    });
  }

  static receiveSignup(json, errors) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.SIGNUP_RESPONSE,
      json: json,
      errors: errors
    });
  }

  static receiveVerify(errors) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.VERIFY_RESPONSE,
      errors: errors
    });
  }

  static receiveResetRequest(json, errors) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RESET_PASSWORD_REQUEST_RESPONSE,
      json: json,
      errors: errors
    });
  }

  static receiveResetPassword(json, errors) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RESET_PASSWORD_RESPONSE,
      json: json,
      errors: errors
    });
  }

  static receiveLogout(errors) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.LOGOUT_RESPONSE,
      errors: errors
    })
  }

  static receiveProfile(json, errors) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.PROFILE_RESPONSE,
      json: json,
      errors: errors
    })
  }

  static receiveUser(json, errors) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.GET_USER_RESPONSE,
      json: json,
      errors: errors
    })
  }

  static receiveEvents(events, params, errors) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.GET_EVENTS_RESPONSE,
      events: events,
      params: params,
      errors: errors
    })
  }

  static receiveEventSearch(events, errors) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.SEARCH_EVENTS_RESPONSE,
      events: events,
      errors: errors
    })
  }

  static receiveContactSearch(contacts, errors) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.SEARCH_CONTACTS_RESPONSE,
      contacts: contacts,
      errors: errors
    });
  }

  static receiveCreateContact(json, errors) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.CREATE_EVENT_CLIENT_RESPONSE,
      json: json,
      errors: errors
    });
  }

  static receiveEventClient(json, errors) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.GET_EVENT_CLIENT_RESPONSE,
      json: json,
      errors: errors
    });
  }

  static receiveCreateEvent(json, errors) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.CREATE_EVENT_RESPONSE,
      json: json,
      errors: errors
    });
  }

  static receiveDeleteEvents(ids, errors) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.DELETE_EVENT_RESPONSE,
      ids: ids,
      errors: errors
    });
  }

  static receiveUpdateEvent(json, errors) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.UPDATE_EVENT_RESPONSE,
      json: json,
      errors: errors
    });
  }

  static receiveTasks(tasks, params, errors) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.GET_TASKS_RESPONSE,
      tasks: tasks,
      params: params,
      errors: errors
    })
  }
};

export default ServerActions;
