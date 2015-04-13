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
        <Link to="tileAll">Go back to home</Link>
        <EventTaskTable data={this.state.tableData} />
      </div>
    );
  }
});
