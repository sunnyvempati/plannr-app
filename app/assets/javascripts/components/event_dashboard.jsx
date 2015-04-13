var EventDashboard = React.createClass({
  propTypes: {
    eventId: React.PropTypes.string.isRequired
  },
  render: function () {
    return (
      <div className="EventDashboardContainer" id="mainDashboard">
        <RouteHandler eventId={this.props.eventId} />
      </div>
    );
  }
});


