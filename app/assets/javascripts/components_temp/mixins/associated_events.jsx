var AssociatedEvents = {
  getInitialState: function() {
    return {
      events: null
    };
  },
  renderEvents: function() {
    if (this.state.events) {
      return (
        <div className="Card">
          <div className="Card-title">Events</div>
          <div className="Card-content">
            {this.renderEventMiniTable()}
          </div>
        </div>
      )
    }
  },
  renderEventMiniTable: function() {
    if (this.state.events.length == 0) {
      return (
        <div className="Notice">No Events</div>
      )
    }
    var eventRows = this.state.events.map(function(event) {
      var eventHref = "/events/" + event.event_id + "/";
      return (
        <div className="MiniTable-row">
          <div className="MiniTable-rowItem u-flexGrow-1">
            <i className="fa fa-ticket MiniTableIcon"></i>
            <a href={eventHref} target="_blank">{event.name}</a>
          </div>
          <div className="MiniTable-rowItem u-flexGrow-1 u-flexEnd">
            {event.start_date}
          </div>
        </div>
      )
    });
    return (
      <div className="MiniTable">
        {eventRows}
      </div>
    )
  }
}
