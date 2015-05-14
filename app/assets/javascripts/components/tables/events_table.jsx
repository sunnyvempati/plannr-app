var EventsTable = React.createClass({
  mixins: [TableCheckbox],
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
  getCustomRows: function() {
    return this.state.events.map(function(event) {
      var checked = this.state.checkedItems.indexOf(event.id) > -1;
      return(
        <div className="EventsTable-row" key={event.id}>
          <div className="EventsTable-rowHeader">
            <div className="EventsTable-rowName">
              <div className="EventsTable-checkbox">
                <CheckboxInput onChange={this.rowChanged} value={event.id} checked={checked} />
              </div>
              <div className="EventsTable-name u-clickable" onClick={this.goToEvent.bind(this, event.id)}>
                {event.name}
              </div>
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
  // entity to sort by
  // asc is a boolean value giving us the order
  sortBy: function(entity, order) {
    $.get('events.json', {sort: {entity: entity, order: order}}, function(result) {
      this.setState({events: result.events});
    }.bind(this));
  },
  sortItems: function() {
    return [
      {entity: "name", display: "Name", default: true},
      {entity: "start_date", display: "Start Date"}
    ]
  },
  deleteEvents: function() {
    var destroyOpts = {destroy_opts: {ids: this.state.checkedItems}};
    $.post("/destroy_events", destroyOpts, function(result) {
      this.setState({events: this.spliceResults(this.state.events), checkedItems: []});
    }.bind(this));
  },
  actionItems: function() {
    return [
      {name: "Delete", handler: this.deleteEvents}
    ]
  },
  render: function() {
    return (
      <div className="EventsTableContainer">
        <Table
          results={this.props.data}
          showHeaders={false}
          useCustomRowComponent={true}
          customRows={this.getCustomRows()}
          sortItems={this.sortItems()}
          handleSortClick={this.sortBy}
          handleSearch={this.search}
          showActions={true}
          actionItems={this.actionItems()}
          extraPadding={true}
        />
      </div>
    );
  }
});
