var DashboardEventList = React.createClass({
	render: function() {
		var events_list = this.props.events.map(function(event) {
			return (
				<DashboardEvent event={event} />
			);
		});
		return (
			<div className="dashboard-events-container">
				{events_list}
			</div>
		);
	}
});
