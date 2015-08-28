import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import {ActionTypes} from '../constants/AppConstants.jsx';
import ShowTaskModal from '../components/tasks/ShowTaskModal';
import EditTaskModal from '../components/tasks/EditTaskModal';
import EditContactModal from '../components/contacts/EditContactModal';
import EditVendorModal from '../components/vendors/EditVendorModal';
import ShowContactModal from '../components/contacts/ShowContactModal';
import ShowVendorModal from '../components/vendors/ShowVendorModal';
import AddVendorModal from '../components/event_vendors/AddVendorModal';
import AddContactModal from '../components/event_contacts/AddContactModal';
import FeedbackModal from '../components/session/FeedbackModal';

class ModalActions {
  static openShowTaskModal(props) {
    let modal = React.createElement(ShowTaskModal, props);
    AppDispatcher.handleAction({
      type: ActionTypes.OPEN_MODAL,
      modal: modal
    });
  }

  static openEditTaskModal(props) {
    let modal = React.createElement(EditTaskModal, props);
    AppDispatcher.handleAction({
      type: ActionTypes.OPEN_MODAL,
      modal: modal
    });
  }

  static openEditContactModal(props) {
    let modal = React.createElement(EditContactModal, props);
    AppDispatcher.handleAction({
      type: ActionTypes.OPEN_MODAL,
      modal: modal
    });
  }

  static openEditVendorModal(props) {
    let modal = React.createElement(EditVendorModal, props);
    AppDispatcher.handleAction({
      type: ActionTypes.OPEN_MODAL,
      modal: modal
    });
  }

  static openShowContactModal(props) {
    let modal = React.createElement(ShowContactModal, props);
    AppDispatcher.handleAction({
      type: ActionTypes.OPEN_MODAL,
      modal: modal
    });
  }

  static openShowVendorModal(props) {
    let modal = React.createElement(ShowVendorModal, props);
    AppDispatcher.handleAction({
      type: ActionTypes.OPEN_MODAL,
      modal: modal
    });
  }

  static openAddContactModal(props) {
    let modal = React.createElement(AddContactModal, props);
    AppDispatcher.handleAction({
      type: ActionTypes.OPEN_MODAL,
      modal: modal
    });
  }

  static openAddVendorModal(props) {
    let modal = React.createElement(AddVendorModal, props);
    AppDispatcher.handleAction({
      type: ActionTypes.OPEN_MODAL,
      modal: modal
    });
  }

  static openFeedbackModal() {
    let modal = React.createElement(FeedbackModal, {});
    AppDispatcher.handleAction({
      type: ActionTypes.OPEN_MODAL,
      modal: modal
    });
  }

  static close() {
    AppDispatcher.handleAction({
      type: ActionTypes.CLOSE_MODAL
    })
  }
};

export default ModalActions;
