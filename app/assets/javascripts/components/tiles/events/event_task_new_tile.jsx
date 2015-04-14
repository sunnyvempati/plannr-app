var EventTaskNewTile = React.createClass({
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
      <div className="EventTaskNewTile">
        <Link to="tileAll">Go back to home</Link>
        <TaskFormNew model={model} authToken={this.props.authToken}/>
      </div>
    );
  }
});
