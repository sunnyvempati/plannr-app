var ContactsTable = React.createClass({
  mixins: [TableCheckbox],
  getInitialState: function() {
    return {
      contacts: []
    };
  },
  componentDidMount: function() {
    $.get("contacts.json", function(result) {
      this.setState({contacts: result.contacts});
    }.bind(this));
  },
  getColumns: function() {
    return [
      {name: "name", grow: 10},
      {name: "email", grow: 10},
      {name: "phone", grow: 5},
      {name: "organization", grow: 10},
      {name: "type", grow: 5}
    ];
  },
  actionItems: function() {
    return [
      {name: "Delete", handler: this.deleteContacts}
    ]
  },
  sortItems: function() {
    return [
      {entity: "name", display: "Name", default: true}
    ]
  },
  deleteContacts: function() {
    var destroyOpts = {destroy_opts: {ids: this.state.checkedItems}};
    $.post('contacts/mass_delete', destroyOpts, function(success_result) {
      var newData = this.spliceResults(this.state.contacts);
      this.setState({contacts: newData, checkedItems: []});
    }.bind(this)).fail(function(error_result) {
      this.props.setServerMessage(error_result.responseJSON.message);
    }.bind(this));
  },
  sortBy: function(entity, order) {
    $.get('contacts.json', {sort: {entity: entity, order: order}}, function(result) {
      this.setState({contacts: result.contacts});
    }.bind(this));
  },
  search: function(e) {
    var term = e.target.value;
    $.get('search_contacts', {search: {text: term || ""}}, function(result) {
      this.setState({contacts: result.contacts});
    }.bind(this));
  },
  render: function() {
    return (
      <Table
        results={this.state.contacts}
        columns={this.getColumns()}
        useCustomRowComponent={false}
        checkedItems={this.state.checkedItems}
        rowChanged={this.rowChanged}
        sortItems={this.sortItems()}
        handleSortClick={this.sortBy}
        handleSearch={this.search}
        showActions={this.state.checkedItems.length > 0}
        actionItems={this.actionItems()}
        extraPadding={true}
        searchPlaceholder="Search Contacts..."
      />
    );
  }
});

