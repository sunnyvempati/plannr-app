var EventContactsTable = React.createClass({
  mixins: [TableCheckbox],
  getColumns: function() {
    return [
      {name: "name", grow: 10, header: "Name"},
      {name: "phone", grow: 5, header: "Phone"},
      {name: "email", grow: 10, header: "Email"}
    ];
  },
  actionItems: function() {
    return [
      {name: "Remove from event", handler: this.removeAssociation}
    ]
  },
  sortItems: function() {
    return [
      {entity: "name", display: "Name", default: true},
      {entity: "email", display: "Email"}
    ]
  },
  removeAssociation: function() {
    var destroyOpts = {destroy_opts: {event_contact_ids: this.state.checkedItems}};
    $.post("contacts/mass_delete", destroyOpts, function(success_result) {
      var newData = this.spliceResults(this.props.data);
      this.props.onUpdatedData(newData);
    }.bind(this)).fail(function(error_result) {
      this.props.setServerMessage(error_result.responseJSON.message);
    }.bind(this));
  },
  sortBy: function(entity, order) {
    $.get('contacts.json', {sort: {entity: entity, order: order}}, function(result) {
      this.props.onUpdatedData(result.event_contacts);
    }.bind(this));
  },
  search: function(e) {
    var term = e.target.value;
    $.get('search_event_contacts', {search: {text: term || ""}}, function(result) {
      this.props.onUpdatedData(result.event_contacts);
    }.bind(this));
  },
  openContactModal: function(data) {
    var contact = {
      id: data.contact_id,
      email: data.email,
      name: data.name,
      phone: data.phone
    };
    var modal = React.createElement(ShowContactModal, {data: contact});
    React.render(modal, document.getElementById('modal'));
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
        searchPlaceholder="Search Contacts..."
        onClick={this.openContactModal}
      />
    );
  }
});
