var EventDashboard = React.createClass({
  propTypes: {
    authToken: React.PropTypes.string.isRequired
  },
  render: function () {
    return (
      <div className="EventDashboardContainer" id="mainDashboard">
        <div className="EventDashboard-event">
          <Event model={this.props.event} client={this.props.client} />
        </div>
        <div className="EventDashboard-router">
          <RouteHandler authToken={this.props.authToken} eventId={this.props.event.id}/>
        </div>
      </div>
    );
  }
});
