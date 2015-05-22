var EventTaskListTile = React.createClass({
  getInitialState: function() {
    return {
      tableData: []
    };
  },
  componentDidMount: function() {
    $.get("tasks.json", function(results) {
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
      <div>
        <ActionButton class="ActionButton-tasks" path="/tasks/new" label="Create Task" prerender="true" />
        <EventTasksTable data={this.state.tableData}
                       onUpdatedData={this.updateData}
                       extraPadding={false} />
      </div>
    );
  }
});
