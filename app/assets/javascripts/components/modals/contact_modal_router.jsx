var ContactModalRouter = React.createClass({
  propTypes: {
    authToken: React.PropTypes.string.isRequired
  },
  componentDidMount: function() {
    Router.run(this.routes(), function (Handler) {
      React.render(<Handler data={this.props.data} />, React.findDOMNode(this.refs.contactModal));
    }.bind(this));
  },
  routes: function() {
    return (
      <Route name="tileAll" path="/" handler={ContactModal}>
        <Route name="tileEditContact" path="editcontact" handler={EditContactModal} />
        <DefaultRoute handler={ShowContactModal} />
      </Route>
    );
  },
  render: function() {
    return (
      <div ref="contactModal"></div>
    );
  }
});
