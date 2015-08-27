import TableCheckbox from '../mixins/TableCheckbox';
import FilterSort from '../mixins/FilterSort';
import InfiniteScrollMixin from '../mixins/InfiniteScrollMixin';
import UserActions from '../../actions/UserActions';
import UserStore from '../../stores/UserStore';
import Table from '../generic/Table';
import CompanyUserRow from './CompanyUserRow';

var CompanyUserList = React.createClass({
  mixins: [
    TableCheckbox,
    FilterSort,
    InfiniteScrollMixin
  ],
  defaultFilterSortParams: function() {
    return {
      sort: {sorted_by: 'first_name_asc'}
    };
  },
  componentDidMount() {
    UserStore.addChangeListener(this._onViewUsersChange);
  },
  componentDidUpdate: function() {
    if (!UserStore.usersLoaded || this.nextPage == 1) this.attachScrollListener();
  },
  componentWillUnmount() {
    UserStore.removeChangeListener(this._onViewUsersChange);
  },
  _onViewUsersChange() {
    this.setState({data: UserStore.viewUsers});
  },
  fetchNextPage: function(nextPage) {
    this.page = nextPage;
    let params = this.mergeParams();
    if (UserStore.isCached(params)) {
      // This is dangerous because we're manipulating the Store
      // BUT!
      // We're using ViewStore as a helper to manage our viewed items.
      UserStore.addCachedUsersToView(params);
      this.setState({data: UserStore.viewUsers});
    } else UserActions.getUsers(params);
  },
  handleDelete: function(id) {
    var deletionIds = !!id ? [id] : this.state.checkedItems;
    UserActions.deleteUsers(deletionIds);
    this.setState({checkedItems: []});
  },
  handleUpdate(id, params) {
    UserActions.update(id, params);
  },
  getCustomRows: function() {
    var hideCheckbox = this.state.checkedItems.length > 0 ? false : true;
    return this.state.data.map(function(user) {
      var checked = this.state.checkedItems.indexOf(user.id) > -1;
      return (
        <CompanyUserRow checked={checked}
                        data={user}
                        checkChanged={this.rowChanged}
                        hideCheckbox={hideCheckbox}
                        actionItems={this.actionItems()}
                        handleUpdate={this.handleUpdate}
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

export default CompanyUserList;

