import TaskRow from './TaskRow';
import EditTaskModal from './EditTaskModal';
import ShowTaskModal from './ShowTaskModal';
import ModalActions from '../../actions/ModalActions';
import TaskActions from '../../actions/TaskActions';
import TaskStore from '../../stores/TaskStore';

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
  openCreateTaskModal: function() {
    var props = {
      model: {event_id: this.props.eventId},
      onSuccess: this.onTaskSuccess,
      type: 'NEW'
    }
    ModalActions.openEditTaskModal(props);
  },
  openTaskModal: function(taskId) {
    var props = {
      model: TaskStore.get(taskId),
      handleEditClick: this.openEditModal,
      handleDeleteClick: this.handleDelete
    };
    ModalActions.openShowTaskModal(props);
  },
  openEditModal: function(taskId) {
    let task = TaskStore.get(taskId);
    var props = {
      model: task,
      onSuccess: this.onTaskSuccess,
      type: 'OLD'
    };
    ModalActions.openEditTaskModal(props);
  },
  onTaskSuccess: function(task, createNew) {
    this.resetPageAndFetch();
    createNew ? this.openCreateTaskModal() : this.openTaskModal(task.id);
  },
  handleEdit(id) {
    this.openEditModal(id);
  },
  handleDelete(id) {
    TaskActions.delete([id]);
  },
  goToTask: function(data) {
    this.openTaskModal(data.id);
  }
}

export default TaskCheckboxRows;
