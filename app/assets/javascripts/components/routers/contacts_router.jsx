var ContactsRouter = React.createClass({
  propTypes: {
    currentUser: React.PropTypes.object
  },
  componentDidMount: function() {
    Router.run(this.routes(), function (Handler) {
      React.render(<Handler currentUser={this.props.currentUser} />, React.findDOMNode(this.refs.contacts));
    }.bind(this));
  },
  routes: function() {
    return (
      <Route name="contacts" path="/" handler={Contacts} ignoreScrollBehavior={true}>
        <Route name="contact" path="view/:id" handler={Contact} />
        <DefaultRoute handler={ContactsTable}  />
      </Route>
    );
  },
  render: function() {
    return (
      <div ref="contacts"></div>
    );
  }
});
