import TaskRow from './TaskRow';
import EditTaskModal from './EditTaskModal';
import ShowTaskModal from './ShowTaskModal';
import ModalActions from '../../actions/ModalActions';

var TaskCheckboxRows = {
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

  goToTask: function(data) {
    this.openTaskModal(data.id);
  }
}

export default TaskCheckboxRows;
