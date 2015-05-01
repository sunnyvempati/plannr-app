var Event = React.createClass({
  propTypes: {
    model: React.PropTypes.object
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
        <div className="Event-info">
          <div className="Info-header">
            Client
          </div>
          <div className="Info-content">
          </div>
          {this.eventInfoDivs(["name", "client_name", "location"])}
        </div>
        <div className="Event-dateInfo">
          {this.eventInfoDivs(["start_date"])}
        </div>
        <div className="Event-budget">
          {this.eventInfoDivs(["budget"])}
        </div>
      </div>
    );
  }
});

