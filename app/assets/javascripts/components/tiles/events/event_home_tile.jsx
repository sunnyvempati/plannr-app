var EventHome = React.createClass({
  render: function() {
    return (
      <div className="EventHomeTileContainer">
        <div className="EventHome-row">
          <EventTaskSmallTile eventId={this.props.eventId} />
          <EventContactSmallTile eventId={this.props.eventId} />
        </div>
        <div className="EventHome-row">
          <EventAttachmentsSmallTile eventId={this.props.eventId} />
          <EventVendorSmallTile eventId={this.props.eventId} />
        </div>
      </div>
    );
  }
});
