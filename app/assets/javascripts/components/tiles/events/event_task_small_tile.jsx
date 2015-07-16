var EventTaskSmallTile = React.createClass({
  getInitialState: function () {
    return {
      tasks: null
    };
  },
  componentDidMount: function () {
    this.getTasks();
  },
  getTasks: function() {
    var params = {
      filter_sort: {
        with_event_id: this.props.eventId
      }
    };
    $.get("/tasks.json", params, function (results) {
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
      var percentComplete = tasks.length == 0 ? 0 : Number((completedTasks / tasks.length * 100).toFixed(1));
      return (
        <div className="TaskTile-content">
          <div className="TaskTile-percent">
            <div className="Task-display">
              {percentComplete + "%"}
            </div>
            <div className="TaskCompletionMeter">
              <span style={{width: percentComplete+"%"}}></span>
            </div>
          </div>
          <div className="TaskTile-count">
            <div className="Task-display">
              {completedTasks}
            </div>
            <div className="TileContent-title">
              Completed
            </div>
          </div>
          <div className="TaskTile-count">
            <div className="Task-display">
              {tasks.length}
            </div>
            <div className="TileContent-title">
              Total
            </div>
          </div>
        </div>
      )
    }
  },
  onAdd: function(task) {
    ToastMessages.toast("Successfully created task for event.");
    var oldTasks = this.state.tasks;
    oldTasks.push(task);
    this.setState({tasks: oldTasks});
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
        <div className="Task-content">
          <div className="TaskContent-quickAdd">
            <TaskQuickAddInput onAdd={this.onAdd} eventId={this.props.eventId} />
          </div>
          {this.getTaskContent()}
        </div>
      </div>
    );
  }
});
