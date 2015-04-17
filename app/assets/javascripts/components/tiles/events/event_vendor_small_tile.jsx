var EventVendorSmallTile = React.createClass({
  getInitialState: function() {
    return {
      count: null
    };
  },
  componentDidMount: function() {
    $.get("vendors", function(results) {
      if (this.isMounted()) {
        this.setState({
          count: results.event_vendors.length
        });
      }
    }.bind(this));
  },
  render: function() {
    return (
       <div className="Tile">
        <div className="Tile-header">
          <Link to="tileVendorsList">Vendors</Link>
        </div>
        <div className="Tile-content">
          {this.state.count + " Vendors"}
        </div>
      </div>
    );
  }
});
