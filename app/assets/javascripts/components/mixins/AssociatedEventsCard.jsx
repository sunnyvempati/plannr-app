export default {
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
    let events = this.state.events;
    if (!events.length) {
      return (
        <div className="Notice">No Events</div>
      )
    }
    var eventRows = events.map(function(event) {
      var eventHref = "/#/events/" + event.id + "/"; // to do
      return (
        <div className="MiniTable-row" key={event.id}>
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
