import TaskRow from './TaskRow';
import EditTaskModal from './EditTaskModal';
import ShowTaskModal from './ShowTaskModal';
import ModalActions from '../../actions/ModalActions';
import TaskActions from '../../actions/TaskActions';
import TaskStore from '../../stores/TaskStore';

var TaskCheckboxRows = {
  handleCheck: function(checked, taskId) {
    var status = checked ? 2 : 1;
    var params = {
      task: {
        id: taskId,
        status: status
      }
    };
    TaskActions.update(taskId, params);
    this.resetPage();
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
      model: {event_id: this.props.params.id},
      onSuccess: this.onTaskSuccess,
      type: 'NEW'
    }
    ModalActions.openEditTaskModal(props);
  },
  openTaskModal: function(taskId) {
    var props = {
      model: TaskStore.get(taskId),
      handleEditClick: this.openEditModal,
      handleDeleteClick: this.handleDelete,
      handleCheckChange: this.handleCheck
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
