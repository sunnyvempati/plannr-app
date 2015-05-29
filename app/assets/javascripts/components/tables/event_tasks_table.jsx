var EventTasksTable = React.createClass({
  mixins: [TableCheckbox],
  getColumns: function() {
    return [
      {name: "name", grow: 10, header: "Name"},
      {name: "assigned_to", grow: 10, header: "Assigned to"},
      {name: "deadline", grow: 5, header: "Due Date"}
    ];
  },
  actionItems: function() {
    return [
      {name: "Delete", handler: this.deleteTasks}
    ]
  },
  sortItems: function() {
    return [
      {entity: "name", display: "Name", default: true},
      {entity: "deadline", display: "Due Date"}
    ]
  },
  deleteTasks: function() {
    var destroyOpts = {destroy_opts: {ids: this.state.checkedItems}};
    $.post('/tasks/mass_delete',destroyOpts, function(success_result) {
      var newData = this.spliceResults(this.props.data);
      this.props.onUpdatedData(newData);
    }.bind(this)).fail(function(error_result) {
      this.props.setServerMessage(error_result.responseJSON.message);
    }.bind(this));
  },
  sortBy: function(entity, order) {
    $.get('tasks.json', {sort: {entity: entity, order: order}}, function(result) {
      this.props.onUpdatedData(result.tasks);
    }.bind(this));
  },
  search: function(e) {
    var term = e.target.value;
    $.get('search_event_tasks', {search: {text: term || ""}}, function(result) {
      this.props.onUpdatedData(result.tasks);
    }.bind(this));
  },
  render: function() {
    return (
      <Table
        results={this.props.data}
        showHeaders={true}
        columns={this.getColumns()}
        useCustomRowComponent={false}
        checkedItems={this.state.checkedItems}
        rowChanged={this.rowChanged}
        sortItems={this.sortItems()}
        handleSortClick={this.sortBy}
        handleSearch={this.search}
        showActions={this.state.checkedItems.length > 0}
        actionItems={this.actionItems()}
        extraPadding={false}
        searchPlaceholder="Search Tasks..."
      />
    );
  }
});
