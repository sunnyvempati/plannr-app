var EventDashboardRouter = React.createClass({
  componentDidMount: function() {
    Router.run(this.routes(), function (Handler) {
      React.render(<Handler eventId={this.props.event.id}/>, React.findDOMNode(this.refs.dashboard));
    }.bind(this));
  },
  routes: function() {
    return (
      <Route name="tileAll" path="/" handler={EventDashboard}>
        <Route name="tileContacts" path="contacts" handler={EventContactListTile} />
        <Route name="tileTasks" path="tasks" handler={EventTaskListTile} />
        <DefaultRoute handler={EventTileAll} />
      </Route>
    );
  },
  render: function() {
    return (
      <div ref="dashboard"></div>
    );
  }
});
