var EventVendorNewTile = React.createClass({
  propTypes: {
    authToken: React.PropTypes.string.isRequired
  },
  getInitialState: function() {
    return {
      model: null
    };
  },
  render: function() {
    var model = {event_id: this.props.eventId};
    return (
      <div className="EventVendorNewTile">
        <Link to="tileAll">Go back to home</Link>
        <VendorFormNew model={model} authToken={this.props.authToken}/>
      </div>
    );
  }
});
