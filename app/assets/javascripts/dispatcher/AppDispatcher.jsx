import AppConstants from '../constants/AppConstants.jsx';
import { Dispatcher } from 'flux';
import Queue from 'sync-queue';

const PayloadSources = AppConstants.PayloadSources;

let queue = new Queue();

class AppDispatcher extends Dispatcher {
  handleAction(action) {
    const payload = {
      action: action
    };
    queue.place(() => {
      this.dispatch(payload);
      queue.next();
    });
  }
  // handleServerAction(action) {
  //   const payload = {
  //     source: PayloadSources.SERVER_ACTION,
  //     action: action
  //   };
  //   this.dispatch(payload);
  // }
  // handleViewAction(action) {
  //   const payload = {
  //     source: PayloadSources.VIEW_ACTION,
  //     action: action
  //   };
  //   this.dispatch(payload);
  // }
}

var _appDispatcherInstance = new AppDispatcher();

export default _appDispatcherInstance;
