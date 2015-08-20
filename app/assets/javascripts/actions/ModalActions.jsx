import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import {ActionTypes} from '../constants/AppConstants.jsx';
import ShowTaskModal from '../components/tasks/ShowTaskModal';
import EditTaskModal from '../components/tasks/EditTaskModal';

class ModalActions {
  static openShowTaskModal(props) {
    let modal = React.createElement(ShowTaskModal, props);
    AppDispatcher.handleViewAction({
      type: ActionTypes.OPEN_MODAL,
      modal: modal
    });
  }

  static openCreateTaskModal(props) {
    let modal = React.createElement(EditTaskModal, props);
    AppDispatcher.handleViewAction({
      type: ActionTypes.OPEN_MODAL,
      modal: modal
    });
  }

  static close() {
    AppDispatcher.handleViewAction({
      type: ActionTypes.CLOSE_MODAL
    })
  }
};

export default ModalActions;
