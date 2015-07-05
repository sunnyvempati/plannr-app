var EventTasksTable = React.createClass({
  mixins: [
    TaskCheckboxRows,
    ToastMessages,
    LoadingToast,
    HttpHelpers
  ],
  propTypes: {
    eventId: React.PropTypes.string.isRequired,
    authToken: React.PropTypes.string.isRequired
  },
  componentDidMount: function() {
    // filter and get all to do items
    this.getEventTasks({status: 1});
  },
  getEventTasks: function (filterParams) {
    this.getFromServer("tasks.json", {filter: filterParams}, function (results) {
      if (this.isMounted()) {
        this.setState({
          tasks: results.tasks
        });
      }
    }.bind(this))
  },
  getUserTasks: function (filterParams) {
    this.getFromServer("user_tasks", {filter: filterParams}, function (results) {
      if (this.isMounted()) {
        this.setState({
          tasks: results.tasks
        });
      }
    }.bind(this))
  },
  getColumns: function () {
    return [
      {name: "name", grow: 10, header: "Name"},
      {name: "deadline", grow: 4, header: "Due Date"},
      {name: "status", grow: 4, header: "Status"},
      {name: "assigned_to", grow: 4, header: "Assigned to"}
    ];
  },
  actionItems: function () {
    return [
      {name: "Edit", handler: this.openEditModal},
      {name: "Delete", handler: this.handleDelete}
    ]
  },
  sortItems: function () {
    return [
      {entity: "name", display: "Name", default: true},
      {entity: "deadline", display: "Due Date"},
      {entity: "status", display: "Status"}
    ]
  },
  handleDelete: function (id) {
    var destroyOpts = {destroy_opts: {ids: [id]}};
    this.postToServer('/tasks/mass_delete', destroyOpts, function (success_result) {
      this.toast('Task deleted successfully.');
      var newData = this.spliceResults(this.state.tasks, [id]);
      this.setState({tasks: newData});
    }.bind(this));
  },
  sortBy: function (entity, order) {
    this.getFromServer('tasks.json', {sort: {entity: entity, order: order}}, function (result) {
      this.setState({tasks: result.tasks});
    }.bind(this));
  },
  search: function (e) {
    var term = e.target.value;
    this.getFromServer('search_event_tasks', {search: {text: term || ""}}, function (result) {
      this.setState({tasks: result.tasks});
    }.bind(this));
  },
  filterItems: function () {
    return [
      {name: "All Tasks - To do", handler: this.getEventTasks.bind(this, {status: 1}), default: true},
      {name: "All Tasks - Completed", handler: this.getEventTasks.bind(this, {status: 2})},
      {name: "My Tasks - To do", handler: this.getUserTasks.bind(this, {status: 1})},
      {name: "My Tasks - Completed", handler: this.getUserTasks.bind(this, {status: 2})},
    ]
  },
  openCreateTaskModal: function() {
    var props = {
      model: {event_id: this.props.eventId},
      authToken: this.props.authToken,
      refreshData: this.getEventTasks.bind(this, {status: 1})
    }
    var modal = React.createElement(CreateTaskModal, props);
    React.render(modal, document.getElementById('modal'));
  },
  openEditModal: function(task_id) {
    var url = '/tasks/' + task_id + '.json';
    this.getFromServer(url, {}, function(result) {
      var props = {
        model: $.extend({event_id: this.props.eventId}, result.task),
        authToken: this.props.authToken,
        refreshData: this.getEventTasks.bind(this, {status: 1})
      }
      var modal = React.createElement(EditTaskModal, props);
      React.render(modal, document.getElementById('modal'));
    }.bind(this));
  },
  goToTask: function(data) {
    this.openEditModal(data.id);
  },
  getActionButton: function () {
    return (
      <ActionButton handleClick={this.openCreateTaskModal}
                    svgClass='createTask'
                    extraPad={false} />
    );
  },
  render: function() {
    return (
      <Table
        showHeaders={true}
        columns={this.getColumns()}
        useCustomRowComponent={true}
        customRows={this.getCustomRows(false, this.goToTask)}
        sortItems={this.sortItems()}
        handleSortClick={this.sortBy}
        handleSearch={this.search}
        showActions={false}
        actionItems={this.actionItems()}
        filterable={true}
        filterItems={this.filterItems()}
        tableDataClassName="scrollable"
        searchPlaceholder="Search Tasks..."
        actionButton={this.getActionButton()}
      />
    );
  }
});
