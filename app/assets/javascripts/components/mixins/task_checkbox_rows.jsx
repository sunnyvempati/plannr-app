var TaskCheckboxRows = {
  getInitialState: function() {
    return {
      tasks: []
    };
  },
  handleCheck: function(checked, task_id) {
    var status = checked ? 2 : 1;
    var url = "/tasks/" + task_id + ".json";
    var params = {
      task: {
        id: task_id,
        status: status
      }
    };
    Utils.put(url, params, function(result) {
      var statusDisplay = status == 1 ? "To do" : "Completed";
      ToastMessages.toast("Task status changed: " + statusDisplay);
      var newData = this.spliceResults(this.state.tasks, result.task.id);
      this.setState({tasks: newData});
    }.bind(this));
  },
  // global shows event column
  getCustomRows: function(global, handleRowClick) {
    var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
    var rows =  this.state.tasks.map(function(task) {
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
      <ReactCSSTransitionGroup transitionName="TaskTableRow">
        {rows}
      </ReactCSSTransitionGroup>
    )
  },
  spliceResults: function(data, ids) {
    return $.map(data, function(item, index) {
      if (ids.indexOf(item.id) === -1) {
        return item;
      }
    });
  },
  openCreateTaskModal: function() {
    var props = {
      model: {event_id: this.props.eventId},
      authToken: this.props.authToken,
      onSuccess: this.onTaskSuccess,
      routeVerb: 'POST'
    }
    Modal.mount(props, EditTaskModal);
  },
  openTaskModal: function(taskId) {
    var props = {
      model: {id: taskId},
      authToken: this.props.authToken,
      onTaskChange: this.getTableData.bind(this, {status: 1}),
      currentUserId: this.props.currentUserId
    };
    Modal.mount(props, ShowTaskModal);
  },
  openEditModal: function(taskId) {
    var props = {
      model: {id: taskId},
      authToken: this.props.authToken,
      onSuccess: this.onTaskSuccess,
      routeVerb: 'PUT'
    };
    Modal.mount(props, EditTaskModal);
  },
  onTaskSuccess: function(task, createNew) {
    this.getTableData({status: 1});
    createNew ? this.openCreateTaskModal() : this.openTaskModal(task.id);
  },
  goToTask: function(data) {
    this.openTaskModal(data.id);
  }
}
