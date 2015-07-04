var Contacts = React.createClass({
  render: function() {
    return (
      <RouteHandler currentUser={this.props.currentUser} />
    );
  }
});
