var EventContactsTable = React.createClass({
  getInitialState: function() {
    return {
      checkedItems: []
    };
  },
  componentWillReceiveProps: function() {
    this.setState({checkedItems: []});
  },
  getColumns: function() {
    return [
      {name: "id", header: "", grow: 1},
      {name: "name", header: "Name", grow: 3},
      {name: "email", header: "Email", grow: 3}
    ];
  },
  rowChanged: function(e) {
    var checkedItems = this.state.checkedItems;
    if (e.target.checked) {
      checkedItems.push(e.target.value);
    }
    else {
      index = checkedItems.indexOf(e.target.value);
      checkedItems.splice(index, 1);
    }
    this.setState({
      checkedItems: checkedItems
    });
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
  spliceResults: function() {
    var deletedItems = this.state.checkedItems;
    return $.map(this.props.data, function(item, index) {
      if (deletedItems.indexOf(item.id) === -1) {
        return item;
      }
    });
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


