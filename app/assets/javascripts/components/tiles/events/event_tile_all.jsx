var EventTileAll = React.createClass({
  render: function() {
    return (
      <div className="EventTileAll">
        <EventContactSmallTile />
        <EventTaskSmallTile />
        <EventVendorSmallTile />
      </div>
    );
  }
});
