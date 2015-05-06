var EventsTable = React.createClass({
  getInitialState: function() {
    return {
      events: []
    };
  },
  componentDidMount: function() {
    this.getEvents();
  },
  getEvents: function() {
    $.get("events.json", function(result) {
      this.setState({events: result.events});
    }.bind(this));
  },
  goToEvent: function(id) {
    location.href = "/events/" + id + "/";
  },
  checkboxChanged: function() {
    console.log("changed");
  },
  getCustomRows: function() {
    return this.state.events.map(function(event) {
      return(
        <div className="EventsTable-row" key={event.id}>
          <div className="EventsTable-rowHeader">
            <div className="EventsTable-checkbox">
              <CheckboxInput onChange={this.checkboxChanged} value={event.id} />
            </div>
            <div className="EventsTable-rowName u-clickable" onClick={this.goToEvent.bind(this, event.id)}>
              {event.name}
            </div>
            <div className="EventsTable-rowDaysTill">
              {event.days_till + " days left"}
            </div>
          </div>
          <div className="EventsTable-rowContent">
            <Event model={event} client={event.client} editable={false} />
          </div>
        </div>
      );
    }, this);
  },
  search: function(e) {
    var term = e.target.value;
    $.get('search_events', {search: {text: term || ""}}, function(result) {
      this.setState({events: result.events});
    }.bind(this));
  },
  render: function() {
    return (
      <div className="EventsTableContainer">
        <div className="EventsTable-actions">
          <div className="Actions-search">
            <i className="fa fa-search u-dim"></i>
            <div className="Actions-searchInput">
              <input placeholder="Search events.."
                     className="SearchInput"
                     onChange={this.search} />
            </div>
          </div>
        </div>
        <Table
          results={this.props.data}
          showHeaders={false}
          useCustomRowComponent={true}
          customRows={this.getCustomRows()}
        />
      </div>
    );
  }
});
