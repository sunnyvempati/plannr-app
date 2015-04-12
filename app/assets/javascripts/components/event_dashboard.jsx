var EventDashboard = React.createClass({
  propTypes: {
    event: React.PropTypes.object.isRequired
  },
  render: function () {
    return (
      <div className="EventDashboardContainer">
        <EventTileContainer eventId={this.props.event.id} />
      </div>
    );
  }
});
