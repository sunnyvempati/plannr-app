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

  static storeLocation() {
    AppDispatcher.handleAction({
      type: ActionTypes.STORE_LOCATION
    })
  }
};

export default RouteActions;
