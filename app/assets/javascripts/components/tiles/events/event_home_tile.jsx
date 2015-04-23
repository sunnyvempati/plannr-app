var EventHome = React.createClass({
  render: function() {
    return (
      <div className="EventHomeTileContainer">
        <EventContactSmallTile />
        <EventTaskSmallTile />
        <EventVendorSmallTile />
      </div>
    );
  }
});
