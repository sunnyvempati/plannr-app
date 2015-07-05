var EventsTable = React.createClass({
  mixins: [
    TableCheckbox,
    ToastMessages,
    LoadingToast,
    HttpHelpers
  ],
  getInitialState: function() {
    return {
      events: []
    };
  },
  componentDidMount: function() {
    this.getEvents();
  },
  getEvents: function() {
    this.getFromServer("events.json", {}, function(result) {
      this.setState({events: result.events});
    }.bind(this));
  },
  goToEvent: function(id) {
    location.href = "/events/" + id + "/";
  },
  getCustomRows: function() {
    var hideCheckbox = this.state.checkedItems.length > 0 ? false : true;
    return this.state.events.map(function(event) {
      var checked = this.state.checkedItems.indexOf(event.id) > -1;
      var daysTill = !!event.days_till ? event.days_till + " days left" : "";
      return(
        <div className="EventsTable-row" key={event.id}>
          <div className="EventsTable-rowHeader">
            <div className="EventsTable-rowName">
              <div className="EventsTable-checkbox">
                <CheckboxInput onChange={this.rowChanged} value={event.id} checked={checked} hideCheckbox={hideCheckbox} />
              </div>
              <div className="EventsTable-name u-clickable" onClick={this.goToEvent.bind(this, event.id)}>
                {event.name}
              </div>
            </div>
            <div className="EventsTable-rowDaysTill">
              {daysTill}
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
    this.getFromServer('search_events', {search: {text: term || ""}}, function(result) {
      this.setState({events: result.events});
    }.bind(this));
  },
  // entity to sort by
  // asc is a boolean value giving us the order
  sortBy: function(entity, order) {
    this.getFromServer('events.json', {sort: {entity: entity, order: order}}, function(result) {
      this.setState({events: result.events});
    }.bind(this));
  },
  sortItems: function() {
    return [
      {entity: "name", display: "Name", default: true},
      {entity: "start_date", display: "Start Date"}
    ]
  },
  handleDelete: function(id) {
    var deletionIds = !!id ? [id] : this.state.checkedItems;
    var destroyOpts = {destroy_opts: {ids: deletionIds}};
    this.postToServer("/destroy_events", destroyOpts, function(result) {
      this.setState({events: this.spliceResults(this.state.events, this.state.checkedItems), checkedItems: []});
      this.toast(deletionIds.length + " events deleted successfully.");
    }.bind(this));
  },
  actionItems: function() {
    return [
      {name: "Delete", handler: this.handleDelete, massAction: true}
    ]
  },
  handleActionButtonClick: function() {
    location.href = "/events/new";
  },
  getActionButton: function () {
    return (
        <ActionButton handleClick={this.handleActionButtonClick}
                      label='Create Event'
                      svgClass='createEvent'
                      extraPad={true} />
    );
  },
  render: function() {
    return (
      <div className="EventsTableContainer">
        <Table
          useCustomRowComponent={true}
          customRows={this.getCustomRows()}
          sortItems={this.sortItems()}
          handleSortClick={this.sortBy}
          handleSearch={this.search}
          showActions={this.state.checkedItems.length > 0}
          actionItems={this.actionItems()}
          extraPadding={true}
          searchPlaceholder="Search Events..."
          actionButton={this.getActionButton()}
          handleCheckAllChanged={this.toggleCheckAll}
        />
      </div>
    );
  }
});
