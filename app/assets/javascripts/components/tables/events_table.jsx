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
  sortEntities: function() {
    return [
      {entity: "name", display: "Name"},
      {entity: "start_date", display: "Start Date"}
    ]
  },
  deleteEvents: function() {
    var destroyOpts = {destroy_opts: {ids: this.state.checkedItems}};
    $.post("/destroy_events", destroyOpts, function(result) {
      this.setState({events: this.spliceResults(this.state.events), checkedItems: []});
    }.bind(this));
  },
  render: function() {
    return (
      <div className="EventsTableContainer">
        <div className="EventsTable-actions">
          <div className="Actions-icons">
            <div className="Actions-search">
              <i className="fa fa-search tableIcon u-clickable"></i>
              <input placeholder="Search events.."
                     className="SearchInput"
                     onChange={this.search} />
            </div>
            <div className="Actions-sort">
              <SortMenu entities={this.sortEntities()}
                        sort={this.sortBy}
                        defaultEntity="name" />
            </div>
            <div>
              <i className="fa fa-tag tableIcon"></i>
            </div>
            <div>
              <i className="fa fa-folder tableIcon"></i>
            </div>
            <div onClick={this.deleteEvents}>
              <i className="fa fa-trash tableIcon u-clickable"></i>
            </div>
          </div>
          <div className="EventsTable-createEvent">
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
