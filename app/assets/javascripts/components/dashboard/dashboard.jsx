var Dashboard = React.createClass({
	getInitialState: function() {
    return {events: []};
  },
	loadEventsFromServer: function() {
    $.ajax({
      url: this.props.events_url,
      dataType: 'json',
      success: function(events) {
        this.setState({events: events});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
	componentWillMount: function() {
		this.loadEventsFromServer();
	},
	render: function() {
		return (
			<div className="dashboard-container">
				<div className="create-event-row">
					<Button className="btn btn-default create-event-button">Create Event</Button>
				</div>
				<DashboardEventList events={this.state.events} />
			</div>
		);
	}
});
