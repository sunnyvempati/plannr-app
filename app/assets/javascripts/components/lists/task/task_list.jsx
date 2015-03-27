var TaskList = React.createClass({
  render: function () {
    return (
      <div>

        <p>{this.props.notice}</p>

        <h1>Listing Tasks</h1>
        <Datatable  {...this.props} />

        <a href="/tasks/new">New Task</a>

        <TaskActionButton path="/tasks/new" prerender="true" />

      </div>
    );
  }
});
