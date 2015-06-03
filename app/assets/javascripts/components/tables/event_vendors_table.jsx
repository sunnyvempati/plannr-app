var EventVendorsTable = React.createClass({
  mixins: [TableCheckbox],
  getColumns: function() {
    return [
      {name: "name", grow: 10, header: "Name"},
      {name: "phone", grow: 5, header: "Phone"},
      {name: "location", grow: 10, header: "Location"}
    ];
  },
  actionItems: function() {
    return [
      {name: "Remove from event", handler: this.removeAssociation}
    ]
  },
  sortItems: function() {
    return [
      {entity: "name", display: "Name", default: true}
    ]
  },
  removeAssociation: function() {
    var destroyOpts = {destroy_opts: {event_vendor_ids: this.state.checkedItems}};
    $.post("vendors/mass_delete",destroyOpts, function(success_result) {
      var newData = this.spliceResults(this.props.data);
      this.props.onUpdatedData(newData);
    }.bind(this)).fail(function(error_result) {
      this.props.setServerMessage(error_result.responseJSON.message);
    }.bind(this));
  },
  sortBy: function(entity, order) {
    $.get('vendors.json', {sort: {entity: entity, order: order}}, function(result) {
      this.props.onUpdatedData(result.event_vendors);
    }.bind(this));
  },
  search: function(e) {
    var term = e.target.value;
    $.get('search_event_vendors', {search: {text: term || ""}}, function(result) {
      this.props.onUpdatedData(result.event_vendors);
    }.bind(this));
  },
  render: function() {
    return (
      <Table
        results={this.props.data}
        columns={this.getColumns()}
        useCustomRowComponent={false}
        showHeaders={true}
        checkedItems={this.state.checkedItems}
        rowChanged={this.rowChanged}
        sortItems={this.sortItems()}
        handleSortClick={this.sortBy}
        handleSearch={this.search}
        showActions={this.state.checkedItems.length > 0}
        actionItems={this.actionItems()}
        extraPadding={false}
        tableDataClassName="scrollable"
        searchPlaceholder="Search Vendors..."
      />
    );
  }
});
