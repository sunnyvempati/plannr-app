var EventHome = React.createClass({
  render: function() {
    return (
      <div className="EventHomeTileContainer">
        <div className="EventHome-row">
          <EventTaskSmallTile eventId={this.props.eventId} />
          <EventContactSmallTile eventId={this.props.eventId} />
        </div>
        <div className="EventHome-row">
          <EventAttachmentsSmallTile />
          <EventVendorSmallTile eventId={this.props.eventId} />
        </div>
      </div>
    );
  }
});
