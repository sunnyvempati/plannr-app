var EventTaskListTile = React.createClass({
  getInitialState: function() {
    return {
      tableData: []
    };
  },
  componentDidMount: function() {
    this.getEventTasks();
  },
  getEventTasks: function() {
    $.get("tasks.json", function(results) {
      if (this.isMounted()) {
        this.setState({
          tableData: results.tasks
        })
      }
    }.bind(this))
  },
  getUserTasks: function() {
    $.get("/user_tasks", function(results) {
      if (this.isMounted()) {
        this.setState({
          tableData: results.tasks
        })
      }
    }.bind(this))
  },
  updateData: function(data) {
    this.setState({tableData: data});
  },
  render: function() {
    return (
      <EventTasksTable data={this.state.tableData}
                       onUpdatedData={this.updateData}
                       getUserTasks={this.getUserTasks}
                       reloadTasks={this.getEventTasks} />
    );
  }
});
