var DashboardEvent = React.createClass({
	render: function() {
		return (
			<div className="dashboard-event">
				<div className="dashboard-event-header">
					<div className="dashboard-event-header-name">
						{this.props.event.name}
					</div>
					<div className="dashboard-event-header-date">
						{this.props.event.start_date}	
					</div>
				</div>
				<div className="dashboard-event-content">
					<div className="dashboard-event-client-panel">
					</div>
					<div className="dashboard-event-tasks-panel">
					</div>
					<div className="dashboard-event-messages-panel">
					</div>
				</div>
			</div>
		);
	}
});
