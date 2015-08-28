import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import {ActionTypes} from '../constants/AppConstants.jsx';

class RouteActions {
  static redirect(route, params) {
    AppDispatcher.handleAction({
      type: ActionTypes.REDIRECT,
      route: route,
      params: params
    });
  }
};

export default RouteActions;
