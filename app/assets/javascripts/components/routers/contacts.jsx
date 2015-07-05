var Contacts = React.createClass({
  propTypes: {
    currentUser: React.PropTypes.object
  },
  render: function() {
    return (
      <RouteHandler currentUser={this.props.currentUser} />
    );
  }
});
