var EventTasksTable = React.createClass({
  mixins: [
    TaskCheckboxRows,
    ToastMessages,
    LoadingToast,
    FilterSort
  ],
  propTypes: {
    eventId: React.PropTypes.string.isRequired,
    authToken: React.PropTypes.string.isRequired
  },
  componentDidMount: function() {
    var defaultParams = {
      sort: {sorted_by: 'deadline_asc'},
      filter: {with_status: 1, with_event_id: this.props.eventId}
    }
    this.initializeFilterSort(defaultParams);
  },
  getTableData: function (params) {
    HttpHelpers.getFromServer("/tasks.json", params, function (results) {
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
      {name: "deadline_icon", grow: 1, header: ""},
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
      {entity: "deadline", display: "Due Date", default: true},
      {entity: "name", display: "Name"},
      {entity: "status", display: "Status"}
    ]
  },
  handleDelete: function (id) {
    var destroyOpts = {destroy_opts: {ids: [id]}};
    HttpHelpers.postToServer('/tasks/mass_delete', destroyOpts, function (success_result) {
      this.toast('Task deleted successfully.');
      var newData = this.spliceResults(this.state.tasks, [id]);
      this.setState({tasks: newData});
    }.bind(this));
  },
  filterWithEvent: function(params) {
    $.extend(params, {with_event_id: this.props.eventId});
    this.filter(params);
  },
  filterItems: function () {
    return [
      {name: "All Tasks - To do", handler: this.filterWithEvent.bind(this, {with_status: 1}), default: true},
      {name: "All Tasks - Completed", handler: this.filterWithEvent.bind(this, {with_status: 2})},
      {name: "My Tasks - To do", handler: this.filterWithEvent.bind(this, {with_status: 1, with_assigned_to: this.props.currentUserId})},
      {name: "My Tasks - Completed", handler: this.filterWithEvent.bind(this, {with_status: 2, with_assigned_to: this.props.currentUserId})},
    ]
  },
  openCreateTaskModal: function() {
    var props = {
      model: {event_id: this.props.eventId},
      authToken: this.props.authToken,
      refreshData: this.getTableData.bind(this, {status: 1})
    }
    var modal = React.createElement(CreateTaskModal, props);
    React.render(modal, document.getElementById('modal'));
  },
  openEditModal: function(task_id) {
    var url = '/tasks/' + task_id + '.json';
    HttpHelpers.getFromServer(url, {}, function(result) {
      var props = {
        model: $.extend({event_id: this.props.eventId}, result.task),
        authToken: this.props.authToken,
        refreshData: this.getTableData.bind(this, {status: 1})
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
        handleSortClick={this.sort}
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
