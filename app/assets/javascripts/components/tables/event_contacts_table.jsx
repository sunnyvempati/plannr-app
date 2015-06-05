var EventContactsTable = React.createClass({
  mixins: [TableCheckbox, Router.Navigation],
  getInitialState: function() {
    return {
      eventContacts: []
    };
  },
  componentDidMount: function() {
    $.get("contacts", function(results) {
      if (this.isMounted()) {
        this.setState({
          eventContacts: results.event_contacts
        })
      }
    }.bind(this))
  },
  getColumns: function() {
    return [
      {name: "name", grow: 10, header: "Name"},
      {name: "phone", grow: 5, header: "Phone"},
      {name: "email", grow: 10, header: "Email"}
    ];
  },
  actionItems: function() {
    return [
      {name: "Remove", handler: this.removeAssociation, massAction: true}
    ]
  },
  sortItems: function() {
    return [
      {entity: "name", display: "Name", default: true},
      {entity: "email", display: "Email"}
    ]
  },
  removeAssociation: function(id) {
    var deletionIds = !!id ? [id] : this.state.checkedItems;
    var destroyOpts = {destroy_opts: {ids: deletionIds}};
    $.post("contacts/mass_delete", destroyOpts, function(success_result) {
      var newData = this.spliceResults(this.state.eventContacts, deletionIds);
      this.setState({eventContacts: newData});
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
  goToContact: function(data) {
    var contact = {
      id: data.contact_id,
      name: data.name
    };
    var modal = React.createElement(ShowContactModal, {data: contact});
    React.render(modal, document.getElementById('modal'));
  },
  render: function() {
    return (
      <Table
        results={this.state.eventContacts}
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
        searchPlaceholder="Search Contacts..."
        onClick={this.goToContact}
      />
    );
  }
});
