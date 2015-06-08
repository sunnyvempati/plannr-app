var VendorsTable = React.createClass({
  mixins: [TableCheckbox, Router.Navigation],
  getInitialState: function() {
    return {
      vendors: []
    };
  },
  componentDidMount: function() {
    $.get("/vendors.json", function(result) {
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
    $.post('/vendors/mass_delete', destroyOpts, function(success_result) {
      var newData = this.spliceResults(this.state.vendors, deletionIds);
      this.setState({vendors: newData, checkedItems: []});
    }.bind(this)).fail(function(error_result) {
      this.props.setServerMessage(error_result.responseJSON.message);
    }.bind(this));
  },
  sortBy: function(entity, order) {
    $.get('/vendors.json', {sort: {entity: entity, order: order}}, function(result) {
      this.setState({vendors: result.vendors});
    }.bind(this));
  },
  search: function(e) {
    var term = e.target.value;
    $.get('/search_vendors', {search: {text: term || ""}}, function(result) {
      this.setState({vendors: result.vendors});
    }.bind(this));
  },
  goToVendor: function(data) {
    this.transitionTo('vendor', {id: data.id});
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
        handleSortClick={this.sortBy}
        handleSearch={this.search}
        showActions={this.state.checkedItems.length > 0}
        actionItems={this.actionItems()}
        extraPadding={true}
        searchPlaceholder="Search Vendors..."
        onClick={this.goToVendor}
        actionButton={this.getActionButton()}/>
    );
  }
});
