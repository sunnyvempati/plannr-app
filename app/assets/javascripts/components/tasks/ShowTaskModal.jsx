import ModalMixin from '../mixins/ModalMixin';
import EditTaskModal from './EditTaskModal';
import TaskDeadline from './TaskDeadline';
import Button from '../generic/Button';
import CheckboxInput from '../generic/CheckboxInput';
import TaskStore from '../../stores/TaskStore';

var ShowTaskModal = React.createClass({
  mixins: [ModalMixin],
  renderStatusText: function(status) {
    var completed = status == 2;
    var display = completed ? "Completed" : "To do";
    return (
      <div className="IconWithText">
        <i className="fa fa-check-square-o CardIcon"></i>
        {display}
      </div>
    );
  },
  renderTaskInfo: function(task) {
    var deadlineIcon = task.deadline ? TaskDeadline.renderDeadlineIcon(task.deadline, 'CardIcon') : <i className="fa fa-clock-o CardIcon"></i>
    return (
      <div className="Card u-noPadding">
        <div className="Card-content">
          {this.renderStatusText(task.status_id)}
          <div className="IconWithText">
            {deadlineIcon}
            {task.deadline || "Not Set"}
          </div>
          <div className="IconWithText">
            <i className="fa fa-user CardIcon"></i>
            {task.assigned_to || "Unassigned"}
          </div>
          <div className="TaskModal-descriptionContainer">
            <div className="TaskModal-descriptionTitle">
              Description
            </div>
            <div className="TaskModal-description u-wrapWithEllipsis">
              {task.description}
            </div>
          </div>
        </div>
      </div>
    )
  },
  handleEdit(id) {
    this.props.handleEditClick(id);
  },
  handleDelete(id) {
    this.props.handleDeleteClick(id);
  },
  renderActionButtons: function(task) {
    var status = task.status;
    return (
      <div className="TaskModal-contentButtonList">
        <Button type="button" className="Button--primary TaskActionButton" onClick={this.handleEdit.bind(this, task.id)}>
          Edit
        </Button>
        <Button type="button"
                className="Button--critical TaskActionButton"
                onClick={this.handleDelete.bind(this, task.id)}>
          Delete
        </Button>
      </div>
    );
  },
  handleCheckChange: function(checked) {
    var status = checked ? 2 : 1;
    var task_id = this.props.model.id;
    var url = "/tasks/" + task_id + ".json";
    var params = {
      task: {
        id: task_id,
        status: status
      }
    };
    // to do
    // Utils.put(url, params, function(result) {
    //   this.props.onTaskChange();
    //   var statusDisplay = status == 1 ? "To do" : "Completed";
    //   this.setState({task: result.task});
    //   ToastMessages.toast("Task status changed: " + statusDisplay);
    // }.bind(this));
  },
  renderModalContent: function() {
    var task = this.props.model;
    var checkboxDisplay = <div className="TaskModal-title u-wrapWithEllipsis">{task.name}</div>;
    return (
      <div className="TaskModal">
        {this.renderCloseModal()}
        <div className="TaskModal-header">
          <CheckboxInput checked={task.status_id == 2}
                         rounded={true}
                         checkboxDisplay={checkboxDisplay}
                         onChange={this.handleCheckChange}
          />
        </div>
        <div className="TaskModal-contentContainer">
          <div className="TaskModal-content">
            {this.renderTaskInfo(task)}
          </div>
          {this.renderActionButtons(task)}
        </div>
        <div className="Card">
          <div className="Card-content">
            Comments to do
          </div>
        </div>
      </div>
    )
  }
});

export default ShowTaskModal;
