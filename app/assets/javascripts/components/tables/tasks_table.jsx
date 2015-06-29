var TasksTable = React.createClass({
  mixins: [
    TaskCheckboxRows,
    ToastMessages,
    LoadingToast
  ],
  componentDidMount: function() {
    this.getAllTasks({status: 1});
  },
  getAllTasks: function(filterParams) {
    HttpHelpers.getFromServer("/tasks.json", {filter: filterParams}, function(result) {
      if (this.isMounted()) {
        this.setState({
          tasks: result.tasks
        })
      }
    }.bind(this));
  },
  getUserTasks: function(filterParams) {
    HttpHelpers.getFromServer("/user_tasks", {filter: filterParams}, function(result) {
      this.setState({tasks: result.tasks});
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
      {entity: "name", display: "Name", default: true},
      {entity: "deadline", display: "Due Date"},
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
    HttpHelpers.getFromServer('/tasks.json', {sort: {entity: entity, order: order}}, function(result) {
      this.setState({tasks: result.tasks});
    }.bind(this));
  },
  search: function(e) {
    var term = e.target.value;
    HttpHelpers.getFromServer('/search_tasks', {search: {text: term || ""}}, function(result) {
      this.setState({tasks: result.tasks});
    }.bind(this));
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
      {name: "All Tasks - To do", handler: this.getAllTasks.bind(this, {status: 1}), default: true},
      {name: "All Tasks - Completed", handler: this.getAllTasks.bind(this, {status: 2})},
      {name: "My Tasks - To do", handler: this.getUserTasks.bind(this, {status: 1})},
      {name: "My Tasks - Completed", handler: this.getUserTasks.bind(this, {status: 2})},
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
