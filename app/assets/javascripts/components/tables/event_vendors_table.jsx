var EventVendorsTable = React.createClass({
  mixins: [
    TableCheckbox,
    ToastMessages,
    LoadingToast,
    FilterSort
  ],
  getInitialState: function() {
    return {
      eventVendors: []
    };
  },
  componentDidMount: function() {
    var defaultParams = {
      sort: {sorted_by: 'vendor_name_asc'},
      filter: {with_event_id: this.props.eventId}
    }
    this.initializeFilterSort(defaultParams);
  },
  getTableData: function(params) {
    HttpHelpers.getFromServer("/event_vendors.json", params, function(results) {
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
      {entity: "vendor_name", display: "Name", default: true}
    ]
  },
  removeAssociation: function(id) {
    var deletionIds = !!id ? [id] : this.state.checkedItems;
    var destroyOpts = {destroy_opts: {ids: deletionIds}};
    HttpHelpers.postToServer("vendors/mass_delete",destroyOpts, function(success_result) {
      this.toast(deletionIds.length + " vendor(s) removed from event.");
      var newData = this.spliceResults(this.state.eventVendors, deletionIds);
      this.setState({eventVendors: newData, checkedItems: []});
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
    var params = {
      refreshData: this.reloadData,
      eventId: this.props.eventId
    };
    var modal = React.createElement(AddVendorModal, params);
    React.render(modal, document.getElementById('modal'));
  },
  getActionButton: function () {
    return (
      <ActionButton handleClick={this.openAddModal}
                    svgClass='createVendor'
                    extraPad={false} />
    );
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
        handleSortClick={this.sort}
        handleSearch={this.search}
        showActions={this.state.checkedItems.length > 0}
        actionItems={this.actionItems()}
        extraPadding={false}
        tableDataClassName="scrollable"
        searchPlaceholder="Search Vendors..."
        onClick={this.openVendorModal}
        actionButton={this.getActionButton()}
        handleCheckAllChanged={this.toggleCheckAll}
      />
    );
  }
});
