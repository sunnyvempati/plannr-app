var ContactsRouter = React.createClass({
  componentDidMount: function() {
    Router.run(this.routes(), function (Handler) {
      React.render(<Handler />, React.findDOMNode(this.refs.contacts));
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
