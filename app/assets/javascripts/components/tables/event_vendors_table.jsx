var EventVendorsTable = React.createClass({
  mixins: [TableCheckbox],
  getColumns: function() {
    return [
      {name: "id", header: "", grow: 1},
      {name: "name", header: "Name", grow: 3}
    ];
  },
  getCustomRows: function() {
    return this.props.data.map(function(event_vendor) {
      var checked = this.state.checkedItems.indexOf(event_vendor.id) > -1;
      return(
        <EventVendorRow checkboxChanged={this.rowChanged} data={event_vendor} checked={checked} />
      );
    }, this);
  },
  buttonList: function() {
    var disabled = this.state.checkedItems.length == 0;
    return(
      <Button onClick={this.DeleteVendorClick} disabled={disabled}>Remove Vendor</Button>
    );
  },
  DeleteVendorClick: function() {
    var destroyOpts = {destroy_opts: {event_vendor_ids: this.state.checkedItems}};
    $.post("vendors/mass_delete",destroyOpts, function(success_result) {
      var newData = this.spliceResults();
      this.props.onUpdatedData(newData);
    }.bind(this)).fail(function(error_result) {
      this.props.setServerMessage(error_result.responseJSON.message);
    }.bind(this));
  },
  render: function() {
    return (
      <div className="EventVendorsTableContainer">
        <Table
          results={this.props.data}
          columns={this.getColumns()}
          useCustomRowComponent={true}
          buttonList={this.buttonList()}
          customRows={this.getCustomRows()}
        />
      </div>
    );
  }
});


