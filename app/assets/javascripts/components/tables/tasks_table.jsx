var TasksTable = React.createClass({
  mixins: [TableCheckbox],
  getInitialState: function() {
    return {
      tasks: []
    };
  },
  componentDidMount: function() {
    $.get("tasks.json", function(result) {
      this.setState({tasks: result.tasks});
    }.bind(this));
  },
  getColumns: function() {
    return [
      {name: "name", grow: 10},
      {name: "assigned_to", grow: 10},
      {name: "deadline", grow: 5},
      {name: "event", grow: 10}
    ];
  },
  sortItems: function() {
    return [
      {entity: "name", display: "Name", default: true},
      {entity: "deadline", display: "Due Date"}
    ]
  },
  deleteTasks: function() {
    var destroyOpts = {destroy_opts: {ids: this.state.checkedItems}};
    $.post('tasks/mass_delete', destroyOpts, function(success_result) {
      var newData = this.spliceResults(this.state.tasks);
      this.setState({tasks: newData, checkedItems: []});
    }.bind(this)).fail(function(error_result) {
      this.props.setServerMessage(error_result.responseJSON.message);
    }.bind(this));
  },
  sortBy: function(entity, order) {
    $.get('tasks.json', {sort: {entity: entity, order: order}}, function(result) {
      this.setState({tasks: result.tasks});
    }.bind(this));
  },
  search: function(e) {
    var term = e.target.value;
    $.get('search_tasks', {search: {text: term || ""}}, function(result) {
      this.setState({tasks: result.tasks});
    }.bind(this));
  },
  actionItems: function() {
    return [
      {name: "Delete", handler: this.deleteTasks}
    ]
  },
  render: function() {
    return (
      <Table
        results={this.state.tasks}
        columns={this.getColumns()}
        useCustomRowComponent={false}
        checkedItems={this.state.checkedItems}
        rowChanged={this.rowChanged}
        sortItems={this.sortItems()}
        handleSortClick={this.sortBy}
        handleSearch={this.search}
        showActions={this.state.checkedItems.length > 0}
        actionItems={this.actionItems()}
        extraPadding={true}
        searchPlaceholder="Search Tasks..."
      />
    );
  }
});
