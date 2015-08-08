import AppConstants from '../constants/AppConstants.jsx';
import { Dispatcher } from 'flux';

const PayloadSources = AppConstants.PayloadSources;

const AppDispatcher = Object.assign(new Dispatcher(), {
  handleServerAction(action) {
    const payload = {
      source: PayloadSources.SERVER_ACTION,
      action: action
    };
    this.dispatch(payload);
  },
  handleViewAction(action) {
    const payload = {
      source: PayloadSources.VIEW_ACTION,
      action: action
    };
    this.dispatch(payload);
  }
});

export default AppDispatcher;
