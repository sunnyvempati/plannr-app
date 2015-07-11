var EventContactsTable = React.createClass({
  mixins: [
    TableCheckbox,
    ToastMessages,
    LoadingToast,
    FilterSort
  ],
  getInitialState: function() {
    return {
      eventContacts: []
    };
  },
  componentDidMount: function() {
    var defaultParams = {
      sort: {sorted_by: 'contact_name_asc'},
      filter: {with_event_id: this.props.eventId}
    };
    this.initializeFilterSort(defaultParams);
  },
  getTableData: function(params) {
    HttpHelpers.getFromServer("/event_contacts.json", params, function(results) {
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
      {entity: "contact_name", display: "Name", default: true},
      {entity: "email", display: "Email"}
    ]
  },
  removeAssociation: function(id) {
    var deletionIds = !!id ? [id] : this.state.checkedItems;
    var destroyOpts = {destroy_opts: {ids: deletionIds}};
    HttpHelpers.postToServer("contacts/mass_delete", destroyOpts, function(success_result) {
      this.toast(deletionIds.length + " contact(s) removed from event.");
      var newData = this.spliceResults(this.state.eventContacts, deletionIds);
      this.setState({eventContacts: newData, checkedItems: []});
    }.bind(this));
  },
  openContactModal: function(data) {
    var contact = {
      id: data.contact_id,
      name: data.name
    };
    var modal = React.createElement(ShowContactModal, {data: contact});
    React.render(modal, document.getElementById('modal'));
  },
  openAddModal: function() {
    var params = {
      refreshData: this.reloadData,
      eventId: this.props.eventId
    };
    var modal = React.createElement(AddContactModal, params);
    React.render(modal, document.getElementById('modal'));
  },
  getActionButton: function () {
    return (
      <ActionButton handleClick={this.openAddModal}
                    svgClass='createContact'
                    extraPad={false} />
    );
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
        handleSortClick={this.sort}
        handleSearch={this.search}
        showActions={this.state.checkedItems.length > 0}
        actionItems={this.actionItems()}
        extraPadding={false}
        tableDataClassName="scrollable"
        searchPlaceholder="Search Contacts..."
        onClick={this.openContactModal}
        actionButton={this.getActionButton()}
        handleCheckAllChanged={this.toggleCheckAll}
      />
    );
  }
});
