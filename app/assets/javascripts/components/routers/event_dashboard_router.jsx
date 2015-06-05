var EventDashboardRouter = React.createClass({
  propTypes: {
    authToken: React.PropTypes.string.isRequired
  },
  componentDidMount: function() {
    Router.run(this.routes(), function (Handler) {
      React.render(<Handler event={this.props.event} client={this.props.client} authToken={this.props.authToken}/>, React.findDOMNode(this.refs.eventDashboard));
    }.bind(this));
  },
  routes: function() {
    return (
      <Route name="tileAll" path="/" handler={EventDashboard} ignoreScrollBehavior={true}>
        <Route name="tileEventApp" path="nav" handler={EventAppTile}>
          <Route name="eventContacts" path="contacts" handler={EventContactsTable} />
          <Route name="tileTasksList" path="tasks" handler={EventTaskListTile} />
          <Route name="tileAttachmentsList" path="attachments" handler={EventAttachmentsListTile} />
          <Route name="tileVendorsList" path="vendors" handler={EventVendorListTile} />
        </Route>
        <DefaultRoute handler={EventHome}  />
      </Route>
    );
  },
  render: function() {
    return (
      <div>
        <div ref="eventDashboard"></div>
        <div className="EventComments-title">
          <i className="fa fa-comments CommentIcon"></i>
          Comments
        </div>
        <div className="EventComments">
          <Comments entity="Event" entity_id={this.props.event.id} authToken={this.props.authToken} />
        </div>
      </div>
    );
  }
});
