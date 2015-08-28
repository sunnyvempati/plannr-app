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
}

var _appDispatcherInstance = new AppDispatcher();

export default _appDispatcherInstance;
