var EventTileContainer = React.createClass({
  render: function() {
    return (
      <div className="EventTileContainer">
        <EventContactListTile eventId={this.props.eventId} />
      </div>
    );
  }
});
