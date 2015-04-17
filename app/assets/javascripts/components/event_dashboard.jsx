var EventDashboard = React.createClass({
  propTypes: {
    authToken: React.PropTypes.string.isRequired
  },
  render: function () {
    return (
      <div className="EventDashboardContainer" id="mainDashboard">
        <Event model={this.props.event} />
        <RouteHandler authToken={this.props.authToken} eventId={this.props.event.id} currentUserId={this.props.currentUserId} />
      </div>
    );
  }
});
