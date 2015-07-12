var EventsTable = React.createClass({
  mixins: [
    TableCheckbox,
    ToastMessages,
    LoadingToast,
    FilterSort
  ],
  getInitialState: function() {
    return {
      events: []
    };
  },
  defaultFilterSortParams: {
    sort: {sorted_by: 'name_asc'}
  },
  componentDidMount: function() {
    this.initializeFilterSort(this.defaultFilterSortParams);
  },
  getTableData: function(params) {
    HttpHelpers.getFromServer("events.json", params, function(result) {
      if (this.isMounted()) {
        this.setState({events: result.events});
      }
    }.bind(this));
  },
  getCustomRows: function() {
    return this.state.events.map(function(event) {
      return(
        <EventRow
          event={event}
          checkedItems={this.state.checkedItems}
          actionItems={this.actionItems()}
          key={event.id}
        />
      );
    }, this);
  },
  sortItems: function() {
    return [
      {entity: "name", display: "Name", default: true},
      {entity: "start_date", display: "Start Date"}
    ]
  },
  filterItems: function () {
    return [
      {name: "All Events", handler: this.filter.bind(this, {}), default: true},
      {name: "Active Events", handler: this.filter.bind(this, {with_status: 1})},
      {name: "Archived Events", handler: this.filter.bind(this, {with_status: 2})}
    ]
  },
  handleDelete: function(id) {
    var deletionIds = !!id ? [id] : this.state.checkedItems;
    var destroyOpts = {destroy_opts: {ids: deletionIds}};
    HttpHelpers.postToServer("/destroy_events", destroyOpts, function(result) {
      this.setState({events: this.spliceResults(this.state.events, deletionIds), checkedItems: []});
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
          handleSortClick={this.sort}
          handleSearch={this.search}
          showActions={this.state.checkedItems.length > 0}
          actionItems={this.actionItems()}
          extraPadding={true}
          filterable={true}
          filterItems={this.filterItems()}
          searchPlaceholder="Search Events..."
          actionButton={this.getActionButton()}
          handleCheckAllChanged={this.toggleCheckAll}
        />
      </div>
    );
  }
});
