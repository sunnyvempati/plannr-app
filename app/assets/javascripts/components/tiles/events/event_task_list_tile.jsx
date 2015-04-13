var EventTaskListTile = React.createClass({
  propTypes: {
    eventId: React.PropTypes.number.isRequired
  },
  getInitialState: function() {
    return {
      tableData: []
    };
  },
  componentDidMount: function() {
    var eventId = this.props.eventId;
    var url = "/events/" + eventId + "/tasks";
    $.get(url, function(results) {
      this.setState({
        tableData: results.tasks
      })
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