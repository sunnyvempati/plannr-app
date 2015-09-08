import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import {ActionTypes} from '../constants/AppConstants.jsx';

class RouteActions {
  static redirect(route, params, query) {
    AppDispatcher.handleAction({
      type: ActionTypes.REDIRECT,
      route: route,
      params: params,
      query: query
    });
  }

  static refresh() {
    AppDispatcher.handleAction({
      type: ActionTypes.REFRESH
    });
  }
};

export default RouteActions;
