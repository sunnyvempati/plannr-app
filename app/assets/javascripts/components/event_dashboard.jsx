var EventDashboard = React.createClass({
  propTypes: {
    authToken: React.PropTypes.string.isRequired
  },
  render: function () {
    return (
      <div className="EventDashboardContainer" id="mainDashboard">
        <RouteHandler authToken={this.props.authToken} eventId={this.props.event.id} userId={this.props.userId} />
        <EventFormShow model={this.props.event} />
      </div>
    );
  }
});


