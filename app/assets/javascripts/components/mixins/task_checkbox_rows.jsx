var TaskCheckboxRows = {
  getInitialState: function() {
    return {
      tasks: []
    };
  },
  handleCheck: function(checked, task_id) {
    var status = checked ? 2 : 1;
    $.ajax({
      method: "PUT",
      url: "/tasks/" + task_id + ".json",
      data: { task: { id: task_id, status: status }}
    })
    .success(function(result) {
      var statusDisplay = status == 1 ? "To do" : "Completed";
      this.toast("Task status changed: " + statusDisplay);
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
  }
}
