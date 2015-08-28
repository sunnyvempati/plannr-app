import Router from 'react-router';
import routes from '../routes';
import BaseStore from './BaseStore';
import AppDispatcher from '../dispatcher/AppDispatcher';
import {ActionTypes} from '../constants/AppConstants';
import SessionStore from './SessionStore';
import UserStore from './UserStore';
import EventStore from './EventStore';
import ToastActions from '../actions/ToastActions';

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

    case ActionTypes.RESEND_VERIFY_SUCCESS_RESPONSE:
      router.transitionTo('login');
      ToastActions.toast('Email verification email sent.');
      break;

    case ActionTypes.RESET_PASSWORD_REQUEST_RESPONSE:
    case ActionTypes.RESET_PASSWORD_RESPONSE:
      if (!action.errors) router.transitionTo('app');
      break;

    case ActionTypes.VERIFY_RESPONSE:
      if (!action.error) {
        router.transitionTo('app');
      }
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

    case ActionTypes.LOGOUT_RESPONSE:
      if (!SessionStore.isLoggedIn()) {
        ToastActions.toast("You've been successfully logged out!");
        router.transitionTo('login');
      }
      break;
    case ActionTypes.UNAUTHORIZED_REQUEST:
      router.transitionTo('login');
    default:
  }
})

export default _routeStoreInstance;
