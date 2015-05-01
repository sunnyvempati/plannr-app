var EventsTable = React.createClass({
  getColumns: function() {
    return [
      {name: "name", header: "Name", grow: 3},
      {name: "start_date", header: "Start Date", grow: 1},
      {name: "end_date", header: "End Date", grow: 1},
      {name: "location", header: "Location", grow: 1},
      {name: "budget", header: "Budget", grow: 1}
    ];
  },
  goToEvent: function(id) {
    location.href = "/events/" + id + "/";
  },
  getCustomRows: function() {
    return this.props.data.map(function(event) {
      return(
        <div className="Table-row u-clickable" onClick={this.goToEvent.bind(this, event.id)}>
          <div className="Table-rowItem u-flexGrow-3">
            {event.name}
          </div>
          <div className="Table-rowItem u-flexGrow-1">
            {event.start_date}
          </div>
          <div className="Table-rowItem u-flexGrow-1">
            {event.end_date}
          </div>
          <div className="Table-rowItem u-flexGrow-1">
            {event.location}
          </div>
          <div className="Table-rowItem u-flexGrow-1">
            {event.budget}
          </div>
        </div>
      );
    }, this);
  },
  render: function() {
    return (
      <div className="EventsTable">
        <Table
          results={this.props.data}
          columns={this.getColumns()}
          useCustomRowComponent={true}
          customRows={this.getCustomRows()}
        />
      </div>
    );
  }
});
