var EventVendorSmallTile = React.createClass({
  mixins: [ToastMessages],
  getInitialState: function() {
    return {
      count: null
    };
  },
  componentDidMount: function() {
    $.get("vendors.json", function(results) {
      if (this.isMounted()) {
        this.setState({
          count: results.event_vendors.length
        })
      }
    }.bind(this))
  },
  incrementCount: function(associatedVendor) {
    this.toast(associatedVendor.name + " has been added to this event.");
    var count = this.state.count;
    this.setState({count: count+1});
  },
  render: function() {
    return (
      <div className="Tile">
        <div className="Tile-header">
          <Link to="eventVendors" className="Tile-headerLink">
            <div className="Tile-imgVendor"></div>
            <div className="Tile-title">Vendors</div>
          </Link>
        </div>
        <div className="Tile-content">
          <div className="TileContent-quickAdd">
            <EventVendorAutocomplete onAssociation={this.incrementCount} />
          </div>
          <div className="TileContent-count">
            {this.state.count}
          </div>
          <div className="TileContent-title">
            Vendors
          </div>
        </div>
      </div>
    );
  }
});
