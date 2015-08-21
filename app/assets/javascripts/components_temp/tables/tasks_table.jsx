var TasksTable = React.createClass({
  mixins: [
    TaskCheckboxRows,
    ToastMessages,
    LoadingToast,
    FilterSort,
    InfiniteScrollMixin
  ],
  defaultFilterSortParams: function() {
    return {
      sort: {sorted_by: 'deadline_asc'},
      filter: {with_status: 1}
    };
  },
  fetchNextPage: function(nextPage) {
    this.page = nextPage;
    var params = this.mergeParams();
    Utils.get("/tasks.json", params, function(result) {
      if (result.tasks.length == 0) {
        // stop infinite scroll
        this.detachScrollListener();
        return;
      }
      this.setState({
        data: this.state.data.concat(result.tasks),
        page: this.page
      });
    }.bind(this));
  },
  getColumns: function() {
    return [
      {name: "name", grow: 10, header: "Name"},
      {name: "deadline_icon", grow: 1, header: ""},
      {name: "deadline", grow: 4, header: "Due Date"},
      {name: "status", grow: 4, header: "Status"},
      {name: "assigned_to", grow: 4, header: "Assigned to"},
      {name: "event", grow: 10, header: "Event"}
    ];
  },
  sortItems: function() {
    return [
      {entity: "deadline", display: "Due Date", default: true},
      {entity: "name", display: "Name"},
      {entity: "status", display: "Status"}
    ]
  },
  handleDelete: function(id) {
    var deletionIds = !!id ? [id] : this.state.checkedItems;
    var destroyOpts = {destroy_opts: {ids: deletionIds}};
    Utils.post('/tasks/mass_delete', destroyOpts, function(success_result) {
      this.toast('Task deleted successfully.');
      var newData = this.spliceResults(this.state.data, deletionIds);
      this.setState({data: newData});
    }.bind(this));
  },
  handleEdit: function(id) {
    location.href = "/tasks/"+id+"/edit";
  },
  actionItems: function() {
    return [
      // global means the action is available as a mass action
      {name: "Edit", handler: this.handleEdit, massAction: false},
      {name: "Delete", handler: this.handleDelete, massAction: true}
    ]
  },
  filterItems: function () {
    return [
      {name: "All Tasks - To do", handler: this.filter.bind(this, {with_status: 1}), default: true},
      {name: "All Tasks - Completed", handler: this.filter.bind(this, {with_status: 2})},
      {name: "My Tasks - To do", handler: this.filter.bind(this, {with_assigned_to: this.props.currentUserId, with_status: 1})},
      {name: "My Tasks - Completed", handler: this.filter.bind(this, {with_assigned_to: this.props.currentUserId, with_status: 2})}
    ]
  },
  getActionButton: function () {
    return (
      <ActionButton handleClick={this.openCreateTaskModal}
                    label='Create Task'
                    svgClass='createTask'
                    extraPad={true} />
    );
  },
  render: function() {
    return (
      <Table
        columns={this.getColumns()}
        showHeaders={true}
        useCustomRowComponent={true}
        customRows={this.getCustomRows(true, this.goToTask)}
        sortItems={this.sortItems()}
        handleSortClick={this.sort}
        handleSearch={this.search}
        showActions={false}
        actionItems={this.actionItems()}
        extraPadding={true}
        filterable={true}
        filterItems={this.filterItems()}
        searchPlaceholder="Search Tasks..."
        onClick={this.goToTask}
        actionButton={this.getActionButton()}
      />
    );
  }
});