var TasksTable = React.createClass({
  mixins: [TableCheckbox],
  getInitialState: function() {
    return {
      tasks: []
    };
  },
  componentDidMount: function() {
    this.getAllTasks();
  },
  getAllTasks: function() {
    $.get("/tasks.json", function(result) {
      this.setState({tasks: result.tasks});
    }.bind(this));
  },
  getUserTasks: function() {
    $.get("/user_tasks", function(result) {
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
    $.post('tasks/mass_delete', destroyOpts, function(success_result) {
      var newData = this.spliceResults(this.state.tasks, deletionIds);
      this.setState({tasks: newData, checkedItems: []});
    }.bind(this)).fail(function(error_result) {
      this.props.setServerMessage(error_result.responseJSON.message);
    }.bind(this));
  },
  handleEdit: function(id) {
    location.href = "/tasks/"+id+"/edit";
  },
  sortBy: function(entity, order) {
    $.get('/tasks.json', {sort: {entity: entity, order: order}}, function(result) {
      this.setState({tasks: result.tasks});
    }.bind(this));
  },
  search: function(e) {
    var term = e.target.value;
    $.get('/search_tasks', {search: {text: term || ""}}, function(result) {
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
  filterItems: function() {
    return [
      {name: "All Tasks", handler: this.getAllTasks, default: true},
      {name: "My Tasks", handler: this.getUserTasks}
    ]
  },
  handleActionButtonClick: function() {
    location.href = "/tasks/new";
  },
  render: function() {
    return (
      <Table
        results={this.state.tasks}
        columns={this.getColumns()}
        showHeaders={true}
        useCustomRowComponent={false}
        checkedItems={this.state.checkedItems}
        rowChanged={this.rowChanged}
        sortItems={this.sortItems()}
        handleSortClick={this.sortBy}
        handleSearch={this.search}
        showActions={this.state.checkedItems.length > 0}
        actionItems={this.actionItems()}
        extraPadding={true}
        filterable={true}
        filterItems={this.filterItems()}
        searchPlaceholder="Search Tasks..."
        actionButtonText="Create Task"
        actionButtonClick={this.handleActionButtonClick}
        actionButtonSVGClass="createTask"
      />
    );
  }
});
