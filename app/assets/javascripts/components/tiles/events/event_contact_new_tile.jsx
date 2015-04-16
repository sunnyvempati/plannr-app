var EventContactNewTile = React.createClass({
  propTypes: {
    authToken: React.PropTypes.string.isRequired
  },
  render: function() {
    var model = {event_id: this.props.eventId};
    return (
      <div className="EventContactNewTile">
        <Link to="tileAll">Go back to home</Link>
        <ContactFormNew model={model} authToken={this.props.authToken}/>
      </div>
    );
  }
});
