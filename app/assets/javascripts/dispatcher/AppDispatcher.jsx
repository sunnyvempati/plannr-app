import AppConstants from '../constants/AppConstants.jsx';
import { Dispatcher } from 'flux';

const PayloadSources = AppConstants.PayloadSources;

class AppDispatcher extends Dispatcher {
  handleServerAction(action) {
    const payload = {
      source: PayloadSources.SERVER_ACTION,
      action: action
    };
    this.dispatch(payload);
  }
  handleViewAction(action) {
    const payload = {
      source: PayloadSources.VIEW_ACTION,
      action: action
    };
    this.dispatch(payload);
  }
}

var appDispatcherInstance = new AppDispatcher();

export default appDispatcherInstance;
