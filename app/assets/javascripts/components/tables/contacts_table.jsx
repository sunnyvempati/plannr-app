var ContactsTable = React.createClass({
  mixins: [
    TableCheckbox,
    ToastMessages,
    Router.Navigation,
    LoadingToast,
    FilterSort
  ],
  getInitialState: function() {
    return {
      contacts: []
    };
  },
  componentDidMount: function() {
    this.initializeFilterSort({sort: {sorted_by: 'name_asc'}});
  },
  getTableData: function(params) {
    HttpHelpers.getFromServer("/contacts.json", params, function(result) {
      this.setState({contacts: result.contacts});
    }.bind(this));
  },
  getColumns: function() {
    return [
      {name: "name", grow: 10, header: "Name"},
      {name: "email", grow: 10, header: "Email"},
      {name: "phone", grow: 5, header: "Phone"},
      {name: "company", grow: 10, header: "Company"},
      {name: "type", grow: 5, header: "Type"}
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
    location.href = "/contacts/"+id+"/edit";
  },
  handleDelete: function(id) {
    var deletionIds = !!id ? [id] : this.state.checkedItems;
    var destroyOpts = {destroy_opts: {ids: deletionIds}};
    HttpHelpers.postToServer('/contacts/mass_delete', destroyOpts, function(success_result) {
      this.toast(deletionIds.length + " contact(s) deleted.");
      var newData = this.spliceResults(this.state.contacts, deletionIds);
      this.setState({contacts: newData, checkedItems: []});
    }.bind(this));
  },
  goToContact: function(data) {
    this.transitionTo('contact', {id: data.id, currentUser: this.props.currentUser});
  },
  handleActionButtonClick: function() {
    location.href = "/contacts/new";
  },
  getActionButton: function () {
    return (
      <ActionButton handleClick={this.handleActionButtonClick}
                    label='Add Contact'
                    svgClass='createContact'
                    extraPad={false} />
    );
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
        handleSortClick={this.sort}
        handleSearch={this.search}
        showActions={this.state.checkedItems.length > 0}
        actionItems={this.actionItems()}
        extraPadding={true}
        showHeaders={true}
        searchPlaceholder="Search Contacts..."
        onClick={this.goToContact}
        actionButton={this.getActionButton()}
        handleCheckAllChanged={this.toggleCheckAll}
      />
    );
  }
});
