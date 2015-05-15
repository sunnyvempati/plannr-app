var CompanyUserTable = React.createClass({
  mixins: [TableCheckbox],
  getInitialState: function() {
    return {
      users: []
    };
  },
  componentDidMount: function() {
    $.get("/users", function(result) {
      this.setState({users: result.users});
    }.bind(this));
  },
  deleteUsers: function() {
    var destroyOpts = {destroy_opts: {ids: this.state.checkedItems}};
    $.post('/users/mass_delete', destroyOpts, function(success_result) {
      this.setState({users: this.spliceResults(this.state.users), checkedItems: []});
    }.bind(this)).fail(function(error_result) {
      this.props.setServerMessage(error_result.responseJSON.message);
    }.bind(this));
  },
  getCustomRows: function() {
    var hideCheckbox = this.state.checkedItems.length > 0 ? false : true;
    return this.state.users.map(function(user) {
      var checked = this.state.checkedItems.indexOf(user.id) > -1;
      return(
        <CompanyUserRow checked={checked} data={user} checkChanged={this.rowChanged} hideCheckbox={hideCheckbox} />
      );
    }.bind(this));
  },
  search: function(e) {
    var term = e.target.value;
    $.get('search_users', {search: {text: term || ""}}, function(result) {
      this.setState({users: result.users});
    }.bind(this));
  },
  sortBy: function(entity, order) {
    $.get('users.json', {sort: {entity: entity, order: order}}, function(result) {
      this.setState({users: result.users});
    }.bind(this));
  },
  actionItems: function() {
    return [
      {name: "Delete", handler: this.deleteUsers}
    ]
  },
  sortItems: function() {
    return [
      {entity: "first_name", display: "Name", default: true}
    ]
  },
  render: function() {
    return (
      <div className="CompanyUserTableContainer">
        <Table
          useCustomRowComponent={true}
          customRows={this.getCustomRows()}
          sortItems={this.sortItems()}
          handleSortClick={this.sortBy}
          handleSearch={this.search}
          showActions={this.state.checkedItems.length > 0}
          actionItems={this.actionItems()}
          extraPadding={true}
          searchPlaceholder="Search Users..."
        />
      </div>
    );
  }
});
