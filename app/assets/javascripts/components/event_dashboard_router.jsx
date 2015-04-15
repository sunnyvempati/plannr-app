var EventDashboardRouter = React.createClass({
  propTypes: {
    authToken: React.PropTypes.string.isRequired
  },
  componentDidMount: function() {
    Router.run(this.routes(), function (Handler) {
      React.render(<Handler event={this.props.event} authToken={this.props.authToken}/>, React.findDOMNode(this.refs.eventDashboard));
    }.bind(this));
  },
  routes: function() {
    return (
      <Route name="tileAll" path="/" handler={EventDashboard}>
        <Route name="tileContacts" path="contacts" handler={EventContactListTile} >
          <Route name="tileNewContact" path="new" handler={EventContactNewTile} />
        </Route>
        <Route name="tileTasks" path="tasks" handler={EventTaskListTile} >
          <Route name="tileNewTask" path="new" handler={EventTaskNewTile} />
        </Route>
        <Route name="tileVendors" path="vendors" handler={EventVendorListTile} >
          <Route name="tileNewVendor" path="new" handler={EventVendorNewTile} />
        </Route>
        <DefaultRoute handler={EventTileAll} />
      </Route>
    );
  },
  render: function() {
    return (
      <div ref="eventDashboard">    </div>
    );
  }
});
