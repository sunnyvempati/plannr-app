var EventDashboardRouter = React.createClass({
  propTypes: {
    authToken: React.PropTypes.string.isRequired
  },
  componentDidMount: function() {
    Router.run(this.routes(), function (Handler) {
      React.render(<Handler event={this.props.event} authToken={this.props.authToken} userId={this.props.userId} />, React.findDOMNode(this.refs.eventDashboard));
    }.bind(this));
  },
  routes: function() {
    return (
      <Route name="tileAll" path="/" handler={EventDashboard}>
        <Route name="tileContactsList" path="contacts" handler={EventContactListTile} />
        <Route name="tileNewContact" path="contacts/new" handler={EventContactNewTile} />
        <Route name="tileTasksList" path="tasks" handler={EventTaskListTile} />
        <Route name="tileNewTask" path="tasks/new" handler={EventTaskNewTile} />
        <Route name="tileVendorsList" path="vendors" handler={EventVendorListTile} />
        <Route name="tileNewVendor" path="vendors/new" handler={EventVendorNewTile} />
        <DefaultRoute handler={EventTileAll} />
      </Route>
    );
  },
  render: function() {
    return (
      <div ref="eventDashboard"></div>
    );
  }
});
