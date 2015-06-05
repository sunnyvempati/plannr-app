var VendorsRouter = React.createClass({
  componentDidMount: function() {
    Router.run(this.routes(), function (Handler) {
      React.render(<Handler />, React.findDOMNode(this.refs.vendors));
    }.bind(this));
  },
  routes: function() {
    return (
      <Route name="vendors" path="/" handler={Vendors} ignoreScrollBehavior={true}>
        <Route name="vendor" path="view/:id" handler={Vendor} />
        <DefaultRoute handler={VendorsTable}  />
      </Route>
    );
  },
  render: function() {
    return (
      <div ref="vendors"></div>
    );
  }
});
