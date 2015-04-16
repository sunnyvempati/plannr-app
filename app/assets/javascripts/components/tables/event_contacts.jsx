var EventContactsTable = React.createClass({
  mixins: [TableCheckbox],
  getColumns: function() {
    return [
      {name: "id", header: "", grow: 1},
      {name: "name", header: "Name", grow: 3},
      {name: "email", header: "Email", grow: 3}
    ];
  },
  getCustomRows: function() {
    return this.props.data.map(function(event_contact) {
      var checked = this.state.checkedItems.indexOf(event_contact.id) > -1;
      return(
        <EventContactRow checkboxChanged={this.rowChanged} data={event_contact} checked={checked} />
      );
    }, this);
  },
  buttonList: function() {
    var disabled = this.state.checkedItems.length == 0;
    return(
      <Button onClick={this.DeleteContactClick} disabled={disabled}>Remove Contact</Button>
    );
  },
  DeleteContactClick: function() {
    var destroyOpts = {destroy_opts: {event_contact_ids: this.state.checkedItems}};
    $.post("contacts/mass_delete",destroyOpts, function(success_result) {
      var newData = this.spliceResults();
      this.props.onUpdatedData(newData);
    }.bind(this)).fail(function(error_result) {
      this.props.setServerMessage(error_result.responseJSON.message);
    }.bind(this));
  },
  render: function() {
    return (
      <div className="EventContactsTableContainer">
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
