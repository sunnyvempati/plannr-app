var EventTaskListTile = React.createClass({
  getInitialState: function() {
    return {
      tableData: []
    };
  },
  componentDidMount: function() {
    $.get("tasks", function(results) {
      if (this.isMounted()) {
        this.setState({
          tableData: results.tasks
        })
      }
    }.bind(this))
  },
  render: function() {
    return (
      <div className="EventTaskListTile">
        <Link to="tileAll">Show All</Link>
        <EventTaskTable data={this.state.tableData} />
        <Link to='tileNewTask' >New Event Task</Link>
      </div>
    );
  }
});
