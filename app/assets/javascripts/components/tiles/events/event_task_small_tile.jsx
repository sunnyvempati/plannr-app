var EventTaskSmallTile = React.createClass({
  getInitialState: function () {
    return {
      tasks: null
    };
  },
  componentDidMount: function () {
    $.get("tasks.json", function (results) {
      if (this.isMounted()) {
        this.setState({
          tasks: results.tasks
        })
      }
    }.bind(this))
  },
  getTaskContent: function() {
    var tasks = this.state.tasks;
    if (tasks) {
      var completedTasks = 0, toDoTasks = 0;
      tasks.forEach(function(task) {
        task.status == 'To do' ? toDoTasks++ : completedTasks++;
      });
      return (
        <div>
          {toDoTasks}
          {completedTasks}
          {toDoTasks / tasks.length * 100}
        </div>
      )
    }
  },
  quickCreateTask: function(params) {
    $.post("/tasks.json", params, function(result) {
      var oldTasks = this.state.tasks;
      oldTasks.push(result.task);
      this.setState({tasks: oldTasks});
    }.bind(this));
  },
  render: function () {
    var inputClasses = classNames({
      "Autocomplete-input": true,
      "is-invalid": this.state.errorState
    });
    return (
      <div className="Tile">
        <div className="Tile-header">
          <Link to="eventTasks" className="Tile-headerLink">
            <div className="Tile-imgTask"></div>
            <div className="Tile-title">Tasks</div>
          </Link>
        </div>
        <div className="Tile-content">
          <div className="TileContent-quickAdd">
            <TaskQuickAddInput onAdd={this.quickCreateTask} eventId={this.props.eventId} />
          </div>
          <div className="TileContent-count">
            {this.getTaskContent()}
          </div>
        </div>
      </div>
    );
  }
});
