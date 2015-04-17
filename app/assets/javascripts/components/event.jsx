var Event = React.createClass({
  propTypes: {
    model: React.PropTypes.object
  },
  render: function () {
    var event = this.props.model;
    return (
      <div className="EventContainer">
        <div className="Event-basicInfo">
          {event.name}
          {event.client_name}
          {event.location}
        </div>
        <div className="Event-dateInfo">
          {event.start_date}
        </div>
        <div className="Event-budget">
          {event.budget}
        </div>
      </div>
    );
  }
});

