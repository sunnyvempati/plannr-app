var EventVendorsTable = React.createClass({
  mixins: [TableCheckbox],
  getInitialState: function() {
    return {
      eventVendors: []
    };
  },
  componentDidMount: function() {
    this.getEventVendors();
  },
  getEventVendors: function() {
    $.get("vendors", function(results) {
      if (this.isMounted()) {
        this.setState({
          eventVendors: results.event_vendors
        })
      }
    }.bind(this))
  },
  getColumns: function() {
    return [
      {name: "name", grow: 10, header: "Name"},
      {name: "phone", grow: 5, header: "Phone"},
      {name: "location", grow: 10, header: "Location"}
    ];
  },
  actionItems: function() {
    return [
      {name: "Remove", handler: this.removeAssociation, massAction: true}
    ]
  },
  sortItems: function() {
    return [
      {entity: "name", display: "Name", default: true}
    ]
  },
  removeAssociation: function(id) {
    var deletionIds = !!id ? [id] : this.state.checkedItems;
    var destroyOpts = {destroy_opts: {ids: deletionIds}};
    $.post("vendors/mass_delete",destroyOpts, function(success_result) {
      var newData = this.spliceResults(this.state.eventVendors, deletionIds);
      this.setState({eventVendors: newData, checkedItems: []});
    }.bind(this)).fail(function(error_result) {
      this.props.setServerMessage(error_result.responseJSON.message);
    }.bind(this));
  },
  sortBy: function(entity, order) {
    $.get('vendors.json', {sort: {entity: entity, order: order}}, function(result) {
      this.setState({eventVendors: result.event_vendors});
    }.bind(this));
  },
  search: function(e) {
    var term = e.target.value;
    $.get('search_event_vendors', {search: {text: term || ""}}, function(result) {
      this.setState({eventVendors: result.event_vendors});
    }.bind(this));
  },
  openVendorModal: function(data) {
    var vendor = {
      id: data.vendor_id,
      name: data.name
    };
    var modal = React.createElement(ShowVendorModal, {data: vendor});
    React.render(modal, document.getElementById('modal'));
  },
  openAddModal: function() {
    var modal = React.createElement(AddVendorModal, {refreshData: this.getEventVendors});
    React.render(modal, document.getElementById('modal'));
  },
  render: function() {
    return (
      <Table
        results={this.state.eventVendors}
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
        onClick={this.openVendorModal}
        actionButtonText="Add Vendor"
        actionButtonClick={this.openAddModal}
        actionButtonSVGClass="createVendor"
      />
    );
  }
});
