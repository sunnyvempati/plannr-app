var TasksTable = React.createClass({
  mixins: [
    TaskCheckboxRows,
    ToastMessages,
    LoadingToast
  ],
  defaultFilterSort: {
    with_status: 1, // To do
    sorted_by: 'deadline_desc'
  },
  setSortFilterParams: function(params) {
    $.extend(this.filterSortParams, params);
    this.getTasks();
  },
  componentDidMount: function() {
    this.filterSortParams = this.defaultFilterSort;
    this.getTasks();
  },
  getTasks: function(filterSortParams) {
    HttpHelpers.getFromServer("/tasks.json", {filter_sort: this.filterSortParams}, function(result) {
      if (this.isMounted()) {
        this.setState({
          tasks: result.tasks
        })
      }
    }.bind(this));
  },
  getColumns: function() {
    return [
      {name: "name", grow: 10, header: "Name"},
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
    HttpHelpers.postToServer('/tasks/mass_delete', destroyOpts, function(success_result) {
      this.toast('Task deleted successfully.');
      var newData = this.spliceResults(this.state.tasks, deletionIds);
      this.setState({tasks: newData});
    }.bind(this));
  },
  handleEdit: function(id) {
    location.href = "/tasks/"+id+"/edit";
  },
  sortBy: function(entity, order) {
    this.setSortFilterParams({sorted_by: entity + "_" + order});
  },
  search: function(e) {
    var term = e.target.value;
    this.setSortFilterParams({search_query: term});
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
      {name: "All Tasks - To do", handler: this.setSortFilterParams.bind(this, {with_status: 1}), default: true},
      {name: "All Tasks - Completed", handler: this.setSortFilterParams.bind(this, {with_status: 2})},
      {name: "My Tasks - To do", handler: this.setSortFilterParams.bind(this, {with_assigned_to: this.props.currentUserId, with_status: 1})},
      {name: "My Tasks - Completed", handler: this.setSortFilterParams.bind(this, {with_assigned_to: this.props.currentUserId, with_status: 2})}
    ]
  },
  handleActionButtonClick: function() {
    location.href = "/tasks/new";
  },
  getActionButton: function () {
    return (
        <ActionButton handleClick={this.handleActionButtonClick}
                      label='Create Task'
                      svgClass='createContact'
                      extraPad={true} />
    );
  },
  render: function() {
    return (
      <Table
        columns={this.getColumns()}
        showHeaders={true}
        useCustomRowComponent={true}
        customRows={this.getCustomRows(true)}
        sortItems={this.sortItems()}
        handleSortClick={this.sortBy}
        handleSearch={this.search}
        showActions={false}
        actionItems={this.actionItems()}
        extraPadding={true}
        filterable={true}
        filterItems={this.filterItems()}
        searchPlaceholder="Search Tasks..."
        actionButton={this.getActionButton()}
      />
    );
  }
});
