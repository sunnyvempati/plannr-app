import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import {ActionTypes} from '../constants/AppConstants.jsx';

class RouteActions {
  static redirect(route) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.REDIRECT,
      route: route
    });
  }
};

export default RouteActions;
