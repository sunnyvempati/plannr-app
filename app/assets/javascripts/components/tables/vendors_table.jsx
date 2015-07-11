var VendorsTable = React.createClass({
  mixins: [
    TableCheckbox,
    ToastMessages,
    Router.Navigation,
    LoadingToast,
    FilterSort
  ],
  getInitialState: function() {
    return {
      vendors: []
    };
  },
  componentDidMount: function() {
    this.initializeFilterSort({sort: {sorted_by: 'name_asc'}});
  },
  getTableData: function(params) {
    HttpHelpers.getFromServer("/vendors.json", params, function(result) {
      this.setState({vendors: result.vendors});
    }.bind(this));
  },
  getColumns: function() {
    return [
      {name: "name", grow: 10, header: "Name"},
      {name: "location", grow: 10, header: "Location"},
      {name: "phone", grow: 5, header: "Phone"},
    ];
  },
  actionItems: function() {
    return [
      // global means the action is available as a mass action
      {name: "Edit", handler: this.handleEdit, massAction: false},
      {name: "Delete", handler: this.handleDelete, massAction: true}
    ]
  },
  sortItems: function() {
    return [
      {entity: "name", display: "Name", default: true}
    ]
  },
  handleEdit: function(id) {
    location.href = "/vendors/"+id+"/edit";
  },
  handleDelete: function(id) {
    var deletionIds = !!id ? [id] : this.state.checkedItems;
    var destroyOpts = {destroy_opts: {ids: deletionIds}};
    HttpHelpers.postToServer('/vendors/mass_delete', destroyOpts, function(success_result) {
      this.toast(deletionIds.length + " vendor(s) deleted.");
      var newData = this.spliceResults(this.state.vendors, deletionIds);
      this.setState({vendors: newData, checkedItems: []});
    }.bind(this));
  },
  goToVendor: function(data) {
    this.transitionTo('vendor', {id: data.id, currentUser: this.props.currentUser});
  },
  handleActionButtonClick: function() {
    location.href = "/vendors/new";
  },
  getActionButton: function () {
    return (
      <ActionButton handleClick={this.handleActionButtonClick}
                    label='Add Vendor'
                    svgClass='createVendor'
                    extraPad={false} />
    );
  },
  render: function() {
    return (
      <Table
        results={this.state.vendors}
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
        extraPadding={true}
        searchPlaceholder="Search Vendors..."
        onClick={this.goToVendor}
        actionButton={this.getActionButton()}
        handleCheckAllChanged={this.toggleCheckAll}
      />
    );
  }
});
