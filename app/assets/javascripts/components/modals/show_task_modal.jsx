var ShowTaskModal = React.createClass({
  mixins: [Modal],
  getInitialState: function() {
    return {
      task: this.props.model,
      taskLoaded: false
    };
  },
  componentDidMount: function() {
    if (!!this.state.task.id) {
      var url = '/tasks/' + this.state.task.id + '.json';
      Utils.get(url, {}, function(result) {
        this.setState({task: result.task, taskLoaded: true});
      }.bind(this));
    }
  },
  renderTaskInfo: function(task) {
    var deadlineIcon = task.deadline ? TaskDeadline.renderDeadlineIcon(task.deadline, 'CardIcon') : <i className="fa fa-clock-o CardIcon"></i>
    return (
      <div className="Card-content">
        <div className="IconWithText">
          {deadlineIcon}
          {task.deadline || "Not set"}
        </div>
        <div className="IconWithText">
          <i className="fa fa-user CardIcon"></i>
          {task.assigned_to || "Unassigned"}
        </div>
        <div className="TaskModal-descriptionContainer">
          <div className="TaskModal-descriptionTitle">
            Description
          </div>
          <div className="TaskModal-description">
            {task.description}
          </div>
        </div>
      </div>
    )
  },
  renderModalContent: function() {
    var task = this.state.task;
    return (
      <div className="TaskModal">
        {this.renderCloseModal()}
        <div className="TaskModal-header">
          <div className="TaskModal-title u-clickable" onClick>
            {task.name}
          </div>
        </div>
        <div className="TaskModal-contentContainer">
          <div className="TaskModal-content">
            <div className="Card u-noMargin u-noPadding">
              {this.renderTaskInfo(task)}
            </div>
          </div>
          <div className="TaskModal-contentButtonList">
            <Button type="button" className="Button--primary TaskActionButton">
              Edit
            </Button>
            <Button type="button" className="Button--affirmative TaskActionButton">
              Complete
            </Button>
            <Button type="button" className="Button--critical TaskActionButton">
              Delete
            </Button>
          </div>
        </div>
      </div>
    )
  }
});
