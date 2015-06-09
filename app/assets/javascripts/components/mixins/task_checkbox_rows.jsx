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
      var newData = this.spliceResults(this.state.tasks, result.task.id);
      this.setState({tasks: newData});
    }.bind(this));
  },
  getCustomRows: function() {
    var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
    var rows =  this.state.tasks.map(function(task) {
      return (
        <TaskRow data={task}
                 actionItems={this.actionItems()}
                 key={task.id}
                 checkChanged={this.handleCheck}
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
