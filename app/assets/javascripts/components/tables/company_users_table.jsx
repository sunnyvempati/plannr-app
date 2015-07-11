var CompanyUserTable = React.createClass({
  mixins: [
    TableCheckbox,
    ToastMessages,
    LoadingToast,
    FilterSort
  ],
  getInitialState: function() {
    return {
      users: []
    };
  },
  componentDidMount: function() {
    this.initializeFilterSort({sort: {sorted_by: 'first_name_asc'}});

  },
  getTableData: function(params) {
    HttpHelpers.getFromServer("/users.json", params, function(result) {
      this.setState({users: result.users});
    }.bind(this));
  },
  handleDelete: function(id) {
    var deletionIds = !!id ? [id] : this.state.checkedItems;
    var destroyOpts = {destroy_opts: {ids: deletionIds}};
    HttpHelpers.postToServer('/users/mass_delete', destroyOpts, function(success_result) {
      this.toast(deletionIds.length + " user(s) deleted successfully.");
      var newData = this.spliceResults(this.state.users, deletionIds);
      this.setState({users: newData, checkedItems: []});
    }.bind(this));
  },
  getCustomRows: function() {
    var hideCheckbox = this.state.checkedItems.length > 0 ? false : true;
    return this.state.users.map(function(user) {
      var checked = this.state.checkedItems.indexOf(user.id) > -1;
      return (
        <CompanyUserRow checked={checked}
                        data={user}
                        checkChanged={this.rowChanged}
                        hideCheckbox={hideCheckbox}
                        actionItems={this.actionItems()}
                        key={user.id} />
      );
    }.bind(this));
  },
  actionItems: function() {
    return [
      {name: "Delete", handler: this.handleDelete, massAction: true}
    ]
  },
  sortItems: function() {
    return [
      {entity: "first_name", display: "Name", default: true}
    ]
  },
  getColumns: function() {
    return [
      {name: "name", grow: 10, header: "Name"},
      {name: "phone", grow: 6, header: "Email"},
      {name: "email", grow: 4, header: "Admin"}
    ];
  },
  render: function() {
    return (
      <div className="CompanyUserTableContainer">
        <Table
          useCustomRowComponent={true}
          customRows={this.getCustomRows()}
          sortItems={this.sortItems()}
          handleSortClick={this.sort}
          handleSearch={this.search}
          showActions={this.state.checkedItems.length > 0}
          actionItems={this.actionItems()}
          extraPadding={true}
          showHeaders={true}
          columns={this.getColumns()}
          searchPlaceholder="Search Users..."
          handleCheckAllChanged={this.toggleCheckAll}
        />
      </div>
    );
  }
});
