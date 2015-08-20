import Router from 'react-router';
import routes from '../routes';
import BaseStore from './BaseStore';
import AppDispatcher from '../dispatcher/AppDispatcher';
import {ActionTypes} from '../constants/AppConstants';
import SessionStore from './SessionStore';
import UserStore from './UserStore';
import EventStore from './EventStore';

const router = Router.create({
  routes: routes,
  location: null
});

class RouteStore extends BaseStore {
  constructor() {
    super();
  }

  getRouter() {
    return router;
  }

  redirectHome() {
    router.transitionTo('app');
  }
}

let _routeStoreInstance = new RouteStore();

_routeStoreInstance.dispatchToken = AppDispatcher.register((payload) => {
  AppDispatcher.waitFor([
    SessionStore.dispatchToken,
    UserStore.dispatchToken,
    EventStore.dispatchToken
  ]);

  let action = payload.action;

  switch(action.type) {
    case ActionTypes.REDIRECT:
      router.transitionTo(action.route, action.params);
      break;

    case ActionTypes.LOGIN_RESPONSE:
      // no profile
      if (SessionStore.isLoggedIn()) {
        router.transitionTo('app');
      }
      break;

    case ActionTypes.PROFILE_RESPONSE:
      if (!action.errors) {
        router.transitionTo('app');
      }
      break;

    case ActionTypes.RESET_PASSWORD_REQUEST_RESPONSE:
    case ActionTypes.RESET_PASSWORD_RESPONSE:
      if (!action.errors) router.transitionTo('app');
      break;

    case ActionTypes.VERIFY_RESPONSE:
      router.transitionTo('app');
      break;

    case ActionTypes.SIGNUP_RESPONSE:
      if (!action.errors) {
        router.transitionTo('check_email', {}, {email: action.json.user.email});
      }
      break;

    case ActionTypes.GET_USER_RESPONSE:
      if (!action.errors && !UserStore.currentUser.profile) {
        router.transitionTo('profile');
      }
      break;

    // case ActionTypes.CREATE_EVENT_RESPONSE:
    //   let event = action.json && action.json.event;
    //   if (!action.errors && event) router.transitionTo('event', {id: event.id});
    //   break;

    case ActionTypes.LOGOUT_RESPONSE:
      if (!SessionStore.isLoggedIn()) {
        router.transitionTo('login');
      }
      break;

    default:
  }
})

export default _routeStoreInstance;
