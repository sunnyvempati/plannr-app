var EventsTable = React.createClass({
  getInitialState: function() {
    return {
      events: []
    };
  },
  componentDidMount: function() {
    this.getEvents();
  },
  getColumns: function() {
    return [
      {name: "name", header: "Name", grow: 3},
      {name: "start_date", header: "Start Date", grow: 1},
      {name: "end_date", header: "End Date", grow: 1},
      {name: "location", header: "Location", grow: 1},
      {name: "budget", header: "Budget", grow: 1}
    ];
  },
  getEvents: function() {
    $.get("events.json", function(result) {
      console.log(result.events);
      this.setState({events: result.events});
    }.bind(this));
  },
  goToEvent: function(id) {
    location.href = "/events/" + id + "/";
  },
  getCustomRows: function() {
    return this.state.events.map(function(event) {
      return(
        <div className="Table-row u-clickable" onClick={this.goToEvent.bind(this, event.id)}>
          <Event model={event} client={event.client} />
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
