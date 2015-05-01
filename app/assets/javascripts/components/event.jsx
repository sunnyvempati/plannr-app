var Event = React.createClass({
  propTypes: {
    model: React.PropTypes.object
  },
  editEvent: function(id) {
    location.href = "/events/" + id + "/edit/";
  },
  eventInfoDivs: function(attrs) {
    return attrs.map(function(eventAttr) {
      return (
        <div>{eventAttr + ": "}{this.props.model[eventAttr]}</div>
      )
    }, this);
  },
  render: function () {
    var event = this.props.model;
    return (
      <div className="EventContainer">
        <div className="Event-info u-flexGrow-2">
          <div className="Info-header">
            Client
          </div>
          <div className="Info-content">
            <div className="u-bold">{this.props.client.name}</div>
            {this.props.client.organization}<br />
            {this.props.client.email}<br />
            {this.props.client.phone}
          </div>
        </div>
        <div className="Event-info u-flexGrow-2">
          <div className="Info-header">
            Location
          </div>
          <div className="Info-content u-bold">
            {event.location}
          </div>
        </div>
        <div className="Event-info u-flexGrow-1">
          <div className="Info-header">
            Start Date
          </div>
          <div className="Info-content u-bold">
            {event.start_date}
          </div>
        </div>
        <div className="Event-info u-flexGrow-1">
          <div className="Info-header">
            End Date
          </div>
          <div className="Info-content u-bold">
            {event.end_date}
          </div>
        </div>
        <div className="Event-info u-flexGrow-1">
          <div className="Info-header">
            Budget
          </div>
          <div className="Info-content u-bold">
            {event.budget}
          </div>
        </div>
        <div className="Event-edit u-flexGrow-4">
          <div className="Edit-btn">
            <button className="Button Button--simple" onClick={this.editEvent.bind(this, event.id)}>
              Edit
            </button>
          </div>
        </div>
      </div>
    );
  }
});

