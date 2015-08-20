import TaskRow from './TaskRow';
import EditTaskModal from './EditTaskModal';
import ShowTaskModal from './ShowTaskModal';
import ModalActions from '../../actions/ModalActions';

export default {
  handleCheck: function(checked, task_id) {
    var status = checked ? 2 : 1;
    var url = "/tasks/" + task_id + ".json";
    var params = {
      task: {
        id: task_id,
        status: status
      }
    };
    // to do
    // Utils.put(url, params, function(result) {
    //   var statusDisplay = status == 1 ? "To do" : "Completed";
    //   ToastMessages.toast("Task status changed: " + statusDisplay);
    //   var newData = this.spliceResults(this.state.data, result.task.id);
    //   this.setState({data: newData});
    // }.bind(this));
  },
  getCustomRows: function(global, handleRowClick) {
    var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
    var rows =  this.state.data.map(function(task) {
      return (
        <TaskRow data={task}
                 actionItems={this.actionItems()}
                 key={task.id}
                 checkChanged={this.handleCheck}
                 global={global}
                 onClick={handleRowClick.bind(this, task)}
        />
      )
    }.bind(this));
    return (
      <div>{rows}</div>
    )
  },
  openCreateTaskModal: function() {
    var props = {
      model: {event_id: this.props.eventId},
      type: 'NEW'
    }
    ModalActions.openCreateTaskModal(props);
    // Modal.mount(props, EditTaskModal);
  },
  openTaskModal: function(taskId) {
    var props = {id: taskId};
    ModalActions.openShowTaskModal(props);
  },
  openEditModal: function(taskId) {
    // var props = {
    //   model: {id: taskId},
    //   authToken: this.props.authToken,
    //   onSuccess: this.onTaskSuccess,
    //   routeVerb: 'PUT'
    // };
    // Modal.mount(props, EditTaskModal);
  },
  onTaskSuccess: function(task, createNew) {
    // to do
    // this.resetPage();
    // createNew ? this.openCreateTaskModal() : this.openTaskModal(task.id);
  },
  goToTask: function(data) {
    this.openTaskModal(data.id);
  }
}
